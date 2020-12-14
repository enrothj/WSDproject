import { executeQuery } from "../database/database.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

// Returns a text telling if the user is logged in.
const authenticationStatus = async (session) => {
    if (await session.get('authenticated')) {

        return `You are logged in as ${(await session.get('user')).email}`;
    } else {
        return "You are not logged in."
    }
}

// Returns the id of the user from the session data.
const getUserId = async (session) => {
    const userObj = await session.get('user');
    return userObj.id;
}

const emailExists = async (email) => {
    const result = await executeQuery("SELECT * FROM users WHERE email = $1;", email)
    if (result.rowCount === 0) {
        return false;
    } else {
        return true;
    }
}

const register = async (email, password) => {
    const hash = await bcrypt.hash(password);
    console.log(hash);
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2)", email, hash);
}

// Attempt login with the provided email/password combination. Return found user object if successful
const login = async (email, password) => {

    // check if the email exists in the database
    const result = await executeQuery("SELECT * FROM users WHERE email = $1;", email)
    if (result.rowCount === 0) {
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

export { authenticationStatus, getUserId, emailExists, login, register }