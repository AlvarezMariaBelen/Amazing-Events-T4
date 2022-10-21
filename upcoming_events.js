let currentDate = data.currentDate;
let contenedor = document.getElementById("container");
let buscar = document.getElementById("searchInput");

const upevents = data.events.filter((event) => event.date > currentDate);

function añadirCard(array) {
  contenedor.innerHTML += `
       <div class="cards">
            <img src="${array.image}"/>
            <h2>${array.name}</h2>
            <p>${array.description}</p>
            <p class="price">Price: ${array.price}</p>
            <a href="details.html?id=${array._id}"><button>More details</button></a>
        </div>
        `;
}
upevents.forEach(añadirCard);

//filtro el buscador
buscar.addEventListener("input", (event) => {
  contenedor.innerHTML = "";
  let filtro = upevents.filter((elemento) =>
    elemento.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
  filtro.forEach((elemento) => añadirCard(elemento));
});

//creo los checkbox dinamicos

let checkboxes = document.getElementById("check");
let categoria = new Set(data.events.map((element) => element.category));
categoria = [...categoria];
let inputCheckbox = "";
function dinamicCheckbox() {
  categoria.forEach((category) => {
    inputCheckbox += `<label><input type="checkbox" value="${category}">${category}</label>`;
  });
  checkboxes.innerHTML = inputCheckbox;
  let id = 1;
  data.events.map((eventos) => (eventos.id = id++));
}
dinamicCheckbox();

let arrayEventos = categoria.map((cadacate) => {
  let arrayFiltrado = data.events.filter(
    (cadaev) => cadaev.category === cadacate
  );
  return arrayFiltrado;
});

//filtro check
let checkb = [];
check.addEventListener("change", (event) => {
  contenedor.innerHTML = "";
  if (event.target.checked) {
    checkb = checkb.concat(
      data.events.filter((element) =>
        element.category
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );

    checkb.forEach((event) => añadirCard(event));
  }
});

/*let contenedor = document.querySelector("container");
let upcomingEvents = events;
let searchInput = document.getElementById("search_Input");
function carta() {
  let padre = document.querySelector("container");
  upcomingEvents.forEach((array) => {
    if (currentDate < array.date) {
      let div = document.createElement("div");
      div.innerHTML = `
       <div class="cards">
            <img src="${array.image}" />
            <h2>${array.name}</h2>
            <p>${array.description}</p>
            <p class="price">Price: ${array.price}</p>
            <a href="details.html"><button>More details</button></a>
        </div>
        `;
      container.appendChild(div);
    }
  });
}
carta();
*/