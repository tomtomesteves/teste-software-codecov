import pytest


from unittest.mock import MagicMock, patch

from services.tasks_manager import TaskManager
from entity.task import Task


@pytest.fixture(autouse=True)
def mock_postgresql_connection():
    with patch("services.tasks_manager.PostgreSQLConnection") as mock_class:
        mock_db = MagicMock()
        mock_class.return_value = mock_db
        yield mock_db


def test_create_task(mock_postgresql_connection):
    task_manager = TaskManager()
    task_manager.create_task = MagicMock(
        return_value=Task(id=1, title="Task 1", description="Description 1", done=False)
    )

    result = task_manager.create_task("Task 1", "Description 1")

    assert result.id == 1
    assert result.title == "Task 1"
    assert result.description == "Description 1"
    assert result.done == False


def test_get_task(mock_postgresql_connection):
    task_manager = TaskManager()
    task_manager.get_task = MagicMock(
        return_value=Task(id=1, title="Task 1", description="Description 1", done=False)
    )

    result = task_manager.get_task(1)

    assert result.id == 1
    assert result.title == "Task 1"
    assert result.description == "Description 1"
    assert result.done == False


def test_update_task(mock_postgresql_connection):
    task_manager = TaskManager()
    task_manager.update_task = MagicMock(
        return_value=Task(
            id=1, title="Updated Task", description="Updated Description", done=True
        )
    )

    result = task_manager.update_task(1, "Updated Task", "Updated Description", True)

    assert result.id == 1
    assert result.title == "Updated Task"
    assert result.description == "Updated Description"
    assert result.done == True


def test_delete_task(mock_postgresql_connection):
    task_manager = TaskManager()
    task_manager.delete_task = MagicMock(
        return_value=Task(id=1, title="Task 1", description="Description 1", done=False)
    )

    result = task_manager.delete_task(1)

    assert result.id == 1
    assert result.title == "Task 1"
    assert result.description == "Description 1"
    assert result.done == False


def test_get_all_tasks(mock_postgresql_connection):

    mock_db = MagicMock()
    mock_postgresql_connection.return_value = mock_db

    task_manager = TaskManager()
    task_manager.get_all_tasks = MagicMock(
        return_value=[
            Task(id=1, title="Task 1", description="Description 1", done=False),
            Task(id=2, title="Task 2", description="Description 2", done=True),
            Task(id=3, title="Task 3", description="Description 3", done=False),
        ]
    )

    result = task_manager.get_all_tasks()

    assert len(result) == 3
    assert result[0].id == 1
    assert result[0].title == "Task 1"
    assert result[0].description == "Description 1"
    assert result[0].done == False
    assert result[1].id == 2
    assert result[1].title == "Task 2"
    assert result[1].description == "Description 2"
    assert result[1].done == True
    assert result[2].id == 3
    assert result[2].title == "Task 3"
    assert result[2].description == "Description 3"
    assert result[2].done == False


def test_get_all_tasks_empty_list(mock_postgresql_connection):
    task_manager = TaskManager()
    task_manager.get_all_tasks = MagicMock(return_value=[])

    result = task_manager.get_all_tasks()

    assert len(result) == 0


def test_get_no_task(mock_postgresql_connection):
    mock_postgresql_connection.fetchone.return_value = None
    task_manager = TaskManager()
    result = task_manager.get_task(2)
    assert result == None


def test_update_task_not_found(mock_postgresql_connection):
    mock_postgresql_connection.fetchone.return_value = None
    task_manager = TaskManager()
    result = task_manager.update_task(2, "Updated Task", "Updated Description")
    assert result == None


def test_delete_task_invalid_id(mock_postgresql_connection):
    mock_postgresql_connection.fetchone.return_value = None

    task_manager = TaskManager()
    result = task_manager.delete_task(None)
    assert result == None


def test_update_non_existant_task(mock_postgresql_connection):
    mock_postgresql_connection.fetchone.return_value = None
    task_manager = TaskManager()

    result = task_manager.update_task(1, "Updated Task", None, True)
    assert result == None


def test_update_task_sql_syntax(mock_postgresql_connection):
    task = [1, "title", "description", True]
    mock_postgresql_connection.fetchone.return_value = task

    task_manager = TaskManager()
    task_manager.update_task(1, "Updated Task", "Updated Description", True)

    expected = "UPDATE tasks SET title = 'Updated Task', description = 'Updated Description', done = True WHERE id = 1"
    mock_postgresql_connection.execute_query.assert_called_with(expected)
