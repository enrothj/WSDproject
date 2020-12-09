import { connectionPool } from "../config/config.js";

const executeQuery = async(query, ...params) => {
  const client = await connectionPool.connect();
  try {
      return await client.query(query, ...params);
  } catch (e) {
      console.log(e);  
  } finally {
      client.release();
  }
  
  return null;
};

export { executeQuery };