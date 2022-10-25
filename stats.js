let tabless = document.getElementById("tablesStats");

fetch("https://mh-amazing.herokuapp.com/amazing")
  .then((data) => data.json())
  .then((data) => {
    currentDate = data.date;
    eventss = data.events;
    upcoming = eventss.filter((event) => event.date > currentDate);
    past = eventss.filter((event) => event.date < currentDate);
    firstTable(eventss);
    secondTable(upcoming);
    thirdTable(past);
  })
  .catch((error) => console.log(error));

function createTableEv(conteiner, o1, o2, o3) {
  conteiner.innerHTML += `

  <thead class="table">
  <tr>
    <th>Event statistics</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
      Events with the highest percentage of attendance
    </td>
    <td>
      Events with the lowest percentage of attendance
    </td>
    <td>Events with larger capacity</td>
  </tr>
  <tr>
    <td>${o1.name}</td> 
    <td>${o2.name}</td>
    <td>${o3.name}</td>
  </tr>
</tbody>
`;
}

function firstTable() {
  eventss.map((objeto) => {
    objeto.porcentajeAsistencia = 100 * (objeto.assistance / objeto.capacity);
  });

  let attendance = [...eventss].sort(
    (e1, e2) => e1.porcentajeAsistencia - e2.porcentajeAsistencia
  );
  let capacityy = [...eventss].sort((e1, e2) => e1.capacity - e2.capacity);
  let lowestAttendance = attendance[0];
  let highestAttendance = attendance[attendance.length - 1];
  let highestCapacity = attendance[capacityy.length - 1];
  createTableEv(tabless, lowestAttendance, highestAttendance, highestCapacity);
}

function createTableUp(container, cat) {
  container.innerHTML += `
   <thead>
          <tr>
            <th>Upcoming events statistics by category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Categories</td>
            <td>Revenues</td>
            <td>Percentage of attendance</td>
          </tr>
        <tr>
          <td>${cat[0]}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>${cat[1]}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>${cat[2]}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>${cat[3]}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>${cat[4]}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>${cat[5]}</td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      `;
}

function secondTable() {
  let st = (upcoming) => upcoming.category;
  let categories = Array.from(new Set(upcoming.map(st)));
  upcoming.map((object) => {
    object.estimatedProfit = object.price * object.estimate;
  });
  createTableUp(tabless, categories);
}

function createTablePa(container, cat) {
  container.innerHTML += `
<thead>
          <tr>
            <th>Past events by category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Categories</td>
            <td>Revenues</td>
            <td>Percentage of attendance</td>
          </tr>
          <tr>
            <td>${cat[0]}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>${cat[1]}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>${cat[2]}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>${cat[3]}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>${cat[4]}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>${cat[5]}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>${cat[6]}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>${cat[7]}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
  `;
}

function thirdTable() {
    let tt = (past) => past.category;
    let categories = Array.from(new Set(past.map(tt)));
    past.map((object) => {
      object.estimatedProfit = object.price * object.estimate;
    });
    createTableUp(tabless, categories);
  }