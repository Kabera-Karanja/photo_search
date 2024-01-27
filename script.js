const accessKey = "nC85RFa-gVzLRbeRwbNazVy-u2Gn70wGqejzxJoG8aw";

//get the elements from our page 

const formEl = document.querySelector ("form");
const inputEl = document.getElementById("input-text");
const searchResults = document.querySelector(".search_results");
const showMore = document.getElementById("show_more_button");


let inputData = "";
let page = 1;

async function searchImages(){
    //getting data from user to search
    inputData = inputEl.value;

    //dynamic url after search 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);

    //convert it into json
    const data = await response.json();

    const results = data.results;

    if (page == 1){
        searchResults.innerHTML ="";
    }

    results.map((result)=> {
        //same format as the html document
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search_result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.href;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        //now to render the image and the variables above
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });

    page++

    if (page>1){
        showMore.style.display ="block";
    }
}

//event listener for input
formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", ()=>{
    searchImages();
});
