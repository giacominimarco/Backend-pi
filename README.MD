Para criar as migrations, utilizar o comando
yarn typeorm migration:create -n 'nome da tabela'
yarn typeorm migration:run


{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "root",
    "database": "pi4",
    "entities": [
        "./src/models/*.ts"
    ],
    "migrations": [
        "./src/database/migrations/*.ts"
    ],
    "cli":  {
        "migrationsDir":  "./src/database/migrations"
    }


}
