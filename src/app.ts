import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/env.plugins";
import { LogModel } from "./data/mongo";
import { MongoDatabase } from "./data/mongo/init";
import { Server } from "./presentation/server";
import 'dotenv/config';


(async() => {
    main();
})();

async function main(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });



    Server.start();
}