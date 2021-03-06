export default{
    search: function(searchTerm, searchLimit, sortby){
        //console.log('search..'); just to make sure its getting called
       return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortby}&limit=${searchLimit}`)
        .then(res => res.json())
        .then(data => data.data.children.map(data => data.data))
        .catch(err => console.log(err));  
    }
};