import pytest

from entity.task import Task
from services.task_validation import TaskValidation

def test_validate_title_valid():
    title = 'Task 1'
    TaskValidation.validate_title(title)
    assert True

def test_validate_title_empty():
    title = ''
    with pytest.raises(ValueError):
        TaskValidation.validate_title(title)

def test_validate_title_max_length():
    title = 'A' * 256
    with pytest.raises(ValueError):
        TaskValidation.validate_title(title)

def test_validate_description_valid():
    description = 'This is a task description.'
    TaskValidation.validate_description(description)
    assert True

def test_validate_description_max_length():
    description = 'A' * 1001
    with pytest.raises(ValueError):
        TaskValidation.validate_description(description)

def test_validate_done_valid():
    done = True
    TaskValidation.validate_done(done)
    assert True

def test_validate_done_invalid():
    done = 'True'
    with pytest.raises(ValueError):
        TaskValidation.validate_done(done)

def test_validate_id_valid():
    task_id = 1
    TaskValidation.validate_id(task_id)
    assert True

def test_validate_id_negative():
    task_id = -1
    with pytest.raises(ValueError):
        TaskValidation.validate_id(task_id)

def test_validate_id_non_integer():
    task_id = 1.5
    with pytest.raises(ValueError):
        TaskValidation.validate_id(task_id)

def test_validate_task_valid():
    task = Task(title='Task 1', description='Description', done=False, id=1)
    TaskValidation.validate_task(task)
    assert True

def test_validate_task_invalid():
    task = Task(title='Task 1', description='Description', done=False, id=1)
    task.title = ''
    with pytest.raises(ValueError):
        TaskValidation.validate_task(task)
