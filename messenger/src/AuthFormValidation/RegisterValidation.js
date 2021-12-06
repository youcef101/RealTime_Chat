
function RegisterValidation(input) {
    let errors = {}
    if (!input.firstName) {
        errors.firstName = 'first name is required .'
    }
    if (!input.lastName) {
        errors.lastName = 'last name is required .'
    }
    if (!input.email) {
        errors.email = 'email is required .'
    }
    if (!input.password) {
        errors.password = 'password is required .'
    }
    if (!input.password_confirm) {
        errors.password_confirm = 'password confirm is required .'
    }
    if (input.password !== input.password_confirm) {
        errors.password_confirm = 'password didnt match .'
    }
    return errors
}

export default RegisterValidation
