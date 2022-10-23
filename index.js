fetch("https://mind-hub.up.railway.app/amazing");

async function fetchApi() {
  //funcion asincrona
  try {
    //try hace la petición
    let response = await fetch("https://mind-hub.up.railway.app/amazing"); //fetch sirve para consultar los datos desde Api y await espera la respuesta de la promesa
    //response es la respuesta de la peticion fetch
    let data = await response.json();
    //data es la transformacion de la peticion
    let events = data.events;
    printCard(events);
    printChecks();
    searchbar();
    checkb();
  } catch (error) {
    //catch cachea el error si lo hay
    console.log("No se puede mostrar lo solicitado");
  }
}
fetchApi();

let dataEvents = data.events;
let cardStorer = document.getElementById("container");
let checkStorer = document.getElementById("check");
let checks = dataEvents.map((event) => event.category);
let filterrepeat = new Set(checks);
let categorysCheck = [...filterrepeat];

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
            <a href="details.html?id=${data._id}"><button>More details</button></a>
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
//printCard(dataEvents);

//checks dinamicos
function printChecks() {
  let cheksLocation = "";
  categorysCheck.forEach((category) => {
    cheksLocation += `<label><input type="checkbox" value="${category}">${category}</label>`;
  });
  checkStorer.innerHTML = cheksLocation;
}
//printChecks();

let checkboxBranded = [];
let textSearch = "";
let checkbox = document.querySelectorAll("input[type=checkbox]");
function checkb() {
  checkbox.forEach((check) =>
    check.addEventListener("click", (event) => {
      let checked = event.target.checked;
      if (checked) {
        checkboxBranded.push(event.target.value);
        crossfilter();
      } else {
        checkboxBranded = checkboxBranded.filter(
          (uncheck) => uncheck !== event.target.value
        );
        crossfilter();
      }
    })
  );
}

//defino la barra de busqueda
let search = document.getElementById("searchInput");
function searchbar() {
  search.addEventListener("input", (events) => {
    textSearch = events.target.value;
    crossfilter();
  });
}

//filtro cruzado
function crossfilter() {
  let info = [];
  if (checkboxBranded.length > 0 && textSearch !== "") {
    checkboxBranded.map((selected) => {
      info.push(
        ...dataEvents.filter(
          (events) =>
            events.name
              .toLocaleLowerCase()
              .includes(textSearch.trim().toLocaleLowerCase()) &&
            events.category.includes(selected)
        )
      );
    });
  } else if (checkboxBranded.length > 0 && textSearch === "") {
    checkboxBranded.map((selected) => {
      info.push(
        ...dataEvents.filter((events) => events.category.includes(selected))
      );
    });
  } else if (checkboxBranded.length == 0 && textSearch !== "") {
    info.push(
      ...dataEvents.filter((events) =>
        events.name
          .toLocaleLowerCase()
          .includes(textSearch.trim().toLocaleLowerCase())
      )
    );
  } else {
    info.push(...dataEvents);
  }
  printCard(info);
}
//crossfilter();
