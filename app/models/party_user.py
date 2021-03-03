from .db import db

party_users = db.Table(
    "party_users",
    db.Column(
        "party_id",
        db.Integer,
        db.ForeignKey("parties.id"),
        primary_key=True
    ),
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
)