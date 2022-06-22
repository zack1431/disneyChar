let div,all;
var disneyChars = [];
var copyDisneyChar = [];

//get all disney characters
async function getDisneyChar(){
    let response = await fetch('https://api.disneyapi.dev/characters', {
                  method: 'GET',
                  mode: 'cors',
                  headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json',
                  }})
    
      let allchars = await response.json();
      return allchars;
  }
  getDisneyChar().then(resp =>{
    
    disneyChars = resp.data
    copyDisneyChar = resp.data;
    
    displayPageNav(10)

    displayItems(1, perPage)
  })
  .catch(error =>{
    console.log('Oops,Something Went Wrong '+error)
  })

//search char by name
function searchEvent(){
    var text = document.getElementById('eventSearch');
    if(text.value != '' && text.value.trim()){
        //search this event
        disneyChars = this.copyDisneyChar.filter((item) => {
            return (item.name.toLowerCase().indexOf(text.value.toLowerCase()) > -1)
          })
          var temp = document.querySelector('.newcss');
          temp.innerHTML = ''; 
          displayChars();
    }
    else
    {
        var temp = document.querySelector('.newcss');
        temp.innerHTML = ''; 
        disneyChars = copyDisneyChar;
        displayPageNav(10);
        displayChars();
    }
}

//display character in dom
function displayChars(){
  html = disneyChars.map(item => 
    `<div class='card-content'><div class='info'><img src="${item.imageUrl}" width="100" height="100"/><h3>Character Name: ${item.name}</h3>
   </div></div>` )

  document.querySelector('.newcss').innerHTML = html.join('')
}

var index = 1,offSet;
var disneyChars;var html,pages;
const displayPageNav = perPage => {
  
  let pagination =``
  const totalItems = copyDisneyChar.length
  perPage = perPage ? perPage : 1
   pages = Math.ceil(totalItems/perPage);
  pagination += `<a href="#"  onClick="displayItems(1,10)">First</a>`
  if(index == 1){
    pagination += `<a href="#" disabled class='ci-disable' onClick="displayItems(${index},${perPage})">Prev</a>`
  }
  else
  {
    pagination += `<a href="#" onClick="showNextorPrev(${index},${perPage},'prev')">Prev</a>`
  }
  for(let i = 1; i <= pages; i++) {
    if(index == i){
      pagination += `<a href="#" class='active' onClick="displayItems(${i},${perPage})" >${i}</a>`
    }
    else
    {
      pagination += `<a href="#" onClick="displayItems(${i},${perPage})" >${i}</a>`
    }
  }
  if(index >=  copyDisneyChar.length/perPage){
    pagination += `<a href="#" disabled class='ci-disable' onClick="displayItems(${index},${perPage})">Next</a>`
  }
  else
  {
    pagination += `<a href="#" onClick="showNextorPrev(${index},${perPage},'next')">Next</a>`
  }
  pagination += `<a href="#"  onClick="displayItems(${pages},10)">Last</a>`
  document.getElementById('buttons').innerHTML = pagination
  
}

const showNextorPrev = (page,noofrows,opt) => {
  if(opt == 'prev'){
    index--;
    let pagedata = (page - 1 ) * noofrows - noofrows;
    let offnewset = pagedata + noofrows;
    disneyChars = copyDisneyChar.slice(pagedata, offnewset)
  }
  else
  {
    if(index < noofrows){}
    index++;
    let pagedata = (page + 1 ) * noofrows - noofrows;
    let newoffset = pagedata + noofrows;
    disneyChars = copyDisneyChar.slice(pagedata, newoffset)
  }
  displayPageNav(10);
  displayChars()
}

const displayItems = ( page = 1, perPage = 2 ) => {
  
  
  
  if(page == 1 || page <=0)  {
    index = page
    offSet = perPage
    disneyChars = copyDisneyChar.slice(0, offSet)
  } else if(page > copyDisneyChar.length) {
    index = page - 1
    offSet = copyDisneyChar.length
  } else {
    index = page;
    let strtindex = page * perPage - perPage
    offSet = strtindex + perPage
    disneyChars = copyDisneyChar.slice(strtindex, offSet)
  }
  
  
  displayChars()
  displayPageNav(10)
  
}

let perPage = 10
