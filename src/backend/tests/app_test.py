import pytest
from flask.testing import FlaskClient
from app import create_app

@pytest.fixture(scope="function")
def test_app():
    test_config = {
        "DB_HOST": ":memory:",
        "DB_PORT": None,
        "DB_NAME": ":memory:",
        "DB_USER": None,
        "DB_PASSWORD": None,
        "DB_TYPE": "sqlite",
    }
    app = create_app(test_config)
    with app.app_context():
        yield app

@pytest.fixture(scope="function")
def test_client(test_app):
    with test_app.test_client() as client:
        yield client

def test_create_and_delete_task(test_client):
    response = test_client.post("/tasks", json={"title": "title1", "description": "description1"})
    assert response.status_code == 200
    task = response.json["task"]
    response = test_client.delete(f"/tasks/{task['id']}")
    assert response.status_code == 200
