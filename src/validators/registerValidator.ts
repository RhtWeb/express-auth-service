import { checkSchema } from "express-validator";

export default checkSchema({
    email: {
        errorMessage: "Email is required!",
        notEmpty: true,
        trim: true,
        isEmail: {
            errorMessage: "Email is not valid",
        },
    },
    firstName: {
        errorMessage: "Firstname is required!",
        notEmpty: true,
        trim: true,
    },
    lastName: {
        errorMessage: "Lastname is required!",
        notEmpty: true,
        trim: true,
    },
    password: {
        errorMessage: "password is required!",
        notEmpty: true,
        trim: true,
        isLength: {
            options: {
                min: 8,
            },
            errorMessage: "Password length should be at least 8 chars!",
        },
    },
});

// export default [body("email").notEmpty().withMessage("Email is required!")];
