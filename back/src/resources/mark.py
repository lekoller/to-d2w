from flask_restful import Resource
from flask import request

from services.item import ItemService

class ItemMarkResource(Resource):
    def __init__(self, **kwargs):
        self.service: ItemService = kwargs['service']

    def patch(self):
        id = request.args.get('id')

        if not id:
            return {"error": "Id is required"}, 404

        marked = self.service.mark_completed(id)

        if not marked:
            return {"error": "Item not found"}, 404

        return marked