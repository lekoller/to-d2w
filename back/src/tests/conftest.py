from flask_migrate import upgrade
import pytest

from main import create_app, base, api, migrate_db


@pytest.fixture()
def app():
    db_url = "sqlite://"
    db_name = "test"

    app = create_app(db_url=db_url, db_name=db_name)
    
    app.config.update({
        "TESTING": True,
    })

    with app.app_context():
        base.db.init_app(app)
        api.start_api(app)
        migrate_db(app, base.db)
        upgrade()

    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()