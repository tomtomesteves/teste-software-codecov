import pytest

from unittest.mock import Mock, patch, MagicMock

from services.database import DatabaseConnection
from psycopg2 import OperationalError


@patch("psycopg2.connect")
def test_postgresql_connection(mock_connect):
    mock_cursor = Mock()
    mock_connection = Mock()
    mock_connection.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_connection

    connection = DatabaseConnection(
        host="localhost",
        port=5432,
        database="mydatabase",
        user="myuser",
        password="mypassword",
    )

    connection.connect()
    mock_connect.assert_called_with(
        host="localhost",
        port=5432,
        database="mydatabase",
        user="myuser",
        password="mypassword",
    )
    assert connection.connection == mock_connection


@patch("psycopg2.connect")
def test_postgresql_query(mock_connect):
    mock_cursor = Mock()
    mock_connection = Mock()
    mock_connection.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_connection

    connection = DatabaseConnection(
        host="localhost",
        port=5432,
        database="mydatabase",
        user="myuser",
        password="mypassword",
    )
    connection.connect()
    query = "SELECT * FROM tasks"
    connection.execute_query(query)
    mock_cursor.execute.assert_called_once_with(query)


@patch("psycopg2.connect")
def test_postgresql_transaction(mock_connect):
    mock_cursor = Mock()
    mock_connection = Mock()
    mock_connection.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_connection

    connection = DatabaseConnection(
        host="localhost",
        port=5432,
        database="mydatabase",
        user="myuser",
        password="mypassword",
    )
    connection.connect()
    connection.commit()
    mock_connection.commit.assert_called_once()


@patch("psycopg2.connect")
def test_postgresql_close_connection(mock_connect):
    mock_cursor = Mock()
    mock_connection = Mock()
    mock_connection.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_connection

    connection = DatabaseConnection(
        host="localhost",
        port=5432,
        database="mydatabase",
        user="myuser",
        password="mypassword",
    )
    connection.connect()
    connection.close()
    mock_cursor.close.assert_called_once()
    mock_connection.close.assert_called_once()

@patch("psycopg2.connect")
def test_postgresql_fetchone(mock_connect):
    mock_cursor = Mock()
    mock_connection = Mock()
    mock_connection.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_connection

    connection = DatabaseConnection(
        host="localhost",
        port=5432,
        database="mydatabase",
        user="myuser",
        password="mypassword",
    )
    connection.connect()
    connection.fetchone()
    mock_cursor.fetchone.assert_called_once()

@patch("psycopg2.connect")
def test_postgresql_fetchall(mock_connect):
    mock_cursor = Mock()
    mock_connection = Mock()
    mock_connection.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_connection

    connection = DatabaseConnection(
        host="localhost",
        port=5432,
        database="mydatabase",
        user="myuser",
        password="mypassword",
    )
    connection.connect()
    connection.fetchall()
    mock_cursor.fetchall.assert_called_once()

@patch('time.sleep')
def test_postgresql_connection_error(time):
    connection = DatabaseConnection(
        host="localhost",
        port=5555,
        database="mydatabase",
        user="myuser",
        password="mypassword",
    )

    with pytest.raises(OperationalError):
        connection.connect()
