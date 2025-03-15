const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
    const itemNumber = movieLists[i].querySelectorAll("img").length;
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
        const ratio = Math.floor(window.innerWidth / 270);
        clickCounter++;
        if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
            movieLists[i].style.transform = `translateX(${movieLists[i].computedStyleMap().get("transform")[0].x.value - 300}px)`;
        } else {
            movieLists[i].style.transform = "translateX(0)";
            clickCounter = 0;
        }
    });

    console.log(Math.floor(window.innerWidth / 270));
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
    ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
    items.forEach((item) => {
        item.classList.toggle("active");
    });
    ball.classList.toggle("active");
});

// PROFILE PICTURE CHANGE

const profileImage = document.getElementById("profileImage");
const imageUpload = document.getElementById("imageUpload");

profileImage.addEventListener("click", () => {
    imageUpload.click();
});

imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// MOVIE WATCHING FUNCTIONALITY

const movieButtons = document.querySelectorAll(".featured-button, .movie-list-item-button");
const episodeSelection = document.getElementById("episode-selection");
const episodeButtonsContainer = document.getElementById("episode-buttons");
const closeEpisodeSelection = document.getElementById("close-episode-selection");

movieButtons.forEach(button => {
    button.addEventListener("click", () => {
        const movieUrl = button.getAttribute("data-movie-url");
        const showId = button.getAttribute("data-show-id");
        const type = button.getAttribute("data-type");

        if (type === "movies" && movieUrl) {
            window.open(movieUrl, "_blank");
        } else if (type === "shows" && showId) {
            episodeSelection.style.display = "block";
            episodeButtonsContainer.innerHTML = "";

            for (let i = 1; i <= 8; i++) {
                const episodeButton = document.createElement("button");
                episodeButton.textContent = `Episode ${i}`;
                episodeButton.addEventListener("click", () => {
                    const episodeUrl = `shows/${showId}_episode${i}.mp4`;
                    window.open(episodeUrl, "_blank");
                });
                episodeButtonsContainer.appendChild(episodeButton);
            }
        } else {
            alert("Movie/Show URL not available.");
        }
    });
});

// FILTERING FUNCTIONALITY

const menuItems = document.querySelectorAll(".menu-list-item");
const movieItems = document.querySelectorAll(".movie-list-item");

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach(m => m.classList.remove("active"));
        item.classList.add("active");

        const filter = item.getAttribute("data-filter");

        movieItems.forEach(movie => {
            const type = movie.getAttribute("data-type");
            if (filter === "all" || filter === type) {
                movie.style.display = "block";
            } else {
                movie.style.display = "none";
            }
        });
    });
});

// CLOSE EPISODE SELECTION

closeEpisodeSelection.addEventListener("click", () => {
    episodeSelection.style.display = "none";
});

// GO HOME FUNCTIONALITY

const homeLogo = document.getElementById("homeLogo");

homeLogo.addEventListener("click", () => {
    menuItems.forEach(m => m.classList.remove("active"));
    menuItems[0].classList.add("active");

    movieItems.forEach(movie => {
        movie.style.display = "block";
    });

    episodeSelection.style.display = "none";
});