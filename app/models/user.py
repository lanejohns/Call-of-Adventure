from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  full_name = db.Column(db.String(100), nullable= False)
  username = db.Column(db.String(40), nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  address = db.Column(db.String(50), nullable = False)
  city = db.Column(db.String(50), nullable = False)
  state = db.Column(db.String(2), nullable = False)
  zipcode = db.Column(db.Integer, nullable = False)
  latitude = db.Column(db.Float)
  longitude = db.Column(db.Float)
  hashed_password = db.Column(db.String(255), nullable = False)


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "full_name": self.full_name
      "username": self.username,
      "address": self.address,
      "city": self.city,
      "state": self.state,
      "zipcode": self.zipcode,
      "latitude": self.latitude,
      "longitude": self.longitude,
      "email": self.email
    }
