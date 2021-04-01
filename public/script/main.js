var recentMsg = "", //keeps track of the most recent input string from the user
    botName = 'Chatbot'; //name of the chatbot


function printMsg(className, message) {
    var cardBody = document.createElement('div');
    cardBody.classList.add("card-body", "msg_card_body");

    var justify = document.createElement('div');
    if (className === "chatlog")
        justify.classList.add('d-flex', 'justify-content-end', 'mb-2');
    else
        justify.classList.add('d-flex', 'justify-content-start', 'mb-2');

    var img_cont_msg = document.createElement('div');
    img_cont_msg.classList.add('img_cont_msg');

    var image = document.createElement('img');

    if (className === "chatlog")
        image.src = image.src = "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg";
    else
        image.src = "/img/chatbot.jpg";

    image.classList.add('rounded-circle', 'user_img_msg');

    var msg_container = document.createElement('div');
    if (className === "chatlog")
        msg_container.classList.add('msg_cotainer_send');
    else
        msg_container.classList.add('msg_cotainer');
    msg_container.innerText = message;

    img_cont_msg.appendChild(image);
    if (className === "chatlog") {
        justify.appendChild(msg_container);
        justify.appendChild(img_cont_msg);
    } else {
        justify.appendChild(img_cont_msg);
        justify.appendChild(msg_container);
    }

    cardBody.appendChild(justify);

    var content = document.getElementById('content');
    content.appendChild(cardBody);

    $("#content").scrollTop($("#content")[0].scrollHeight);
}


function chatbotResponse() {

    if (!window.localStorage.getItem('tag')) {
        window.localStorage.setItem('tag', "null");
    }
    if (!window.localStorage.getItem('curstate')) {
        window.localStorage.setItem('curstate', 0);
    }

    $.ajax({
        type: 'POST',
        url: '/getBotResponse',
        data: {
            queryMsg: recentMsg,
            curstate: window.localStorage.getItem('curstate'),
            tag: window.localStorage.getItem('tag')
        },
        success: function(res) {
            console.log('res: ', res);
            printMsg('botlog', res.botMsg);
            window.localStorage.setItem('curstate', res.curstate);
            window.localStorage.setItem('tag', res.tag);
        }
    });
}

function newEntry() {
    if (document.getElementById("chatbox").value != "") {
        recentMsg = document.getElementById("chatbox").value;
        document.getElementById("chatbox").value = "";

        printMsg('chatlog', recentMsg);

        chatbotResponse();
    }
}

document.onkeypress = keyPress;

function keyPress(e) {
    var x = e || window.event;
    var key = (x.keyCode || x.which);
    if (key == 13 || key == 3) {
        newEntry();
    }
}

window.onload = function() {
    localStorage.removeItem('curstate');
    localStorage.removeItem('tag');
    const msg = "Welcome Visitor! I am Travel-Bot. You can ask me about Flight, Cab or Hotel Bookings.";
    printMsg('botlog', msg);
}