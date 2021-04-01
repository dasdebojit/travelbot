// BotResponse.remove({}, (err, body) => {
//     if (err) console.log(err);
//     else console.log('success');
// })

// const responses = [
//     ["Which city are you going to?",
//         "Which city are you leaving from?",
//         "What is the travel date?"
//     ],
//     [
//         "Which city are you going to?",
//         "What is the travel date?",
//         "What is the travel duration?"
//     ],
//     [
//         "Which city are you going to?",
//         "Which city are you leaving from?",
//         "What is the travel date?",
//         "What is the travel duration?"
//     ]
// ];

// const tags = [
//     "flight",
//     "hotel",
//     "cab"
// ];

// for (var i = 0; i < 3; i++) {
//     var q = new BotResponse;
//     q.tag = tags[i];
//     q.response = responses[i];
//     q.save()
//         .then((item) => console.log(item, 'Save success'))
//         .catch((err) => console.log(err));
// }