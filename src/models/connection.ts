import * as mysql from 'mysql';
import { IConnection, IConnectionConfig } from 'mysql';

export class Connection {
  getConnection() {
    return new Promise((resolve, reject) => {
      let config: IConnectionConfig = {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME || 'hdc',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
      }

      let pool = mysql.createPool(config);

      pool.getConnection((err, connection: IConnection) => {
        if (err) reject(err);
        else resolve(connection)
      });

      pool.on('connection', (connection) => {
        connection.query('SET NAMES utf8')
      });
    });
  }
  
}