import { Pool } from "../deps.js";


const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  hostname: Deno.env.get('PGHOST'),
  database: Deno.env.get('PGDATABASE'),
  user: Deno.env.get('PGUSER'),
  password: Deno.env.get('PGPASSWORD'),
  port: Number(Deno.env.get('PGPORT')),
}, CONCURRENT_CONNECTIONS);


export { connectionPool }; 