import { Pool } from "../deps.js";


const CONCURRENT_CONNECTIONS = 5;
const connectionPool = new Pool({
  hostname: "hattie.db.elephantsql.com",
  database: "qycqrpwq",
  user: "qycqrpwq",
  password: "euMQl-Qnv2K_SBclBq1xpTkChfNPsyC8",// TODO move to .env
  port: 5432
}, CONCURRENT_CONNECTIONS);


export { connectionPool }; 