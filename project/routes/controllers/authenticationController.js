import { validate, required, minLength, isEmail } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";
import * as auth from "../../services/authenticationService.js";

// Shows the login form
const showLogin = async ({render, session}) => {
    const data = {
        errors: {},
        authStatus: await auth.authenticationStatus(session),
    };
    render('auth/login.ejs', data);
}

// Shows logout functionality
const showLogout = async ({session, render}) => {
    const data = {
        authStatus: await auth.authenticationStatus(session),
    };
    render('auth/logout.ejs', data);
}

// Shows the registration form
const showRegister = async ({render, session}) => {
    const data = {
        email: "",
        errors: {},
        success: "",
        authStatus: await auth.authenticationStatus(session),
    };
    render('auth/register.ejs', data);
}

// Submits the login form
const postLogin = async ({render, response, request, session}) => {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');

    // Attempt to login and fetch user data
    const userObj = await auth.login(email, password);
    // If no user was found, return the error message
    if (Object.keys(userObj).length === 0) {
        const data = {
            authStatus: await auth.authenticationStatus(session),
            errors: {login: {message: "Login failed."}}
        };
        response.status = 401;
        render("auth/login.ejs", data);
        return;
    }

    // Set session data
    await session.set('authenticated', true);
    await session.set('user', {
        id: userObj.id,
        email: userObj.email
    });
    response.body = 'Authentication successful!';
    response.status = 200;
    response.redirect("/");
}

// Submits the logout
const postLogout = async ({session, response}) => {
    await session.set('authenticated', false);
    await session.set('user', {});
    response.status = 200;
    response.body = "Successfully logged out.";
    response.redirect('/');
}

const validateRegistrationForm = async (data) => {
    const validationRules = {
        email: [required, minLength(6), isEmail],
        password: [required, minLength(4)],
    };

    return await validate(data, validationRules);
}

// Submits the registration form.
const postRegister = async ({render, request, session}) => {
    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');

    // Validate the form
    const data = {
        email: email,
        password: password,
        errors: {},
        success: "",
        authStatus: await auth.authenticationStatus(session),
    };
    const [passes, errors] = await validateRegistrationForm(data);

    if (!passes) {
        data.errors = errors;
        if (errors.hasOwnProperty(email)) {
            data.email = email;
        }
        render("auth/register.ejs", data);
        return;
    }

    if (password !== verification) {
        data.errors.password = {message: "The entered passwords did not match"};
        render("auth/register.ejs", data);
        return;
    }

    if (await auth.emailExists(email)) {
        data.errors.email = {message: "Email reserved."};
        render("auth/register.ejs", data);
        return;
    }
    
    // Register to the database
    await auth.register(email, password);
    // Display that the registration was successful
    data.success = "Registration was successful. You may now login.";

    render("auth/register.ejs", data);
}

export { showLogin, showLogout, showRegister, postLogin, postLogout, postRegister }