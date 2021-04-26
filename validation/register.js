const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
    let errors = {};
// Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.gender= !isEmpty(data.gender) ? data.gender : "";

    data.userType = !isEmpty(data.userType) ? data.userType : "";

    data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : "";

    data.weightInKgs = !isEmpty(data.weightInKgs) ? data.weightInKgs : "";

    data.heightInCms = !isEmpty(data.heightInCms) ? data.heightInCms : "";

    data.userType = !isEmpty(data.userType) ? data.userType : "";
    data.trainerId = !isEmpty(data.trainerId) ? data.trainerId : "";
    data.about = !isEmpty(data.about) ? data.about : "";




// Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
// Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // userType check
    if (Validator.isEmpty(data.gender)) {
        errors.gender = "Gender Type field is required";
    }


    if (Validator.isEmpty(data.dateOfBirth)) {
        errors.dateOfBirth = "Date of birth Type field is required";
    }
    if (Validator.isEmpty(data.weightInKgs)) {
        errors.weightInKgs = "Weight Type field is required";
    }
    if (Validator.isEmpty(data.heightInCms)) {
        errors.heightInCms = "Height Type field is required";
    }
    if (Validator.isEmpty(data.userType)) {
        errors.userType = "User Type field is required";
    }
    if (Validator.isEmpty(data.about)) {
        errors.about = "User Bio field is required";
    }

// Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};