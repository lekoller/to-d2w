import datetime
import jwt

from flask_restful import Resource
from flask import request

from services.user import UserService

class LoginResource(Resource):
    def __init__(self, **kwargs):
        self.service: UserService = kwargs['service']

    def post(self):
        request_body = request.get_json()
        username = request_body.get('name')
        password = request_body.get('password')

        user: dict = self.service.login(name=username, password=password)
        
        if not user:
            return {"error": "Login unsuccessful"}, 401
        
        payload = {
            'user_id': user.get('id'),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }

        token = jwt.encode(payload, "secret_key")

        return {"token": token}, 200