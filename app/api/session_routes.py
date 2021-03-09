from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Session, Party
from app.forms import SessionForm

session_routes = Blueprint('sessions', __name__)

@session_routes.route('/')
def all_sessions():
    sessions = Session.query.all()
    return {"all_sessions": {session.id: session.to_dict() for session in sessions}}


@session_routes.route('/', methods=["POST"])
def create_session():
    form = SessionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        session = Session(
            party_id=form.data['party_id'],
            title=form.data['title'],
            description=form.data['description'],
            date=form.data['date'],
            time=form.data['time'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zipcode=form.data['zipcode'],
            latitude=form.data['latitude'],
            longitude=form.data['longitude'],
            in_person=form.data['in_person']
        )
        print("THIS IS WHAT SESSION LOOKS LIKE ON THE BACKEND ---->", session)
        db.session.add(session)
        db.session.commit()
        return {"session": session.to_dict()}
    return {"errors": "set errors here"}


@session_routes.route('/<id>/edit', methods=["PUT"])
def edit_session(id):
    print("WE ARE HITTING THE EDIT SESSION ROUTE")
    session = Session.query.filter(Session.id == id).first()
    new_session = request.get_json()

    session.title = new_session["title"]
    session.description = new_session["description"]
    session.date = new_session["date"]
    session.time = new_session["time"]
    session.address = new_session["address"]
    session.city = new_session["city"]
    session.state = new_session["state"]
    session.zipcode = new_session["zipcode"]
    session.latitude = new_session["latitude"]
    session.longitude = new_session["longitude"]
    session.in_person = new_session["in_person"]
    print("THIS SHOULD BE THE NEW SESSION", session)

    db.session.commit()
    return {"session": session.to_dict()}

@session_routes.route('/<id>', methods=['DELETE'])
def delete_session(id):
    session = Session.query.filter(Session.id == id).first()
    db.session.delete(session)
    db.session.commit()
    return {'session': session.to_dict()}


@session_routes.route('/<id>')
def party_sessions(id):
    sessions = Session.query.filter(Party.id == id).all()
    return {"all_sessions": {session.id: session.to_dict() for session in sessions}}