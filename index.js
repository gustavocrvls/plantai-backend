const app = require('./config/server');

require('./config/database')(process.env.DB_URI);

app.listen(app.get('port'), function () {
    console.log(`Express server started on port ${app.get('port')}`)
});
