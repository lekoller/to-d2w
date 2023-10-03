from flask_restful import Resource
from flask import request

from services.item import ItemService

class ItemResource(Resource):
    def __init__(self, item_service: ItemService):
        self.service = item_service

    def get(self):
        return {'hello': 'world'}
    
    def post(self):
        request_body = request.get_json()

        self.service.create(request_body)

        return request_body, 201