const mongoose =  require("mongoose");

const questionSchema = new mongoose.Schema({
    category: {
        type: String,
    },
    question: {
        type: String,
    },
    options: {
        type: [String],
    },
    correctAnswer: {
        type: String,
    },

});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;