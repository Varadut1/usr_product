"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }).min(2, 'Name must be at least 2 characters'),
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Invalid email'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(8, 'Password must be at least 8 characters'),
        passwordConfirmation: (0, zod_1.string)({
            required_error: 'Confirm password is required',
        }).min(8, 'Confirm password must be at least 8 characters'),
    })
        .refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    }),
});
