# socketio_handlers.py
from . import socketio
from .models import Message
from .schemas import MessageSchema
from flask_socketio import emit, join_room
from .extensions import db
from sqlalchemy import or_, and_

@socketio.on('join', namespace='/api/messages')
def on_join(data):
    room = f"{data['product_id']}_{min(data['sender_id'], data['receiver_id'])}_{max(data['sender_id'], data['receiver_id'])}"
    join_room(room)

@socketio.on('send_message', namespace='/api/messages')
def handle_message(data):
    msg = Message(
        sender_id=data['sender_id'],
        receiver_id=data['receiver_id'],
        product_id=data['product_id'],
        message=data['message']
    )
    db.session.add(msg)
    db.session.commit()
    room = f"{data['product_id']}_{min(data['sender_id'], data['receiver_id'])}_{max(data['sender_id'], data['receiver_id'])}"
    emit('receive_message', MessageSchema().dump(msg), room=room)

@socketio.on('get_history', namespace='/api/messages')
def get_history(data):
    msgs = Message.query.filter_by(product_id=data['product_id']).filter(
        or_(
            and_(Message.sender_id==data['sender_id'], Message.receiver_id==data['receiver_id']),
            and_(Message.sender_id==data['receiver_id'], Message.receiver_id==data['sender_id'])
        )
    ).order_by(Message.timestamp).all()
    emit('history', MessageSchema(many=True).dump(msgs))
