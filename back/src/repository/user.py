from entities.user import User
from models.user import UserModel
from repository.base import db


class UserRepository:
    def create(self, entity: User) -> UserModel:
        model = UserModel(entity)

        db.session.add(model)
        db.session.commit()

        return model
    
    def get_one(self, user_id) -> UserModel:
        return UserModel.query.get(user_id)
    
    def get_one_by_name(self, name: str) -> UserModel:
        return UserModel.query.filter_by(name=name).first()