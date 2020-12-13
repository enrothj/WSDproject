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
    render('auth/register.ejs');
}

// Submits the login form
const postLogin = async ({render, request, session}) => {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');

    // Attempt to login and fetch user data
    const userObj = await auth.login(email, password);
    if (Object.keys(userObj).length === 0) {
        response.status = 401;
        return;
    }

    // Set session data
    await session.set('authenticated', true);
    await session.set('user', {
        id: userObj.id,
        email: userObj.email
    });
    response.body = 'Authentication successful!';
}

// Submits the logout
const postLogout = ({session, response}) => {
    await session.set('authenticated', false);
    await session.set('user', {});
    response.status = 200;
    response.body = "Successfully logged out.";
}

const validateRegistrationForm = (data) => {
    const validationRules = {
        email: [required, minLength(6), isEmail],
        password: [required, minLength(6)],
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

    // Validate the form
    const data = {};
    const [passes, errors] = validateRegistrationForm({email: email, password: password});

    if (!passes) {
        data.errors = errors;
        render("auth/register.ejs", data);
        return;
    }

    if (password !== verification) {
        data.errors.password = 'The entered passwords did not match';
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
    // Display that the registration was successful (in the error partial :P)
    data.errors.success = "Registration was successful. You may now login.";
    render("auth/register.ejs", data);
}

export { showLogin, showLogout, showRegister, postLogin, postLogout, postRegister }