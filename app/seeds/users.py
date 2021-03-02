from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(full_name ='Demo-Dan', username='Demo', email='demo@aa.io', address='1 City Hall Square', city='Boston', state='MA', zipcode='02201', latitude='42.360329', longitude='-71.057999'
                password='password')

    matt = User(full_name ='Matt Mercer', username='Pumat Sol', email='matt@gmail.com', address='800 Boylston St', city='Boston', state='MA', zipcode='02199', latitude='42.348690', longitude='-71.082527'
                password='password')

    marisha = User(full_name ='Marisha Ray', username='Bo Lionette', email='marisha@gmail.com', address='200 Pier Four Blvd', city='Boston', state='MA', zipcode='02210', latitude='42.352030', longitude='-71.042560'
                password='password')

    travis = User(full_name ='Travis Willingham', username='Fjord', email='travis@gmail.com', address='15 Sudbury St', city='Boston', state='MA', zipcode='02203', latitude='42.361382', longitude='-71.060051'
                password='password')

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
