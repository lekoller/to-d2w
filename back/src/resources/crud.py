from flask_restful import Resource
from flask import request

from services.item import ItemService

class ItemCrudResource(Resource):
    def __init__(self, **kwargs):
        self.service: ItemService = kwargs['service']

    def get(self):
        id = request.args.get('id')
        
        if not id:
            return self.service.list_all()
        
        result = self.service.find_one(id)

        if not result:
            return {"error": "Item not found"}, 404

        return result
        
    
    def post(self):
        request_body = request.get_json()

        created = self.service.create(request_body)

        if not created:
            return {"error": "Item not created"}, 400

        return created, 201
    
    def patch(self):
        request_body = request.get_json()

        id = request_body['id']

        if not id:
            return {"error": "Id is required"}, 404

        updated = self.service.update(int(id), request_body)

        if not updated:
            return {"error": "Item not found"}, 404

        return updated
    
    def delete(self):
        id = request.args.get('id')

        if not id:
            return {"error": "Id is required"}, 404

        deleted = self.service.delete(id)

        if not deleted:
            return {"error": "Item not found"}, 404

        return {"message": "Item deleted"}, 204