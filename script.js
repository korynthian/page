function updateTime() {
    let now = new Date();
    let hours = now.getHours();
    if (hours < 10) {hours = "0" + hours;}
    let minutes = now.getMinutes();
    if (minutes < 10) {minutes = "0" + minutes;}
    let seconds = now.getSeconds();
    if (seconds < 10) {seconds = "0" + seconds;}
    let date = now.getDate();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[now.getDay()];
    document.getElementById("time").textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById("date").textContent = `${day}, ${month} ${date}, ${year}`;
}

let loadMusic = function() {
    let link = document.getElementById("musicChoice").value;
    localStorage.setItem("musicLink", link);
    console.log("attempting to loadMusic");
    if (link.includes("spotify.com/")) {
        musicCode = link.split("/").pop()
        if (link.includes("album")) {
            musicCode = "album/" + musicCode;
        }
        else if (link.includes("track")) {
            musicCode = "track/" + musicCode;
        }
        else if (link.includes("playlist")) {
            musicCode = "playlist/" + musicCode;
        }
        else if (link.includes("artist")) {
            musicCode = "artist/" + musicCode;
        }
        else if (link.includes("show")) {
            musicCode = "show/" + musicCode;
        }
        else if (link.includes("episode")) {
            musicCode = "episode/" + musicCode;
        }
        else {
            console.error("Invalid link provided");
            document.getElementById("musicPlayerContainer").innerHTML = "<p>Invalid Spotify link provided.</p>";
            return;
        }
        document.getElementById("musicPlayerContainer").innerHTML =
        `<iframe id="musicPlayer" src="https://open.spotify.com/embed/${musicCode}?theme=0" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
    }
    else if (link.includes("music.apple.com/")) {
        musicCode = "https://embed.music.apple.com/" + link.split("music.apple.com/").pop().split("?").shift();
        document.getElementById("musicPlayerContainer").innerHTML =
        `<iframe id="musicPlayer" frameborder="0"allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0 sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src=${musicCode}></iframe>`;
    }
    else if (link.includes("youtube.com/")) {
        musicCode = link.split("v=").pop()
        document.getElementById("musicPlayerContainer").innerHTML =
        `<iframe id="musicPlayer" src="https://www.youtube.com/embed/${musicCode}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    }
    else if (link.includes("music.amazon.com/")) {
        if (link.includes("artists")) {
            musicCode = link.split("artists/").pop().split("/").shift();
        }
        else {
            musicCode = link.split("/").pop().split("?").shift();
        }
        document.getElementById("musicPlayerContainer").innerHTML =
        `<iframe id="musicPlayer" id='AmazonMusicEmbed${musicCode}' src='https://music.amazon.com/embed/${musicCode}' height='360px' frameBorder='0'></iframe>`;
    }
    else if (link.includes("iheart.com/")) {
        musicCode = link.split("https://www.iheart.com/artist/").pop().split("/").shift();
        document.getElementById("musicPlayerContainer").innerHTML =
        `<iframe id="musicPlayer" allow="autoplay" src="https://www.iheart.com/artist/${musicCode}?embed=true" frameborder="0"></iframe>`;
    }
    else if (link == "" || link == null) {
        document.getElementById("musicPlayerContainer").innerHTML =
        `<p></p>`;
    }
    else {
        document.getElementById("musicPlayerContainer").innerHTML =
        `${link}`;
    }
}

let collapseMusic = function() {
    if (document.getElementById("musicContainer").style.height != "0px") {
        document.getElementById("musicContainer").style.height = "0px";
        document.getElementById("musicChoice").style.visibility = "hidden";
        document.getElementById("loadMusic").style.visibility = "hidden";
        document.getElementById("collapseMusic").style.visibility = "hidden";
        document.getElementById("expandMusic").style.visibility = "visible";
        document.getElementById("topbarsettings").style.visibility = "hidden";
        document.getElementById("musicContainer").style.paddingBottom = "5%";
    }
    else {
        document.getElementById("musicContainer").style.height = "60%";
        document.getElementById("musicChoice").style.visibility = "visible";
        document.getElementById("loadMusic").style.visibility = "visible";
        document.getElementById("collapseMusic").style.visibility = "visible";
        document.getElementById("expandMusic").style.visibility = "hidden";
        document.getElementById("topbarsettings").style.visibility = "visible";
        document.getElementById("musicContainer").style.paddingBottom = "0.5%";
    }
}

let useBackgroundPhoto = function() {
    if (document.body.style.backgroundImage == "none" || document.body.style.backgroundImage == "") {
    document.body.style.backgroundImage = `url(https://picsum.photos/${window.innerWidth}/${window.innerHeight})`;
    localStorage.setItem("automaticBackgroundPhoto", true);}
    else {
    document.body.style.backgroundImage = "none";
    localStorage.setItem("automaticBackgroundPhoto", false);}
}


setInterval(updateTime, 700);

addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded");
    let link = localStorage.getItem("musicLink");
    document.getElementById("musicChoice").value = link;
    updateTime();
    loadMusic();
    if (localStorage.getItem("automaticBackgroundPhoto") === "true") {
        useBackgroundPhoto();
    }
});