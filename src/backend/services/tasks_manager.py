from entity.task import Task
from services.database import PostgreSQLConnection


class TaskManager:
    def __init__(self):
        self.db = PostgreSQLConnection(
            host="localhost",
            port=5432,
            database="mydatabase",
            user="myuser",
            password="mypassword",
        )
        self.db.connect()
        self.initialize_database()

    def initialize_database(self):
        query = """
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            done BOOLEAN
        )
        """
        self.db.execute_query(query)

    def create_task(self, title, description):
        query = f"INSERT INTO tasks (title, description, done) VALUES ('{title}', '{description}', false) RETURNING id"
        self.db.execute_query(query)
        task_id = self.db.fetchone()[0]
        self.db.commit()
        return self.get_task(task_id)

    def get_task(self, task_id):
        query = f"SELECT id, title, description, done FROM tasks WHERE id = {task_id}"
        self.db.execute_query(query)
        result = self.db.fetchone()
        if result:
            task = Task(title=result[1], description=result[2], done=result[3])
            task.id = result[0]
            return task
        else:
            return None

    def update_task(self, task_id, title=None, description=None, done=None):
        task = self.get_task(task_id)
        if task:
            if title is not None:
                task.title = title
            if description is not None:
                task.description = description
            if done is not None:
                task.done = done
            query = f"UPDATE tasks SET title = '{task.title}', description = '{task.description}', done = {task.done} WHERE id = {task.id}"
            self.db.execute_query(query)
            self.db.commit()
            return task
        else:
            return None

    def delete_task(self, task_id):
        task = self.get_task(task_id)
        if task:
            query = f"DELETE FROM tasks WHERE id = {task.id}"
            self.db.execute_query(query)
            self.db.commit()
            return task
        else:
            return None

    def get_all_tasks(self):
        query = "SELECT id, title, description, done FROM tasks"
        self.db.execute_query(query)
        results = self.db.fetchall()
        tasks = []
        for result in results:
            task = Task(title=result[1], description=result[2], done=result[3])
            task.id = result[0]
            tasks.append(task)
        return tasks
