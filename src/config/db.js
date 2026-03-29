const mongoose = require('mongoose')

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("database is connected");

        })
        .catch(err => {
            console.log("database not connected");
            process.exit(1);

        })
}

module.exports = connectToDB