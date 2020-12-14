import { validate, required, minLength, isEmail } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";
import * as auth from "../../services/authenticationService.js";

// Shows the login form
const showLogin = ({render}) => {
    render('auth/login.ejs');
}

// Shows logout functionality
const showLogout = ({render}) => {
    render('auth/logout.ejs');
}

// Shows the registration form
const showRegister = ({render}) => {
    const data = {
        email: "",
        errors: {},
        success: "",
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
    if (Object.keys(userObj).length === 0) {
        data = {errors: {login: "Login failed."}};
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
}

const validateRegistrationForm = async (data) => {
    const validationRules = {
        email: [required, minLength(6), isEmail],
        password: [required, minLength(4)],
    };

    return await validate(data, validationRules);
}

// Submits the registration form.
const postRegister = async ({render, request}) => {
    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');

    console.log(email+","+password+","+verification);

    // Validate the form
    const data = {
        email: email,
        password: password,
        errors: {},
        success: "",
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
        data.errors.password = "The entered passwords did not match";
        render("auth/register.ejs", data);
        return;
    }

    if (await auth.emailExists(email)) {
        data.errors.email = "Email reserved.";
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