# Use a imagem base Python
FROM python:3.9

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos necessários para o diretório de trabalho
COPY ../requirements.txt /app/
COPY ../app.py /app/
COPY ../entity/ /app/entity
COPY ../services/ /app/services
COPY ../tests/ /app/tests

RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta em que a aplicação Flask estará em execução
EXPOSE 80

# Define o comando para iniciar a aplicação
CMD ["python", "app.py"]
