const faker = require("faker");

const appRouter = (app) => {
    app.get('/',  (req, res) => {
        res.status(200).send("Welcome to a restful API<br/>Checkout<a href=\"/user\">/user</a>");
    });

    // NOTE: Creates a single user
    app.get('/user', (req, res) => {
        var data = ({
            firstName: faker.name.firstName(),
            lastname: faker.name.lastName(),
            username: faker.internet.userName(),
            email: faker.internet.email()
        });
        res.status(200).send(data);
    });

    // NOTE: Creates a list of users equal to the number entered.
    app.get('/users/:num', (req, res) => {
        let users = [];
        let num = req.params.num;
        if (isFinite(num) && num > 0) {
            for(i = 0; i <= num; i++) {
                users.push({
                    firstname: faker.name.firstName(),
                    lastname: faker.name.lastName(),
                    username: faker.internet.userName(),
                    email: faker.internet.email()
                });
            }
            res.status(200).send(users);
        } else {
            res.status(400).send({ message: "invalid user number"});
        }
    });
    app.get('/qod', (req, res) => {
        let data = `{
    "success": {
        "total": 1
    },
    "contents": {
        "quotes": [
            {
                "quote": "What you do speaks so loudly that I cannot hear what you say.",
                "length": "61",
                "author": "Ralph Waldo Emerson",
                "tags": {
                    "0": "action",
                    "1": "inspire",
                    "2": "leadership",
                    "3": "management",
                    "5": "tod"
                },
                "category": "inspire",
                "language": "en",
                "date": "2020-07-09",
                "permalink": "https://theysaidso.com/quote/ralph-waldo-emerson-what-you-do-speaks-so-loudly-that-i-cannot-hear-what-you-say",
                "id": "eZ0NtMPtGp8c5eQJOBfJmweF",
                "background": "https://theysaidso.com/img/qod/qod-inspire.jpg",
                "title": "Inspiring Quote of the day"
            }
        ]
    },
    "baseurl": "https://theysaidso.com",
    "copyright": {
        "year": 2022,
        "url": "https://theysaidso.com"
    }
}`;
        res.status(200).send(JSON.parse(data));
    });
}

module.exports = appRouter;
