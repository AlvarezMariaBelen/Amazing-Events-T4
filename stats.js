let firstTable = document.getElementById("firstTable");
let secondTable = document.getElementById("secondTable");
let thirdTable = document.getElementById("thirdTable");

let upcoming;
let past;
fetch("https://mh-amazing.herokuapp.com/amazing")
  .then((data) => data.json())
  .then((data) => {
    let eventss = data.events;
    let currentDate = data.date;
    upcoming = eventss.filter((object) => object.date > currentDate);
    past = eventss.filter((object) => object.date < currentDate);
    tableOne();
    stats(upcoming, "estimate", secondTable);
    stats(past, "assistance", thirdTable);
  })
  .catch((error) => console.log(error));

function tableOne() {
  past.map((object) => {
    object.attendancePercentage = 100 * (object.assistance / object.capacity);
  });
  let orderlyAssistance = [...past].sort(
    (e1, e2) => e1.attendancePercentage - e2.attendancePercentage
  );
  let orderlyCapacity = [...past].sort((e1, e2) => e1.capacity - e2.capacity);
  let lowerAssistance = orderlyAssistance[0];
  let highestAttendance = orderlyAssistance[orderlyAssistance.length - 1];
  let highestCapacity = orderlyCapacity[orderlyCapacity.length - 1];
  printFirstTable(
    firstTable,
    lowerAssistance,
    highestAttendance,
    highestCapacity
  );
}

function stats(dates, property, conteiner) {
  dates.map((event) => {
    event.gain = event[property] * event.price;
    event.percent = ((100 * event[property]) / event.capacity).toFixed(1);
  });
  let categories = Array.from(new Set(dates.map((event) => event.category)));
  let stats = categories.map((cat) => {
    let filter = dates.filter((event) => event.category === cat);
    return statsReduce(filter, property);
  });
  printSecondTable(stats, conteiner);
}

function statsReduce(array, prop) {
  let initialStat = {
    category: "",
    gain: 0,
    capacity: 0,
    [prop]: 0,
  };
  let stats = array.reduce((element1, element2) => {
    return {
      category: element2.category,
      gain: element1.gain + element2.gain,
      capacity: element1.capacity + element2.capacity,
      [prop]: element1[prop] + element2[prop],
    };
  }, initialStat);
  stats.prom = ((100 * stats[prop]) / stats.capacity).toFixed(1);
  return stats;
}

function printFirstTable(contenedor, o1, o2, o3) {
  contenedor.innerHTML += `
  <tr>
    <td>${o1.name}</td> 
    <td>${o2.name}</td>
    <td>${o3.name}</td>
  </tr>
`;
}

function printSecondTable(array, contenedor) {
  array.forEach((e) => {
    contenedor.innerHTML += `
      <tr >
          <td >${e.category}</td>
          <td >${e.gain}</td>
          <td >${e.prom}%</td>     
      </tr>
      `;
  });
}
