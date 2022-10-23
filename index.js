let arrayFromAPI;
let arrayEvents = [];
async function getDataFromApi() {
  await fetch("https://mind-hub.up.railway.app/amazing")
    .then((resp) => resp.json())
    .then((json) => (arrayFromAPI = json));
  arrayEvents = arrayFromAPI.events;

  let cardStorer = document.getElementById("container");
  let checkStorer = document.getElementById("check");
  let checks = arrayEvents.map((event) => event.category);
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
  printCard(arrayEvents);

  //checks dinamicos
  function printChecks() {
    let cheksLocation = "";
    categorysCheck.forEach((category) => {
      cheksLocation += `<label><input type="checkbox" value="${category}">${category}</label>`;
    });
    checkStorer.innerHTML = cheksLocation;
  }
  printChecks();

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
  checkb();

  //defino la barra de busqueda
  let search = document.getElementById("searchInput");
  function searchbar() {
    search.addEventListener("input", (events) => {
      textSearch = events.target.value;
      crossfilter();
    });
  }
  searchbar();

  //filtro cruzado
  function crossfilter() {
    let info = [];
    if (checkboxBranded.length > 0 && textSearch !== "") {
      checkboxBranded.map((selected) => {
        info.push(
          ...arrayEvents.filter(
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
          ...arrayEvents.filter((events) => events.category.includes(selected))
        );
      });
    } else if (checkboxBranded.length == 0 && textSearch !== "") {
      info.push(
        ...arrayEvents.filter((events) =>
          events.name
            .toLocaleLowerCase()
            .includes(textSearch.trim().toLocaleLowerCase())
        )
      );
    } else {
      info.push(...arrayEvents);
    }
    printCard(info);
  }
  crossfilter();
}
getDataFromApi();
