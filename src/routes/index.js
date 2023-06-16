const auth = require('./auth.route');
const contact = require('./contact.route');
const home = require('./home.route');
const quote = require('./quote.route');
const service = require('./service.route');
const admin = require('./admin.route');

module.exports = [ auth, contact, home, quote, service, admin ];
