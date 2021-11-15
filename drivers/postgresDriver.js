const { Pool } = require("pg");

class PostgresDriver {
  constructor() {}

  async initialise() {
    this.pool = new Pool({
      "username": "qbjfyioj",
      "password": "FWuk_Bh6TxUZVtTjVdD8VNbPjFyphA1Q",
      "database": "qbjfyioj",
      "host": "arjuna.db.elephantsql.com",
      "dialect": "postgres",
      "port": 5432
    });
    // await this.client.connect();
  }

  async doInTransaction(callback) {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')
      // const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
      // const res = await client.query(queryText, ['brianc'])
      // const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
      // const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
      // await client.query(insertPhotoText, insertPhotoValues)
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
    // await this.client.query('BEGIN');

    // await callback(this.client, async () => {
    //   await this.client.query('ROLLBACK');
    //   return {
    //     successful: false
    //   };
    // });

    // await this.client.query('COMMIT');

    // return {
    //   successful: true,
    // }
  }

  // async query(queryString, variables) {
  //   return await new Promise((resolve, reject) => {
  //     try {
  //       this.client.query(queryString, variables, (error, result) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(result);
  //         }
  //       });
  //     }
  //     catch (exception) {
  //       console.error(exception)
  //     }
  //   });
  // }

  // disconnect() {
  //   this.client.end();
  // }
}

const postgresDriver = new PostgresDriver();

module.exports = postgresDriver;
