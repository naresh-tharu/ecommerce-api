const { MongoClient } = require("mongodb");
const { DB } = require("../../config/db.config");

class MongoDBService {
    _connection;
    _db;
    constructor() {
        this.connect()
    }

    connect = async () => {
        try {
            this._connection = await MongoClient.connect(DB.URL)
            this._db = this._connection.db(DB.NAME)
        } catch (err) {
            console.log("DB Connection Error...", err)
            throw err
        }
    }
}

module.exports = MongoDBService;