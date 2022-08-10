const userNameInput = document.getElementById("userName");
const showDetailsButton = document.getElementById("showDetails");
const profileInfoDiv = document.getElementById("profileInfo");
const reposInfoDiv = document.getElementById('reposInfo');
showDetailsButton.addEventListener("click",showProfile);

function removeMain(){
    var element = document.getElementById("main")
    element.classList.remove("main");
    element.innerHTML='';
}


async function showReposInfo(userName){
    removeMain();
    const response = await fetch(`https://api.github.com/users/${userName}/repos`)
    const projects = await response.json();
            for(let i= 0; i< projects.length; i++){
                reposInfoDiv.innerHTML += `<div class="card-repo">
                                            <div class="card-body-repo">
                                                <div class="card-title-repo">${projects[i].name}</div>
                                                <div class="card-subHeading-repo">${projects[i].language}</div>
                                                <div class="card-text-repo">
                                                    <button>
                                                        <a href=${projects[i].html_url}>
                                                            Do Checkout Project
                                                        </a>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>`
            }
}
async function showProfile(){
    const userName = userNameInput.value;
    const response = await fetch(`https://api.github.com/users/${userName}`)
    const data = await response.json();
        profileInfoDiv.innerHTML = `<div class="card">
                                    <div class="card-img  card-item">
                                        <img src=${data.avatar_url} alt=${data.name}>
                                    </div>
                                    <div class="card-body">
                                        <div class="card-title card-item"><h1>${data.name}</h1></div>
                                        <div class="card-subHeading card-item"><h2>@ ${data.login}</h2></div>
                                        <div class="card-text card-item">
                                            <p class="profileTextItem">${data.bio}</p>
                                            <p class="profileTextItem">${data.location}</p>
                                            <p class="profileTextItem">${data.followers}  followers  ${data.following} following </p>
                                            <button class="profileTextItem">
                                                <a href=${data.html_url}>
                                                    Do Checkout Profile
                                                </a>
                                            </button>
                                        </div>
                                    </div>
                                </div>`
                                showReposInfo(userName);
        }