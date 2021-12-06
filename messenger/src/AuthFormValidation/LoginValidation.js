function LoginValidation(input) {
    let errors = {};
    if (!input.email) {
        errors.email = 'email is required .'
    }
    if (!input.password) {
        errors.password = "password is required ."
    }
    return errors
}

export default LoginValidation
