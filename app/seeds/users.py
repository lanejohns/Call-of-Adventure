from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(full_name ='demo', username='demo', email='demo@aa.io', address='1 City Hall Square', city='Boston', state='MA', zipcode='02201', latitude='42.360329', longitude='-71.057999',
                password='password')

    matt = User(full_name ='Matt Mercer', username='Pumat Sol', email='matt@gmail.com', address='800 Boylston St', city='Boston', state='MA', zipcode='02199', latitude='42.348690', longitude='-71.082527',
                password='password')

    marisha = User(full_name ='Marisha Ray', username='Bo Lionette', email='marisha@gmail.com', address='200 Pier Four Blvd', city='Boston', state='MA', zipcode='02210', latitude='42.352030', longitude='-71.042560',
                password='password')

    travis = User(full_name ='Travis Willingham', username='Fjord', email='travis@gmail.com', address='15 Sudbury St', city='Boston', state='MA', zipcode='02203', latitude='42.361382', longitude='-71.060051',
                password='password')

    laura = User(full_name ='Laura Bailey', username='Jester Lavore', email='laura@gmail.com', address='1580 Commonwealth Avenue', city='Boston', state='MA', zipcode='02135', latitude='42.344510', longitude='-71.142020',
                password='password')

    taliesin = User(full_name ='Taliesin Jaffe', username='Caduceus Clay', email='pyramid@gmail.com', address='35 Fidelis Way', city='Brighton', state='MA', zipcode='02135', latitude='42.3466039', longitude='-71.1446678',
                password='password')

    sam = User(full_name ='Sam Regal', username='Nott the Brave', email='sam@gmail.com', address='1496 Commonwealth Avenue', city='Brighton', state='MA', zipcode='02135', latitude='42.3478281', longitude='-71.1409976',
                password='password')

    liam = User(full_name ="Liam O'Brian", username='Caleb Widowgast', email='liam@gmail.com', address='4 Jersey St', city='Boston', state='MA', zipcode='02215', latitude='42.3458914', longitude='-71.0981069',
                password='password')

    ashley = User(full_name ='Ashely Johnson', username='Yasha', email='ashley@gmail.com', address='800 Washington Street', city='Boston', state='MA', zipcode='02111', latitude='42.3494397', longitude='-71.0630847',
                password='password')

    db.session.add(demo)
    db.session.add(matt)
    db.session.add(marisha)
    db.session.add(travis)
    db.session.add(laura)
    db.session.add(taliesin)
    db.session.add(sam)
    db.session.add(liam)
    db.session.add(ashley)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    # db.session.execute('TRUNCATE users;')
    db.session.commit()
