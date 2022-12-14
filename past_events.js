let eventss;
let past;
fetch("https://mh-amazing.herokuapp.com/amazing")
  .then((data) => data.json())
  .then((data) => {
    currentDate = data.date;
    eventss = data.events;
    past = eventss.filter((event) => event.date < currentDate);
    printChecks(past, checkStorer);
    printCard(past, cardStorer);
    search.addEventListener("input", crossfilter);
    checkStorer.addEventListener("click", crossfilter);
  })
  .catch(console.log("The request cannot be displayed."));

let checkStorer = document.getElementById("check");
let cardStorer = document.getElementById("container");
let search = document.getElementById("searchInput");

//creo las cards dinamicas
function printCard(array) {
  let locationCards = " ";
  if (array.length !== 0) {
    array.forEach((data) => {
      locationCards += ` 
     <div class="cards">
          <img src="${data.image}" />
       <div class="upcard">  
          <h2>${data.name}</h2>
          <p>${data.description}</p>
       </div> 
       <div class="lowcard">
          <p class="price">Price: ${data.price}</p>
          <a href="details.html?id=${data.id}"><button>More details</button></a>
       </div>   
      </div>
      `;
      cardStorer.innerHTML = locationCards;
    });
  } else {
    cardStorer.innerHTML = `
  <div>
    <p class="card-text">No results found!</p>
  </div>
`;
  }
}

//checks dinamicos
function printChecks(events, storer) {
  let cs = (events) => events.category;
  let categories = new Set(events.filter(cs).map(cs));
  categories.forEach((category) => {
    storer.innerHTML += `
    <label><input type="checkbox" value="${category}">${category}</label>
    `;
  });
}

function crossfilter() {
  let checked = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((element) => element.value);
  let filterCategory = past.filter(
    (eventss) => checked.includes(eventss.category) || checked.length == 0
  );
  let filterSearch = filterCategory.filter((value) =>
    value.name.toLowerCase().includes(search.value.toLowerCase())
  );
  printCard(filterSearch, cardStorer);
}
