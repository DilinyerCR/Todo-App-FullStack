const validator = (loginData) => {
    let errors = {}

    if(!/^[^\s@<>()[\]\\.,;:\s@\”]+@[^\s@<>()[\]\\.,;:\s@\”]+\.[^\s@<>()[\]\\.,;:\s@\”]{2,}$/.test(loginData.email)) {
        errors.email = "Enter a valid email!"
    }

    if(!/^(?!.*\s)[a-zA-Z0-9@#$%^&*()-_=+]{6,16}$/.test(loginData.password)) {
        errors.password = "Enter a valid password!"
    }

    return errors;
}

export default validator;


