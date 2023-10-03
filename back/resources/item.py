from flask_restful import Resource
from flask import request

from services.item import ItemService

class ItemResource(Resource):
    def __init__(self, **kwargs):
        self.service = kwargs['service']

    def get(self):
        return {'hello': 'world'}
    
    def post(self):
        request_body = request.get_json()

        created = self.service.create(request_body)

        return created, 201