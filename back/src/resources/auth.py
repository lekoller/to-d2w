import jwt

from functools import wraps
from flask import request, current_app as app

# from models.user import User
from repository.user import UserRepository

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]
        
        if not token:
            return {'message': 'Token is missing!'}, 401
        
        try:
            print("token:", token)
            print("secret:", app.config['SECRET_KEY'])

            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])

            print("data: ", data)
            
            current_user = UserRepository().get_one(data['user_id'])
        except:
            return {'message': 'Token is invalid!'}, 401
        
        return f(*args, current_user, **kwargs)
    
    return decorated
