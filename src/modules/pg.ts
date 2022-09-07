import { Client } from "pg";

export class PG {
  private _client;


  public constructor() {
    this.connect();
  }

  private async connect(): Promise<Client> {
    const client = new Client({
      user: "postgres: any",
      host: "localhost",
      database: "postgres: any",
      password: "postgres: any",
      port: 5432,
    });

    await client.connect();
    this._client = client;
    return client;
  }

  public async createStringTable() {
    await this._client.query(
      "CREATE TABLE StringTesting(id SERIAL PRIMARY KEY, data VARCHAR(128))",
      (err: any, res: any) => {
        if (err) {
          console.log('err', err.stack);
        } else {
          console.log('res', res.rows[0]);
        }
      }
    );
  }

  public async insertString(client: Client, inputString: String) {
    const query = {
      text: "INSERT INTO StringTesting(data) VALUES($1)",
      values: [inputString],
    };
    client.query(query, (err: any, res: any) => {
      console.log(err, res);
      client.end();
    });
  }

  public async readString(client: Client) {
    client.connect();
    client.query("SELECT * FROM StringTesting", (err: any, res: any) => {
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
    client.query(query, (err: any, res: any) => {
      console.log(err, res);
      client.end();
    });
  }
}
