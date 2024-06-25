import "reflect-metadata";;

import {DataSource,  DataSourceOptions} from 'typeorm';
import {join} from "path";
const parentDir = join(__dirname, "..");


const connectionOptions:DataSourceOptions = {

    type: "postgres",
    host: process.env.DB_host||"localhost",
    port: 5432,
    username: process.env.DB_username||"postgres",
    password: process.env.DB_password||"1234",
    database: process.env.DB_database||"postgres",
    synchronize: true,
    logging: false,
    entities: [
        join(parentDir, "entity", "*.ts"),
        join(parentDir,  "entity", "*.js")
    ]
 };
 const connection  = new DataSource(connectionOptions);
 export default connection;
