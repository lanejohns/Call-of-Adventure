from app.models import db, Party

def seed_parties():

    the mighty nein = Party(host_id = 2, party_name = "The Might Nein", party_size = 7, open_to_request = False)

    the new light = Party(host_id = 1, party_name = "The New Light", party_size = 4, open_to_request = True)