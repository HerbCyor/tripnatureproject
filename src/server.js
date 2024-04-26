const express = require('express')
const cors = require('cors')
const { connection } = require('./database/connection')
const routes = require('./routes/routes')
const PORT_API = process.env.PORT_API

class Server {
    constructor(app = express()) {
        this.middlewares(app)
        this.database()
        app.use(routes)
        this.initializeServer(app)

    }

    async middlewares(app) {
        app.use(cors())
        app.use(express.json())


    }

    async database() {
        try {


            await connection.authenticate();
            console.log("Database Connected")
        } catch (error) {
            console.log("Database Connection Failed: ", error)
            throw error
        }
    }

    async initializeServer(app) {
        app.listen(PORT_API, () => console.log(`Server running on port ${PORT_API}`))
    }
}

module.exports = { Server }