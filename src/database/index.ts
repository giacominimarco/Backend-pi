import { createConnection } from 'typeorm'

createConnection().then(() => console.log('Sucesso, conexão com a database estabelecida'));
