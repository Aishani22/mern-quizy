const cron = require('node-cron');
const { getQuestions } = require('../controllers/questionController');

cron.schedule('0 0 * * 7', () => { // Runs every Sunday at midnight
    console.log('Fetching new questions from Trivia API...');
    getQuestions();
});
