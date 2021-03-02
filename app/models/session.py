from .db import db

class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key = True)
    party_id = db.Column(db.Integer, db.ForeignKey("parties.id"), nullable = False)
    