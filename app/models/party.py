from .db import db

class Party(db.Model):
    __tablename__ = 'parties'

    id = db.Column(db.Integer, primary_key = True)
    host_id = db.Column(db.Integer, db.ForeignKey("users.id", nullable = False))
    party_name = db.Column(db.String(300), nullable = False)
    party_size = db.Column(db.Integer, nullable = False)
    open_to_request = db.Column(db.Boolean, nullable = False)

    host = db.relationship("User")

    def to_dict(self):
        return {
            "id": self.id,
            "host_id": self.host_id,
            "party_name": self.party_name,
            "party_size": self.party_size,
            "open_to_request": self.open_to_request
        }