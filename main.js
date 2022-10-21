let contenedor = document.getElementById("container");
let buscar = document.getElementById("searchInput");

//creo las cards dinamicas
function añadirCard(array) {
  //innerHTML devuelve o establece la sintaxis HTML describiendo los descendientes del elemento
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
data.events.forEach((elemento) => añadirCard(elemento)); //foreach pasa por todos los elementos de un array

//filtro el buscador
buscar.addEventListener("input", (event) => {
  contenedor.innerHTML = "";
  let filtro = data.events.filter(
    //filter recorre un array mediante una funcion y retorna un array filtrado con los elementos que pasan por el condicional
    (elemento) =>
      elemento.name.toLowerCase().includes(event.target.value.toLowerCase()) //target devuelve el objeto al que se envía el evento
  );
  filtro.forEach((elemento) => añadirCard(elemento));
});

//creo los checkbox dinamicos
function dinamicCheckbox() {
  let checkboxes = document.getElementById("check");
  let allEvents = data.events.map((eventos) => eventos.category); //map transformación en los elementos del array para tener una nueva lista con la misma cantidad de elementos que la lista base
  const dataArray = new Set(allEvents); //nueva coleccion de valores
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
  //addEventListener es un escuchador que indica al navegador que este atento a la interaccion del usuario
  contenedor.innerHTML = "";
  if (event.target.checked) {
    checkb = checkb.concat(
      //concat concatena dos array sin modificar ninguno existente
      data.events.filter((element) =>
        element.category
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );

    checkb.forEach((event) => añadirCard(event));
  }
});
