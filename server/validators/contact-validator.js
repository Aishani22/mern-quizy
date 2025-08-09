const {z} = require("zod");

const contactSchema = z.object({
    username: z
    .string({required_error: "Username is required"})
    .trim()
    .min(3, {message: "Username must be atleast of 3 characters"})
    .max(255, {message: "Username must not be of more than 255 characters"}),

    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(3, {message: "Email must be atleast of 3 characters"})
    .max(255, {message: "Email must not be of more than 255 characters"}),

    message: z
    .string({required_error: "Message is required"})
});

module.exports = contactSchema;