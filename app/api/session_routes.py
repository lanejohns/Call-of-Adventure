from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Session
from app.forms import SessionForm

session_routes = Blueprint('sessions', __name__)

@session_routes.route('/')
def all_sessions():
    sessions = Session.query.all()
    return {"all_sessions": {session.id: session.to_dict() for session in sessions}}


