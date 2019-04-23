
const {
    VERSION,
    PORT,
} = process.env;

var app = require('./app');
var server = require('http').Server(app);


server.listen(process.env.PORT || 8090, () => {
    console.log("Server started on port : " + process.env.PORT);
});