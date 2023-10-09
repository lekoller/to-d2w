from flask import Flask
from flask_restful import Api
from repository.user import UserRepository

from resources.item_crud import ItemCrudResource
from resources.login import LoginResource
from resources.mark_done import ItemMarkResource
from repository.item import ItemRepository
from resources.register_user import UserRegisterResource
from services.item import ItemService
from services.user import UserService

def start_api(app: Flask):
    api = Api(app, prefix='/api/v1')

    # api = Api()

    # api.init_app(app)

    # api.add_namespace(ns=ns)


    api.add_resource(
        ItemCrudResource, 
        '/todo', 
        resource_class_kwargs={ "service": ItemService(ItemRepository()) }
    )
    api.add_resource(
        ItemMarkResource, 
        '/todo/done', 
        resource_class_kwargs={ "service": ItemService(ItemRepository()) }
    )
    api.add_resource(
        UserRegisterResource,
        '/auth',
        resource_class_kwargs={ "service": UserService(UserRepository()) }
    )
    api.add_resource(
        LoginResource,
        '/auth/login',
        resource_class_kwargs={ "service": UserService(UserRepository()) }
    )

