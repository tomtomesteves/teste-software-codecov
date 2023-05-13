#!/bin/bash

while ! psql -h localhost -U $POSTGRES_USER -lqt | cut -d \| -f 1 | grep -qw $POSTGRES_DB; do
    echo "Aguardando a disponibilidade do banco de dados..."
    sleep 1
done

python3 -c "import pgadmin4; pgadmin4.setup()"

echo "Configuração do pgAdmin concluída."
