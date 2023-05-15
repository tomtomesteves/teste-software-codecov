from flask import Flask, jsonify, request
from services.tasks_manager import TaskManager
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

task_manager = TaskManager()

# Rota raiz
@app.route("/", methods=["GET"])
def root():
    return jsonify({"message": "OK"})

# Rota para listar todas as tarefas
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = task_manager.get_all_tasks()
    task_list = [{"id": task.id, "title": task.title, "description": task.description, "done": task.done} for task in tasks]
    return jsonify({"tasks": task_list})

# Rota para obter uma única tarefa
@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = task_manager.get_task(task_id)
    if task:
        task_data = {
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'done': task.done
        }
        return jsonify(task_data)
    else:
        return jsonify({'error': 'Tarefa não encontrada'}), 404

# Rota para criar uma nova tarefa
@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    task = task_manager.create_task(title=data.get("title"), description=data.get("description"))
    return jsonify({"message": "Tarefa criada com sucesso", "task": {"id": task.id, "title": task.title, "description": task.description, "done": task.done}})

# Rota para atualizar uma tarefa existente
@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()
    task = task_manager.update_task(task_id, title=data.get("title"), description=data.get("description"), done=data.get("done"))
    if task:
        return jsonify({"message": "Tarefa atualizada com sucesso", "task": {"id": task.id, "title": task.title, "description": task.description, "done": task.done}})
    else:
        return jsonify({"message": "Tarefa não encontrada"})

# Rota para deletar uma tarefa existente
@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = task_manager.delete_task(task_id)
    if task:
        return jsonify({"message": "Tarefa deletada com sucesso"})
    else:
        return jsonify({"message": "Tarefa não encontrada"})


if __name__ == '__main__':
    app.run("0.0.0.0", port=80, debug=True)