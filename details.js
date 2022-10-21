let contenedorDet = document.getElementById("detail");
let dataEvents = events;

const id = location.search;
const parametro = new URLSearchParams(id);
const numberId = parseInt(parametro.get("id"));

const evento = dataEvents.find((spot) => spot._id === numberId);

contenedorDet.innerHTML = `
  <div class="detailcard" id="detail">
  <img
     class="image_card"
     src="${evento.image}"
     alt="collectivities"/>
   <div class="description">
     <h3>${evento.name}</h3>
     <p>Date: ${evento.date}</p>
     <p>Descripton: ${evento.description}</p>
     <p>Category: ${evento.category}</p>
     <p>Place: ${evento.place}</p>
     <p>Capacity: ${evento.capacity}</p>
     <p>Assistance: ${evento.assistance}</p>
     <p>Price: ${evento.price}</p>
   </div>
 </div>
 `;
