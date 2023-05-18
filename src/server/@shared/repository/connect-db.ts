import mongoose from "mongoose";

let connection: true = null

export async function connect() {
    if (connection) return connection;

    try {
        connection = await mongoose
            .connect(process.env.CONNECTION_DSN, {}) as any
    } catch(e) {
        console.error('some error while connect on db', e)
    }

    return connection
}