var selected = "";

var answer_list = ["Hi", "Hello", "I'm busy", "LOL!"];

var open = 0;

var data = [];

function Initial_window() {
    var Words = document.getElementById("words");
    var Who = document.getElementById("who");
    var TalkWords = document.getElementById("textfield");
    var TalkSub = document.getElementById("Send");
    document.getElementById("chatting_space").style.display = "none";


    TalkSub.onclick = function () {

        var str = "";
        if (TalkWords.value == "") {

            alert("Cannot be empty");
            return;
        }
        var random_n = Math.floor(Math.random() * answer_list.length);
        str1 = '<div class="person_zone"><div class="btalk"><span>' + TalkWords.value + '</span></div></div>';
        str2 = '<div class="person_zone"><div class="atalk"><span>' + answer_list[random_n] + '</span></div></div>';
        Words.innerHTML = Words.innerHTML + str1;


        var n1 = check_friend_exist(selected);
        var n2 = check_friend_exist(selected);

        data[n1].me.push(TalkWords.value);
        data[n2].he.push("Hi");



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
    alert("Nmae: " + selected + "\n" + "id: " + data[check_friend_exist(selected)].id);
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
    document.getElementById("chatting_title").innerHTML = selected;
    document.getElementById("words").innerHTML = "";
    var i;
    var str1;
    var str2;
    var t = check_friend_exist(selected);

    for (i = 0; i < data[t].me.length; i++) {
        str1 = '<div class="person_zone"><div class="btalk"><span>' + data[t].me[i] + '</span></div></div>';
        str2 = '<div class="person_zone"><div class="atalk"><span>' + data[t].he[i] + '</span></div></div>';
        document.getElementById("words").innerHTML += str1;
        document.getElementById("words").innerHTML += str2;
    }

}
