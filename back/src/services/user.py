from entities.user import User
from repository.user import UserRepository

class UserService():
    def __init__(self, user_repository: UserRepository):
        self.repository = user_repository

    def create(self, body: dict) -> dict:
        user = User(
            name=body.get('name'),
            password=body.get('password')
        )

        model = self.repository.create(user)

        return model.to_dict()
    
    def find_one(self, id: int) -> dict:
        model = self.repository.get_one(id)

        if not model:
            return None

        return model.to_dict()
    
