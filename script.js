const accesskey = "vPkQzfOYPimu5mRMqk8t6jD_SpbqFz8qkVNQvnsLEqQ";
const searchresults = document.querySelector(".searchtotal");
const showmore = document.getElementById("showmorebtn");
const input = document.getElementById("searchinput");
const forme = document.querySelector("form");
let inputdata = "";
let page = 1;

async function searchingimg() {
    inputdata = input.value;
    const url = `https://api.unsplash.com/search/photos/?page=${page}&query=${inputdata}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        searchresults.innerHTML = " ";
    }

    results.forEach((result) => {
        const imgwrap = document.createElement("div");
        imgwrap.classList.add("searchresult");

        const image = document.createElement("img");
        image.classList.add("searchresult", "img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        imgwrap.appendChild(image);
        imgwrap.appendChild(imagelink);
        searchresults.appendChild(imgwrap);
    });

    page++;

    if (page > 1) {
        showmore.style.display = "block";
    }
}

forme.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchingimg();
});

showmore.addEventListener("click", () => {
    searchingimg();
});
