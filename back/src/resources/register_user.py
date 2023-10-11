from flask_restful import Resource
from flask import request

from services.user import UserService


class UserRegisterResource(Resource):
    def __init__(self, **kwargs):
        self.service: UserService = kwargs['service']

    def post(self):
        request_body = request.get_json()

        created = self.service.create(request_body)

        if not created:
            return {"error": "User not created"}, 400
        if created.get('error'):
            return created, 400

        return created, 201