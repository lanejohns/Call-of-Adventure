from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Request
from app.forms import RequestForm

request_routes = Blueprint('requests', __name__)

@request_routes.route('/<id>')
def all_requests(id):
    requests = Request.query.filter(Request.party_id == id).all()
    return {"all_requests": {request.id: request.to_dict() for request in requests}}


@request_routes.route('/', methods=["POST"])
def accept_request(id):
    form = RequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        request = Request(
            user_id=current_user.id,
            party_id=party_id,
            message=form.data["message"]
        )
        db.session.add(request)
        db.session.commit()
        return {"request": {request.id: request.to_dict()}}
    else:
        return "Bad Data"


# TODO: Figure out how to write the write when a party will accept a request.


@request_routes.route('/<id>', methods=["DELETE"])
def delete_request(id):
    request = Request.query.filter(Request.party_id == id).first()
    db.session.delete(request)
    db.session.commit()
    return {"deleted": True}