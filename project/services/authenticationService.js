import { executeQuery } from "../database/database.js";
import * as bcrypt from "../deps.js";

// Returns a text telling if the user is logged in. Shown in the header
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

// Checks if the given email already exists in the database
const emailExists = async (email) => {
    const result = await executeQuery("SELECT * FROM users WHERE email = $1;", email)
    if (result.rowCount === 0) {
        return false;
    } else {
        return true;
    }
}

// Registers the user with the given email and (hashed) password
const register = async (email, password) => {
    const hash = await bcrypt.hash(password);
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