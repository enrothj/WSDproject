let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  config.database = {
    hostname: "hattie.db.elephantsql.com",
    database: "qycqrpwq",
    user: "qycqrpwq",
    password: "02UKWz6ij3-rAI58g-7sqclNnFaclm35",
    port: 5432
  };
}

export { config }; 