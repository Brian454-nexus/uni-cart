from app.utils import is_university_email, hash_password, verify_password

def test_is_university_email():
    assert is_university_email('student@uon.ac.ke')
    assert not is_university_email('student@gmail.com')

def test_password_hashing():
    password = 'securepassword'
    hash = hash_password(password)
    assert verify_password(password, hash)
    assert not verify_password('wrongpassword', hash) 