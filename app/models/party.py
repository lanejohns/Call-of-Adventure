from .db import db
from .party_user import party_users

class Party(db.Model):
    __tablename__ = 'parties'

    id = db.Column(db.Integer, primary_key = True)
    host_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    party_name = db.Column(db.String(300), nullable = False)
    party_size = db.Column(db.Integer, nullable = False)
    open_to_request = db.Column(db.Boolean, nullable = False)

    # sessions = db.relationship("Party", back_populates="party")
    sessions = db.relationship("Session", back_populates="party")

    posts = db.relationship("Post", back_populates="party")

    request = db.relationship("Request", back_populates="party")

    host = db.relationship("User", back_populates = "hosted_parties")
    party_members = db.relationship("User", secondary=party_users, back_populates="member_parties")


    def to_dict(self):
        return {
            "id": self.id,
            "host_id": self.host_id,
            "party_name": self.party_name,
            "party_size": self.party_size,
            "open_to_request": self.open_to_request
        }