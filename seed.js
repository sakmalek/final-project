require('dotenv/config');

const mongoose = require('mongoose')

const faker = require("faker");
const User = require('./models/User.model')
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
})
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });

let users = [];
for (let i = 0; i < 5000; i += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    let newUser = {
        email: faker.internet.email(firstName, lastName),
        username: firstName,
        password_hash: "password123"
    };
    users.push(newUser);
}
console.log(users)

User.insertMany(users, {ordered: false})
    .then((user) => {
        mongoose.connection.close();
    })
    .catch(err => console.log(err))
