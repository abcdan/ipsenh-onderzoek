import { Client } from "pg";
export declare class PG {
    private static _client;
    constructor();
    private connect;
    createStringTable(): Promise<void>;
    insertString(client: Client, inputString: String): Promise<void>;
    readString(client: Client): Promise<void>;
    deleteString(client: Client, inputString: String): Promise<void>;
}
