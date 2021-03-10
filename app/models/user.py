from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .party_user import party_users

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

  user_post = db.relationship("Post", back_populates="poster")

  request = db.relationship("Request", back_populates="requester")

  hosted_parties = db.relationship("Party", back_populates = "host")
  member_parties = db.relationship("Party", secondary=party_users, back_populates="party_members", lazy="dynamic")

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)

  def get_party_id(self):
    return self.member_parties


  def to_dict(self):
    # print("THIS IS THE LENGTH OF MEMBER PARTIES",len(self.member_parties))
    try:
      # print("MEMBER PARTIES PRINT ------------->",self.member_parties)
      party_id = self.member_parties[0].id
    except (TypeError, IndexError):
      party_id = None
    return {
      "id": self.id,
      "full_name": self.full_name,
      "username": self.username,
      "address": self.address,
      "city": self.city,
      "state": self.state,
      "zipcode": self.zipcode,
      "latitude": self.latitude,
      "longitude": self.longitude,
      "email": self.email,
      "party_id": party_id
    }
