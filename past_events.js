let currentDate = data.currentDate;
let contenedor = document.getElementById("container");
let buscar = document.getElementById("searchInput");

const pastEvents = data.events.filter((event) => event.date < currentDate);

function añadirCard(array) {
  contenedor.innerHTML += `
       <div class="cards">
            <img src="${array.image}" />
            <h2>${array.name}</h2>
            <p>${array.description}</p>
            <p class="price">Price: ${array.price}</p>
            <a href="details.html?id=${array._id}"><button>More details</button></a>
        </div>
        `;
}
pastEvents.forEach(añadirCard);

//filtro el buscador
buscar.addEventListener("input", (event) => {
  contenedor.innerHTML = "";
  let filtro = pastEvents.filter((elemento) =>
    elemento.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
  filtro.forEach((elemento) => añadirCard(elemento));
});

//creo los checkbox dinamicos
function dinamicCheckbox() {
  let checkboxes = document.getElementById("check");
  let allEvents = data.events.map((eventos) => eventos.category);
  const dataArray = new Set(allEvents);
  let category = [...dataArray];
  let inputCheckbox = "";
  category.forEach((category) => {
    inputCheckbox += `<label><input type="checkbox" value="${category}">${category}</label>`;
  });
  checkboxes.innerHTML = inputCheckbox;
  let id = 1;
  data.events.map((eventos) => (eventos.id = id++));
}
dinamicCheckbox();

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
