from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key = True)
    party_id = db.Column(db.Integer, db.ForeignKey("parties.id"), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    body = db.Column(db.String(3000), nullable = False)

    party = db.relationship("Party", back_populates="posts")
    poster = db.relationship("User", back_populates="user_post")



    def to_dict(self):
        return {
            "id": self.id,
            "party_id": self.party_id,
            "user_id": self.user_id,
            "body": self.body
        }