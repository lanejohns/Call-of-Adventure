from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Party, User, Session, Post
from app.forms import PartyForm

party_routes = Blueprint('parties', __name__)

@party_routes.route('/')
def all_parties():
    parties = Party.query.all()
    return {"all_parties": {party.id: party.to_dict() for party in parties}}


@party_routes.route('/', methods=["POST"])
# @login_required
def create_party():
    print("WE ARE HITTING THE START OF THE API ROUTE")
    form = PartyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    party_mems = request.json.get("partyMembers")
    print("THIS IS PARTY_MEMS", party_mems)
    print("THIS IS FORM DATA", form.data)
    if form.validate_on_submit():
        party = Party(
            host_id=current_user.id,
            party_name=form.data['party_name'],
            party_size=form.data['party_size'],
            open_to_request=form.data['open_to_request']
        )
        for member in party_mems:
            new_member = User.query.filter_by(username = member).first()
            if new_member:
                party.party_members.append(new_member)
        db.session.add(party)
        db.session.commit()
        return {"party": party.to_dict()}
    return {"errors": "set errors here"}


@party_routes.route('/<id>', methods=['DELETE'])
def delete_party(id):
    sessions = Session.query.filter(Session.party_id == id).all()
    posts = Post.query.filter(Post.party_id == id).all()
    print("THIS IS ALL OF THE PARTIES POSTS =====>>>>>>>>>>>>>>>",posts)
    print("ALL OF THE PARTIES SESSIONS",sessions)
    party = Party.query.filter(Party.id == id).first()
    print("THIS IS THE PARTY ON THE API ROUTE", party)
    for session in sessions:
        db.session.delete(session)
    for post in posts:
        db.session.delete(post)
    db.session.delete(party)
    db.session.commit()
    return {'party': party.to_dict()}

# @party_routes.route('/<id>/members')
# def party_members(id):
#     # print("THIS IS THE CURRENT USER ID",current_user.id)
#     party = Party.query.get(id)
#     query = party.party_members.all()
#     print("THIS IS THE MEMBER QUERY", query)
#     print([member.to_dict() for member in members])
#     return {'member': member.to_dict()}

@party_routes.route('/<id>')
def single_party(id):
    # print("THIS IS THE CURRENT USER ID",current_user.id)
    party = Party.query.get(id)
    # query = party.party_members.all()
    # print("THIS IS THE MEMBER QUERY", query)
    # print([member.to_dict() for member in query])
    return {'party': party.to_dict()}




