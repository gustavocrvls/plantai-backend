var app = require('./config/server')()

require('./config/database')('mongodb+srv://carvalho:YdPA3ccZoEdyA2yG@sirius-bsehu.gcp.mongodb.net/test?retryWrites=true&w=majority');

app.listen(app.get('port'), function () {
    console.log(`Server on port ${app.get('port')}`)
})
