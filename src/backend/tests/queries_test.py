import pytest
from constants.queries import Queries

class TestQueries:

    def test_get_create_table_query_postgres(self):
        expected_query = """
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                done BOOLEAN
            )
            """
        assert Queries.get_create_table_query("postgres") == expected_query

    def test_get_create_table_query_sqlite(self):
        expected_query = """
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                done BOOLEAN
            )
            """
        assert Queries.get_create_table_query("sqlite") == expected_query

    def test_get_insert_task_query_postgres(self):
        expected_query = "INSERT INTO tasks (title, description, done) VALUES ('{title}', '{description}', false) RETURNING id"
        assert Queries.get_insert_task_query("postgres") == expected_query

    def test_get_insert_task_query_sqlite(self):
        expected_query = "INSERT INTO tasks (title, description, done) VALUES ('{title}', '{description}', 0)"
        assert Queries.get_insert_task_query("sqlite") == expected_query

    def test_get_select_task_query(self):
        expected_query = "SELECT id, title, description, done FROM tasks WHERE id = {task_id}"
        assert Queries.get_select_task_query() == expected_query

    def test_get_update_task_query(self):
        expected_query = "UPDATE tasks SET title = '{title}', description = '{description}', done = {done} WHERE id = {task_id}"
        assert Queries.get_update_task_query() == expected_query

    def test_get_delete_task_query(self):
        expected_query = "DELETE FROM tasks WHERE id = {task_id}"
        assert Queries.get_delete_task_query() == expected_query

    def test_get_select_all_tasks_query(self):
        expected_query = "SELECT id, title, description, done FROM tasks"
        assert Queries.get_select_all_tasks_query() == expected_query
