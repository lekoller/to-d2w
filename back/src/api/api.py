from flask import Flask
from flask_restful import Api

from resources.crud import ItemCrudResource
from resources.mark import ItemMarkResource
from repository.item import ItemRepository
from services.item import ItemService


def start_api(app: Flask):
    api = Api(app, prefix='/api/v1')

    api.add_resource(
        ItemCrudResource, 
        '/item', 
        resource_class_kwargs={ "service": ItemService(ItemRepository()) }
    )
    api.add_resource(
        ItemMarkResource, 
        '/item/done', 
        resource_class_kwargs={ "service": ItemService(ItemRepository()) }
    )
