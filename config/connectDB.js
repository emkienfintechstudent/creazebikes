import pg from "pg"
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Project_web",
    password: "1234",
    port: 5432,
  });
  export default db 