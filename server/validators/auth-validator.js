const {z} = require("zod");

const loginSchema = z.object({
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(3, {message: "Email must be atleast of 3 characters"})
    .max(255, {message: "Email must not be of more than 255 characters"}),

    password: z
    .string({required_error: "Password is required"})
    .min(6, {message: "Password must be of atleast 6 characters"})
    .max(1024, {message: "Password can't be greater than 1024 characters"}),
});

const signupSchema = loginSchema.extend({
    username: z
    .string({required_error: "Username is required"})
    .trim()
    .min(3, {message: "Username must be atleast of 3 characters"})
    .max(255, {message: "Username must not be of more than 255 characters"}),

    phone: z
    .string({required_error: "Phone number is required"})
    .trim()
    .min(10, {message: "Phone number must be of 10 characters"})
    .max(10, {message: "Phone number must not be more than 10 characters"}),

    confirm_password: z
    .string({required_error: "Password is required"})
    .min(6, {message: "Password must be of atleast 6 characters"})
    .max(1024, {message: "Password can't be greater than 1024 characters"}),
})
.refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"], // Path to the field where the error should appear
    message: "Passwords do not match",
  });
;



module.exports = {signupSchema, loginSchema};

