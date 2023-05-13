from entity.task import Task

def test_task_initialization():
    task = Task(id=1, title='Task 1', description='Description 1', done=False)

    assert task.id == 1
    assert task.title == 'Task 1'
    assert task.description == 'Description 1'
    assert task.done == False


def test_task_initialization_with_none_description():
    task = Task(id=3, title='Task 3', description=None, done=True)

    assert task.id == 3
    assert task.title == 'Task 3'
    assert task.description is None
    assert task.done == True

def test_task_initialization_with_default_done():
    task = Task(id=4, title='Task 4', description='Description 4', done=False)

    assert task.id == 4
    assert task.title == 'Task 4'
    assert task.description == 'Description 4'
    assert task.done == False

