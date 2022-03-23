const data = {
    imageProfile: document.querySelector(".user_image"),
    userName: document.getElementById("user_name"),
    followers: document.getElementById("user_followers"),
    following: document.getElementById("user_following"),
    repository: document.getElementById("user_repository"),
    company: document.getElementById("user_company"),
    location: document.getElementById("user_location"),
    card: document.querySelector(".card")
}

const client_id="a39ac2e62d8c467c967c";
const client_secret="2291a66acf058e00fdb5ec20696593baf8e734f2";
const api = `http://api.github.com/users`;
const searchUser = document.querySelector("input");
searchUser.addEventListener("keyup", (event) => {
    const user = event.target.value;
    getInfo(user)
});

const getInfo = async (myUser) => {
    const getUser = await fetch(`${api}/${myUser}?client_id=${client_id}&client_secret=${client_secret}`);
    const user = await getUser.json();
    getImage(user.avatar_url);
    getUserInfo(
        user.login, 
        user.followers, 
        user.following, 
        user.public_repos, 
        user.company, 
        user.location
    );
}
        
const getImage = (src) => {
    if(src){
        data.imageProfile.setAttribute('src', src)
    }
}

const getUserInfo = (
    userName, 
    followers, 
    following, 
    repository, 
    company, 
    location
) => {
    data.userName.innerHTML = userName;
    data.followers.innerHTML = followers;
    data.following.innerHTML = following;
    data.repository.innerHTML = repository;
    data.company.innerHTML = company;
    data.location.innerHTML = location;
}

const changeBg = () => {
    let r = parseInt(Math.random() * 255);
    let g = parseInt(Math.random() * 255);
    let b = parseInt(Math.random() * 255);
    const result = `rgb(${r}, ${g}, ${b})`
    data.card.setAttribute('style', `border-color: ${result};`);
}

getInfo();