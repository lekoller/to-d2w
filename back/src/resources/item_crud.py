from flask_restful import Resource
from flask import request
from models.user import UserModel
from resources.auth import token_required

from services.item import ItemService

class ItemCrudResource(Resource):
    def __init__(self, **kwargs):
        self.service: ItemService = kwargs['service']

    @token_required
    def get(self, current_user: UserModel):
        id = request.args.get('id')
        
        if not id:
            return self.service.list_all(user_id=current_user.id)
        
        result = self.service.find_one(id=id, user_id=current_user.id)

        if not result:
            return {"error": "Item not found"}, 404

        return result
        
    @token_required
    def post(self, current_user: UserModel):
        request_body = request.get_json()

        request_body['user_id'] = current_user.id

        created = self.service.create(request_body)

        if not created:
            return {"error": "Item not created"}, 400

        return created, 201
    
    @token_required
    def patch(self, current_user: UserModel):
        request_body = request.get_json()

        id = request_body.get("id")
        request_body["user_id"] = current_user.id

        if not id:
            return {"error": "Id is required"}, 404

        updated = self.service.update(int(id), request_body)

        if not updated:
            return {"error": "Item not found"}, 404

        return updated
    
    @token_required
    def delete(self, current_user: UserModel):
        id = request.args.get('id')

        if not id:
            return {"error": "Id is required"}, 404
        
        deleted = self.service.delete(id, current_user.id)

        if not deleted:
            return {"error": "Item not found"}, 404

        return {"message": "Item deleted"}, 204