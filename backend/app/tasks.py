from . import celery

@celery.task
def send_email_task(to, subject, body):
    # TODO: Implement email sending
    pass

@celery.task
def process_image_task(image_data):
    # TODO: Implement image processing (resize, optimize)
    pass
