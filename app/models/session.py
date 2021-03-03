from .db import db

class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key = True)
    party_id = db.Column(db.Integer, db.ForeignKey("parties.id"), nullable = False)
    title = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(2000), nullable = False)
    date = db.Column(db.String(100), nullable = False)
    time = db.Column(db.Float, nullable = False)
    address = db.Column(db.String(50), nullable = False)
    city = db.Column(db.String(50), nullable = False)
    state = db.Column(db.String(2), nullable = False)
    zipcode = db.Column(db.Integer, nullable = False)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    in_person = db.Column(db.Boolean, nullable = False)

    # party = db.relationship("Session", back_populates="sessions")
    party = db.relationship("Party", back_populates="sessions")


    def to_dict(self):
        return {
            "id": self.id,
            "party_id": self.party_id,
            "title": self.title,
            "description": self.description,
            "date": self.date,
            "time": self.time,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zipcode": self.zipcode,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "in_person": self.in_person
        }