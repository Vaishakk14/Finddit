import reddit from './redditapi';
import redditapi from './redditapi';

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('Search-btn');
const searchInput = document.getElementById('search-input');
//form event listener
searchForm.addEventListener('submit', e => {
   
    //console.log(123); to check if event listener is working or not when search(submit) is clicked
   const searchTerm = searchInput.value;
   //console.log(searchTerm); To check if the search term is working or not
   
    //Get Sort
    const sortby = document.querySelector('input[name="sortby"]:checked').value; //select any input which has the name sortby and we want the one thats checked 
    //console.log(sortby); to check if sortby function is working or not

    //get Limit
    const searchLimit = document.getElementById('limit').value;
    //console.log(searchLimit);


    //Simple check Input valution so that we cannot submit an empty form
    if(searchTerm === ''){
        //show message when we submit an empty from
        showMessage('Please add a Search Term', 'alert-danger');
    }

    // When we enter the search term and search for i want to clear to clear the search term
    //clear input
    searchInput.value = '';

    //search Reddit
    reddit.search(searchTerm, searchLimit, sortby)
    .then(results => {
        let output = '<div class = "card-columns">';
        //loop through post
        console.log(results);
        results.forEach(post => {
            //check for image 
            let image = post.preview ? post.preview.images[0].source.url : 
            'https://www.logo.wine/a/logo/Reddit/Reddit-Vertical-Color-Logo.wine.svg';
            output += `
            <div class="card">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${truncatetext(post.selftext,100)}</p>
            <a href="${post.url}" target ="_blank" class="btn btn-primary">Read More</a>
            <hr>
            <span class ="badge badge-secondary">Subreddit: ${post.subreddit}</span><br>
            <span class ="badge Pikachbadge-dark">Score:${post.score}</span>
            </div>
            </div>

            `;            
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    } );



    e.preventDefault(); 
});

   
 function showMessage(message, className){
 //create div .. dom manipulation

 const div = document.createElement('div');
 //add classes to that div
 div.className = `alert ${className}`;
// // add text
 div.appendChild(document.createTextNode(message));
// //get parent container i.e <div id="search-container"
 const searchContainer = document.getElementById('search-container');
// //get Search <div id="search"
 const search = document.getElementById('search');

// //insert message take search container and insert message
 searchContainer.insertBefore(div,search);

// time out after 3 seconds
setTimeout(function() {
document.querySelector('.alert').remove();
}, 3000); // set timeout takes the second parameter 3000 milliseconds
}

//truncate text
function truncatetext(text,limit){
    const shortened = text.indexOf(' ', limit);
    if(shortened == -1) return text;
    return text.substring(0,shortened);

}