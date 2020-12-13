import * as auth from "../../services/authenticationService.js";

// Shows the login form
const showLogin = ({render}) => {
    render('authentication/login.ejs');
}

// Shows the registration form
const showRegister = ({render}) => {
    render('authentication/register.ejs');
}

// Submits the login form
const postLogin = async ({render, request, session}) => {

}

// Submits the registration form.
const postRegister = async ({render, request}) => {

}

export { showLogin, showRegister, postLogin, postRegister }