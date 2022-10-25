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
  .catch(console.log("The request cannot be displayed."));

function tableOne() {
  past.map((object) => {
    object.attendancePercentage = 100 * (object.assistance / object.capacity);
  });
  let orderlyAssistance = [...past].sort(
    (e1, e2) => e1.attendancePercentage - e2.attendancePercentage
  );
  console.log(orderlyAssistance);
  let orderlyCapacity = [...past].sort((e1, e2) => e1.capacity - e2.capacity);
  console.log(orderlyCapacity);
  let highestAttendance = orderlyAssistance[0];
  console.log(highestAttendance);
  let lowerAssistance = orderlyAssistance[orderlyAssistance.length - 1];
  let highestCapacity = orderlyCapacity[orderlyCapacity.length - 1];
  console.log(highestCapacity);
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
    event.percent = (100 * event[property]) / event.capacity;
  });
  let categories = Array.from(new Set(dates.map((event) => event.category)));
  let stats = categories.map((cat) => {
    let filter = dates.filter((event) => event.category === cat);
    return statsReduce(filter, property);
  });
  printSecondTable(stats, conteiner);
}

function statsReduce(array, property) {
  let initialStat = {
    category: "",
    gain: 0,
    capacity: 0,
    [property]: 0,
  };
  let stats = array.reduce((element1, element2) => {
    return {
      gain: element1.gain + element2.gain,
      category: element2.category,
      capacity: element1.capacity + element2.capacity,
      [property]: element1[property] + element2[property],
    };
  }, initialStat);
  stats.prom = (100 * stats[property]) / stats.capacity;
  return stats;
}

function printFirstTable(container, o1, o2, o3) {
  container.innerHTML += `
  <tr>
    <td>${o1.name}</td> 
    <td>${o2.name}</td>
    <td>${o3.name}</td>
  </tr>
`;
}

function printSecondTable(array, container) {
  array.forEach((e) => {
    container.innerHTML += `
      <tr >
          <td >${e.category}</td>
          <td >${e.gain}</td>
          <td >${e.prom}%</td>     
      </tr>
      `;
  });
}
