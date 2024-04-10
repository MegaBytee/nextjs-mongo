import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI && !process.env.MG_DB_NAME) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const MG_DB_NAME = process.env.MG_DB_NAME;
const uri = String(process.env.MONGODB_URI);

async function MgClient() {

    const options = {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    };

    return MongoClient.connect(uri, options);

}

export async function MongoDB() {
    try {
        const client = await MgClient();
        return client.db(MG_DB_NAME);

    } catch (e) {
        console.error(e);
    }
}