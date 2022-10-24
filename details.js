let conteinerDet = document.getElementById("detail");

function printDetails(e) {
  conteinerDet.innerHTML = `
  <div class="detailcard" id="detail">
  <img
     class="image_card"
     src="${e.image}"
     alt="${e.image}"/>
   <div class="description">
     <h3>${e.name}</h3>
     <p>Date: ${e.date}</p>
     <p>Descripton: ${e.description}</p>
     <p>Category: ${e.category}</p>
     <p>Place: ${e.place}</p>
     <p>Capacity: ${e.capacity}</p>
     <p>Assistance: ${e.assistance}</p>
     <p>Price: ${e.price}</p>
   </div>
 </div>
 `;
}

async function gettingTheId() {
  let id = location.search.slice(4); //id
  let response = await fetch(`https://mind-hub.up.railway.app/amazing/${id}`);
  let responseApi = await response.json(); //evento y los datos
  let event = responseApi.event; //id y los datos
  printDetails(event);
}
gettingTheId();
