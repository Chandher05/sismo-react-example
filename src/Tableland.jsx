import { Database } from "@tableland/sdk";
import { useEffect } from "react";
// import { Wallet, getDefaultProvider } from "ethers";

// const privateKey = "your_private_key";
// const wallet = new Wallet(privateKey);
// // To avoid connecting to the browser wallet (locally, port 8545).
// // For example: "https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"
// const provider = getDefaultProvider("http://127.0.0.1:8545");
// const signer = wallet.connect(provider);
// Connect to the database

export default function TablelandComponent() {
    const tableName = "profile_420_23"; // Our pre-defined health check table
    const db = new Database();
    useEffect(() => {
        async function callOnLoad() {
            const { results } = await db
                .prepare(`SELECT * FROM ${tableName};`)
                .all();
            console.log(results);
        }
        callOnLoad();
    });
    async function writeintoTable() {
        // Insert a row into the table
        const { meta: insert } = await db
            .prepare(
                `INSERT INTO ${tableName} (id, name, age, gender, bio) VALUES (?, ?, ?, ?, ?);`
            )
            .bind("2", "CS", "21", "female", "something aboout me")
            .run();

        // Wait for transaction finality
        await insert.txn.wait();

        // Perform a read query, requesting all rows from the table
        const { results } = await db
            .prepare(`SELECT * FROM ${tableName};`)
            .all();
        console.log(results);
    }
    return (
        <>
            This is tableland test
            <button onClick={writeintoTable}> WRITE INTO TABLE</button>
        </>
    );
}
