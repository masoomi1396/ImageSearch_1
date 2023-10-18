const form = document.querySelector("form");
const searchInput = document.querySelector("form>input");
const result = document.getElementById('Result');
let allPages = 1;
let currentPage = 1;
const showBtn = document.querySelector(".showMore");

async function randomImage(query,page)
{
    const apiKey = 'P1FX-qTgpwwI1RGVZu7-f1YYPj0GIZWZwXyRaPJv1eY';
    const response = await fetch(`https://api.unsplash.com/search/photos?per_page=9&page=${page}&query=${query}&client_id=${apiKey}`);
    const images = await response.json();
    console.log(images);
    return await images;
}
function showImage(images)
{
    images.map(image => {
        const src = image.urls.small;
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        figure.classList.add("figureResult");
        img.classList.add("imgResult");
        figcaption.classList.add("figureTextResult");
        img.src = src;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        result.appendChild(figure);
    })
}
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    result.innerHTML = "";
    const query = searchInput.value;
    const page = randomImage(query,1);
    page.then(page => {showImage(page.results);allPages = page.total_pages});
    
})
window.addEventListener('scroll',()=>{
    if(allPages - currentPage > 0)
    {
        showBtn.classList.add('animation');
    }
    else{
        showBtn.classList.remove('animation');
    }
})
showBtn.addEventListener('click',()=>{
    currentPage++;
    const query = searchInput.value;
    const page = randomImage(query,currentPage);
    page.then(page => showImage(page.results));
})