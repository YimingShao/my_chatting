var selected = new Date();

var answer_list = ["Hi", "Hello", "I'm busy", "LOL!", "How are you!", "Sounds good", "Good!", "Cool", "I'm on campus", "Who are you", "Nice to meet you "];

var open = 0;

var data = [];

var info_close = 1;

var pre_time = "";

function Initial_window() {
    var Words = document.getElementById("words");
    var Who = document.getElementById("who");
    var TalkWords = document.getElementById("textfield");
    var TalkSub = document.getElementById("Send");
    document.getElementById("chatting_space").style.display = "none";
    document.getElementById('friends').style.display = "block";

    var input = document.getElementById("textfield");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("Send").click();
        }
    });

    TalkSub.onclick = function () {

        var str = "";
        if (TalkWords.value == "") {

            alert("Cannot be empty");
            return;
        }
        var random_n = Math.floor(Math.random() * answer_list.length);
        var rand_txt = answer_list[random_n];
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        var temp = "";

        str1 = '<div class="first_view"><span>' + TalkWords.value + '</span></div>';
        if (pre_time != dateTime) {
            temp = dateTime;
        }
        str2 = '<div class="time_slot">' + temp + '</div><div class="second_view"><span>' + answer_list[random_n] + '</span></div>';
        pre_time = dateTime;
        Words.innerHTML = Words.innerHTML + str1;


        var n1 = check_friend_exist(selected);
        var n2 = check_friend_exist(selected);

        data[n1].me.push(TalkWords.value);
        data[n2].time.push(temp);
        data[n2].he.push(rand_txt);



        Words.innerHTML = Words.innerHTML + str2;
        TalkWords.value = "";
        Words.scrollTop = Words.scrollHeight;

    }

}

function add_friend() {
    var inputvalue = document.getElementById("new_name").value;
    var inputid = document.getElementById("new_id").value;

    if (check_friend_exist(inputvalue) != -1) {
        alert("Friend " + inputvalue + " exists!");
        document.getElementById("new_name").value = "";
        document.getElementById("new_id").value = "";
    } else {
        var t = document.createTextNode(inputvalue);
        var x = document.createElement('LI');
        x.classList.add('friend');
        x.appendChild(t);
        x.onclick = function () {
            selecter(this);
        };

        document.getElementById('friend-list').appendChild(x);


        var dict = {};
        dict['name'] = inputvalue;
        dict['id'] = inputid;
        dict['he'] = [];
        dict['me'] = [];
        dict['time'] = [];


        data[data.length] = dict;
        div_hide();
        document.getElementById("new_name").value = "";
        document.getElementById("new_id").value = "";
    }
}

function delete_friend() {
    if (confirm("Are you sure you want to delete " + selected)) {
        var n = check_friend_exist(selected);
        var cc = document.getElementById("friend-list");
        data.splice(n, 1);
        cc.removeChild(cc.childNodes[n + 1]);
        document.getElementById("chatting_space").style.display = "none";
        open = 0;
    } else {
        document.getElementById("chatting_space").style.display = "none";
        open = 0;
    }

}

function info() {
    if (info_close == 1) {
        document.getElementById("friends").style.display = "none";
        document.getElementById("mini-window").style.display = "none";
        document.getElementById("info").style.display = "block";
        document.getElementById("info_name").innerHTML = "Name:" + "</br>" + selected;
        document.getElementById("info_id").innerHTML = "Id:" + "</br>" + data[check_friend_exist(selected)].id;
        info_close = 0;
    } else {
        close_info();
    }

}

function close_info() {
    document.getElementById("friends").style.display = "block";
    document.getElementById("mini-window").style.display = "none";
    document.getElementById("info").style.display = "none";
    info_close = 1;
}

function check_friend_exist(t) {
    var i;
    for (i = 0; i < data.length; i++) {
        if (data[i].name == t) {
            return i;
        }
    }
    return -1;
}
//Function To Display Popup
function div_show() {
    document.getElementById('mini-window').style.display = "block";
    document.getElementById('friends').style.display = "none";
}

//Function to Hide Popup
function div_hide() {
    document.getElementById('friends').style.display = "block";
    document.getElementById('mini-window').style.display = "none";
}

function selecter(obj) {
    if (open == 0) {
        document.getElementById("chatting_space").style.display = "block";
        open = 1;
    }

    selected = obj.innerHTML;
    if (selected.length > 11) {
        document.getElementById("chatting_title").innerHTML = selected.substring(0, 11) + "...";
    } else {
        document.getElementById("chatting_title").innerHTML = selected;
    }

    document.getElementById("words").innerHTML = "";
    var i;
    var str1;
    var str2;
    var t = check_friend_exist(selected);

    for (i = 0; i < data[t].me.length; i++) {
        str1 = '<div class="first_view"><span>' + data[t].me[i] + '</span></div>';
        str2 = '<div class="time_slot">' + data[t].time[i] + '</div><div class="second_view"><span>' + data[t].he[i] + '</span></div>';
        document.getElementById("words").innerHTML += str1;
        document.getElementById("words").innerHTML += str2;
    }

}
