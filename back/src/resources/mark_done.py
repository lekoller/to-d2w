from flask_restful import Resource
from flask import request

from services.item import ItemService
from resources.auth import token_required
from models.user import UserModel


class ItemMarkResource(Resource):
    def __init__(self, **kwargs):
        self.service: ItemService = kwargs['service']

    @token_required
    def patch(self, current_user: UserModel):
        id = request.args.get('id')

        if not id:
            return {"error": "Id is required"}, 404
        
        marked = self.service.mark_completed(id, current_user.id)

        if not marked:
            return {"error": "Item not found"}, 404

        return marked