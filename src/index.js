const express = require('express');
const mongoose = require("mongoose");
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const BotResponse = require('./models/botResponse');

const app = express();

// .env file
require("dotenv").config({ path: path.resolve(__dirname, '../config/.env') });

const port = process.env.PORT || 3000;

// connecting to mongoDB
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log("Connected to mongo server"))
    .catch((err) => console.error(err));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../public'));
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('chatbot');
});

app.post("/enterQueryResponse", (req, res) => {
    var q = new BotResponse;
    q.query = 'cab';
    q.response = 'Which city are you going to?';
    q.save()
        .then((item) => console.log(item, 'Save success'))
        .catch((err) => console.log(err));
});


const thanksMsg = (tag, curstate) => {
    if (tag == "cab" && curstate == 5 || tag != "cab" && curstate == 4)
        return "Thanks. Your " + tag + " details will be shared soon.";
    if (tag == "cab" && curstate > 4 || tag != "cab" && curstate > 3)
        return "Your booking is under process! Stay tuned.";
    return null;
}

function decodeTag(queryMsg) {
    const tags = [
        "flight",
        "hotel",
        "cab"
    ];
    for (var i = 0; i < 3; i++) {
        if (queryMsg.includes(tags[i]))
            return tags[i];
    }
    return null;
}

app.post("/getBotResponse", (req, res) => {
    const queryMsg = req.body.queryMsg.toLowerCase();
    var curstate = parseInt(req.body.curstate);
    var tag = (req.body.tag === "null") ? decodeTag(queryMsg) : req.body.tag;
    var botMsg = "I'm confused!"; //default bot message

    console.log('tag', tag);
    BotResponse.find({ tag: tag }, (err, body) => {
        if (err) return console.log(err);
        console.log(body);
        if (body != [])
            botMsg = body[0].response[curstate];
        else
            botMsg = 'Sorry! I cannot understand.'
        console.log('botmsg', botMsg);
        curstate += 1;
        if (thanksMsg(tag, curstate))
            botMsg = thanksMsg(tag, curstate);
        res.send({ botMsg, curstate, tag });
    });
});

app.listen(port, () => {
    console.log("Server is running on port " + port)
});