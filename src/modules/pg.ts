import { Client } from "pg";

export class PG {
  private static _client: Client;


  public constructor() {
    this.connect();
  }

  private async connect(): Promise<Client> {
    const client = new Client({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "postgres",
      port: 5432,
    });

    await client.connect();
    PG._client = client;
    return client;
  }

  public async createStringTable() {
    PG._client.query(
      "CREATE TABLE StringTesting(id SERIAL PRIMARY KEY, data VARCHAR(128))",
      (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows[0]);
        }
      }
    );
  }

  public async insertString(client: Client, inputString: String) {
    const query = {
      text: "INSERT INTO StringTesting(data) VALUES($1)",
      values: [inputString],
    };
    client.query(query, (err, res) => {
      console.log(err, res);
      client.end();
    });
  }

  public async readString(client: Client) {
    client.connect();
    client.query("SELECT * FROM StringTesting", (err, res) => {
      console.log(err, res);
      client.end();
    });
  }

  public async deleteString(client: Client, inputString: String) {
    client.connect();
    const query = {
      text: "DELETE FROM StringTesting WHERE data = $1",
      values: [inputString],
    };
    client.query(query, (err, res) => {
      console.log(err, res);
      client.end();
    });
  }
}
