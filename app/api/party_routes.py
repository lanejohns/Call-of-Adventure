from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Party
from app.forms import PartyForm

party_routes = Blueprint('parties', __name__)

@party_routes.route('/')
def all_parties():
    parties = Party.query.all()
    return {"app_parties": {party.id: party.to_dict() for party in parties}}


@party_routes.route('/', methods=["POST"])
def create_party():
    form = PartyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        party = Party(
            host_id=current_user.id
            party_name=form.data['party_name'],
            party_size=form.data['party_size'],
            open_to_request=form.data['open_to_request']
        )
        db.session.add(party)
        db.session.commit()
        return {"party": party.to_dict()}
    return {"errors": "set errors here"}


@party_routes.route('/<id>', methods=['DELETE'])
def delete_party(id):
    party = Party.query.filter(Party.id == id).first()
    db.session.delete(party)
    db.session.commit()
    return {'party': party.to_dict()}


@party_routes.route('/<id>')
def single_party(id):
    spot = Spot.query.get(id)
    return {'spot': spot.to_dict()}


