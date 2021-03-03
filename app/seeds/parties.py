from app.models import db, Party

def seed_parties():

    the_mighty_nein = Party(host_id = 2, party_name = "The Mighty Nein", party_size = 7, open_to_request = False)

    the_new_light = Party(host_id = 1, party_name = "The New Light", party_size = 4, open_to_request = True)

    db.session.add(the_mighty_nein)
    db.session.add(the_new_light)

    db.session.commit()


def undo_parties():
    Party.query.delete()
    db.session.commit()