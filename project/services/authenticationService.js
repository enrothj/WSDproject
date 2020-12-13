import { executeQuery } from "../database/database.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";


const emailExists = async (email) => {
    const result = await executeQuery("SELECT * FROM users WHERE email = $1;", email)
    if (result.rowCount === 0) {
        return false;
    } else {
        return true;
    }
}

const register = async (email, password) => {
    const hash = bcrypt.hash(data.password);
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2)", email, hash);
}


const login = async (email, password) => {

    // check if the email exists in the database
    const result = await emailExists(email);
    if (res.rowCount === 0) {
        return {};
    }

    const userObj = result.rowsOfObjects()[0];
    const hash = userObj.password;
    const passwordCorrect = await bcrypt.compare(password, hash);
    if (!passwordCorrect) {
        return {};
    }
    return userObj;
}

export { emailExists, login, register }