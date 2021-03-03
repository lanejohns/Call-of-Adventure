from .db import db

class Request(db.Model):
    __tablename__ = 'requests'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    party_id = db.Column(db.Integer, db.ForeignKey("parties.id"), nullable = False)
    message = db.Column(db.String(2000), nullable = True)

    party = db.relationship("Party", back_populates="request")
    requester = db.relationship("User", back_populates="request")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "party_id": self.party_id,
            "message": self.message
        }