const Parse = require('parse/node');

const parseConfig = () => {
    Parse.initialize(process.env.APP_ID, process.env.JS_KEY);
    Parse.serverURL = 'https://parseapi.back4app.com/';
};

module.exports = parseConfig;
