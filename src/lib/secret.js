const STORAGE_KEY = "authenticated";
const SECRET = "Sweet!";

function checkAuthenticationCode(value) {
    return value == SECRET;
}

function checkIfAuthenticated() {
    return window.sessionStorage[STORAGE_KEY];
}

function saveAuthenticationState(component, state, pushRoute) {
    component.authenticated = state;
    window.sessionStorage[STORAGE_KEY] = state;
    component.$router.push(pushRoute);
}

export { checkIfAuthenticated, saveAuthenticationState, checkAuthenticationCode }