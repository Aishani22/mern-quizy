const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
    try{
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({message: "Message sent successfully!"});
    }
    catch(error) {
        console.log(error);
        next(error);
        // res.status(400).json({message: "Error in sending message."});
    }
}

module.exports = contactForm;