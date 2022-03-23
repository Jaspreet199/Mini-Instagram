
let users = []


if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'))
    loadUsers();
}
else {
    fetch('https://comp2132.herokuapp.com/posts')
        .then(res => res.json())
        .then(res => storeUsers(res))
}

function storeUsers(data) {
    users = data
    localStorage.setItem('users', JSON.stringify(data));
    loadUsers();

}

// console.log(new Date());
//console.log(users.length);
function add(i) {
    const div1 = document.createElement("div")
    div1.className = "post";
    // console.log(div1.className);
    // console.log(div1);
    const postcontainer = document.getElementsByClassName("posts")[0];
    postcontainer.appendChild(div1);
    // console.log(postcontainer)
    const header = document.createElement("header");
    header.className = "post-header";
    div1.appendChild(header);
    const image = document.createElement("img");
    image.className = "user-icon";
    image.src = users[i].iconUrl;
    image.alt = " ";
    header.appendChild(image);
    const p1 = document.createElement("p");
    p1.className = "user-name";
    p1.innerHTML = users[i].username;
    header.appendChild(p1);
    const div2 = document.createElement("div");
    div2.className = "post-image";
    div1.appendChild(div2);
    const img2 = document.createElement("img");
    img2.src = users[i].imageUrl;
    div2.appendChild(img2);
    const postmetaDiv = document.createElement('div');
    postmetaDiv.className = "post-meta";
    div1.appendChild(postmetaDiv);
    const postmetaactions = document.createElement("div");
    postmetaactions.className = "post-meta-actions";
    postmetaDiv.appendChild(postmetaactions);
    const img3 = document.createElement("img");
    img3.src = "images/heart-regular.svg";
    img3.className = "icon icon-like";
    img3.id = `post-meta-like-${i}`;
    postmetaactions.appendChild(img3);
    const img4 = document.createElement("img");
    img4.src = "images/comment-regular.svg"
    img4.className = "icon icon-comment"
    img4.id = `post-meta-comment-${i}`;
    postmetaactions.appendChild(img4);
    const postmetaLikes = document.createElement("div");
    postmetaLikes.innerHTML = "Liked by";
    postmetaDiv.appendChild(postmetaLikes);
    postmetaLikes.className = "post-meta-likes";
    // console.log(postmetaLikes.className)
    const span1 = document.createElement("span");
    span1.className = "user-name";
    let total = 0;
    // console.log(users[i].likes.length);
    for (let k = 0; k < users[i].likes.length; k++) {
        total += 1;
    }
    span1.innerHTML = users[i].likes[0].username;
    const span2 = document.createElement("span");
    span2.className = "likes-count";
    span2.id = `post-meta-likes-${i}`;
    span2.innerHTML = " and " + total + " others";
    postmetaLikes.appendChild(span1)
    postmetaLikes.appendChild(span2)
    const postBody = document.createElement("div");
    postBody.className = "post-body";
    div1.appendChild(postBody);
    const postbodyUser = document.createElement("div");
    postbodyUser.className = "post-body-user";
    postBody.appendChild(postbodyUser);
    const p2 = document.createElement("p");
    postbodyUser.appendChild(p2);
    const span3 = document.createElement("span");
    span3.className = "user-name";
    span3.innerHTML = users[i].username;
    p2.appendChild(span3);
    const span4 = document.createElement("span");
    span4.className = "post-body-text";
    //console.log(users[i].body.text.length);
    if (users[i].body.text.length >= 70) {
        span4.innerHTML = users[i].body.excerpt + "<span class='more'>more</span>";
    }
    else {
        span4.innerHTML = users[i].body.text;
    }

    span4.id = `post-body-${i}`;
    p2.appendChild(span4);

    const postbodyHashtags = document.createElement("div");
    postbodyHashtags.className = "post-body-hashtags";
    for (let k = 0; k < users[i].body.hashtags.length; k++) {
        postbodyHashtags.innerHTML += `<span class='hashtag'>#${users[i].body.hashtags[k]}</span>`;
    }
    postBody.appendChild(postbodyHashtags);
    const postComment = document.createElement("div");
    postComment.className = "post-comments";
    postComment.id = `comments-${i}`;
    //console.log(users[i].comments.length);
    for (let k = 0; k < users[i].comments.length; k++) {

        postComment.innerHTML += `<p class="comment">
        <span class="user-name">${users[i].comments[k].username}</span>
        <span class="comment-text">${users[i].comments[k].commentText}</span>
        </p>`

    }


    div1.appendChild(postComment);
    const postDate = document.createElement("div");
    postDate.className = "post-date";
    let date = users[i].datePosted;
    let date2 = Date.parse(date);
    let date1 = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((date1 - date2) / oneDay))

    postDate.innerHTML = `${diffDays} days ago`;
    div1.appendChild(postDate);
    const postaddComment = document.createElement("div");
    div1.appendChild(postaddComment);
    const input1 = document.createElement("input");
    input1.type = "text";

    input1.placeholder = "Add a comment...";
    input1.className = "comment-value";
    input1.id = `add-comment-${i}`;
    postaddComment.appendChild(input1);
    const input2 = document.createElement("input")
    input2.type = "submit";
    input2.value = "Post";
    input2.className = "comment-submit";
    input2.data = `comments-${i}`;
    postaddComment.appendChild(input2);
    input2.setAttribute("data-target", `comments-${i}`)
}

