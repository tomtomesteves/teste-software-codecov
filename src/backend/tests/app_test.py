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

def test_get_all_tasks(test_client):
    for i in range(5):
        test_client.post("/tasks", json={"title": f"title{i}", "description": f"description{i}"})

    response = test_client.get("/tasks")
    assert response.status_code == 200
    tasks = response.json["tasks"]
    assert len(tasks) == 5


def test_get_single_task(test_client):
    response = test_client.post("/tasks", json={"title": "title1", "description": "description1"})
    task_id = 1

    response = test_client.get(f"/tasks/{task_id}")
    assert response.status_code == 200
    task = response.json
    assert task["id"] == task_id

def test_update_task(test_client):
    response = test_client.post("/tasks", json={"title": "title1", "description": "description1"})
    task_id = response.json["task"]["id"]

    response = test_client.put(f"/tasks/{task_id}", json={"title": "new title", "description": "new description", "done": True})
    assert response.status_code == 200
    task = response.json["task"]
    assert task["title"] == "new title"


def test_404_for_non_existent_task(test_client):
    response = test_client.get("/tasks/9999")
    assert response.status_code == 404