function loadUsers() {
    for (let j = 0; j < users.length; j++) {
        add(j);
    }
}

let search = document.querySelector(".search");


search.addEventListener('keyup', function (e) {
    document.querySelector(".posts").innerHTML = "";
    document.querySelector(".current-hashtag").innerHTML = "";// this line makes no difference
    document.querySelector(".current-hashtag-count").innerHTML = "";// this line makes no difference.
    userNameFilter(search.value);
}
)

function userNameFilter(input) {
    for (let i = 0; i < users.length; i++) {

        if (users[i].username.includes(input)) {
            console.log("yes");
            add(i);
        }

    }
}
let totalPosts = 0;
function findhashtagPosts(input) {
    for (let i = 0; i < users.length; i++) {
        let stringOfArray = JSON.stringify(users[i].body.hashtags)
        //console.log(users[i].body.hashtags.includes("dogs"));
        //console.log(stringOfArray);
        if (stringOfArray.includes(input)) {
            console.log("check");
            add(i);
            totalPosts++;

        }
    }
}

document.addEventListener('click', function (event) {
    //console.log(event.target.getAttribute('data-target'))
    let targetElement = event.target.className;
    if (event.target.className.includes("hashtag")) {
        let tagName = event.target.innerHTML.slice(1);

        let firstcomma = tagName.substring(0, tagName.indexOf(","));
        document.querySelector(".posts").innerHTML = "";
        if (tagName.includes(",")) {
            findhashtagPosts(firstcomma);
        }
        else {
            findhashtagPosts(tagName);
        }

        document.querySelector('.current-hashtag').innerHTML = "#" + tagName + " <img src='images/times-circle-regular.svg' class='remove icon'>";
        if (totalPosts > 1) {
            document.querySelector(".current-hashtag-count").innerHTML = totalPosts + " posts";
        }
        else {
            document.querySelector(".current-hashtag-count").innerHTML = totalPosts + " post";
        }
    }

    if (event.target.classList.contains('remove')) {
        document.querySelector(".current-hashtag").innerHTML = "";
        document.querySelector(".current-hashtag-count").innerHTML = "";
        totalPosts = 0;
        document.querySelector(".posts").innerHTML = "";
        for (let i = 0; i < users.length; i++) {
            add(i);
        }
    }
    if (event.target.classList.contains("comment-submit")) {
        if (event.target.previousElementSibling != null) {
            let x = event.target.getAttribute('data-target');
            //console.log(x);
            const commentField = event.target.previousElementSibling;
            const value = commentField.value;
            if (!value) {
                return;
            }
            document.getElementById(x).innerHTML += `<p class="comment">
            <span class="user-name">you</span>
            <span class="comment-text">${value}</span>
            </p>`;
            commentField.value = "";
        }

    }
    if (event.target.classList.contains('more')) {
        //console.log(this.parentNode);
        //console.log(event.target.parentNode)
        let id = event.target.parentNode.id.slice(-1);
        event.target.parentNode.innerHTML = users[id].body.text;

    }
    if (event.target.classList.contains('icon-like')) {
        let id = event.target.id.slice(-1);
        //console.log(id);
        let string2 = `post-meta-likes-${id}`;
        //console.log(string2);
        let innerStuff = document.getElementById(string2).innerHTML;

        let str1 = innerStuff.replace(/[^\d.]/g, '');
        let noOfLikes = parseInt(str1, 10)

        //console.log(noOfLikes);
        document.getElementById(string2).innerHTML = `and ${noOfLikes + 1} others`;
    }
    if (event.target.classList.contains('icon-comment')) {

    }


})