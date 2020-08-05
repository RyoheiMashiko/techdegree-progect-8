employee=[];
const urlAPI = "https://randomuser.me/"
const gridContainer = document.querySelector(".grid-countainer");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

fetch(urlAPI) 
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err));

function displayEmployees(employeeData) {
   let employees = employeeData; 
   let employeeHTML = " ";
   employees.forEach((employee,index) => {
   let name = employee.name;
   let email = employee.email;
   let city = employee.city;
   let picture = employee.picture;
   
   employeeHTML += `
    <div class="card" data-index="${index}">
    <img class="img" src="${picture.large}" / >
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="adress">${adress}</p>
    </div>
  </div>`
   });

   gridContainer.innerHTML = employeeHTML;
}

function displayModel(index) {
  let {name, dob, phoe, email, location:{
      city, street, state, postcode}, picture }
      = employeesHTML[index];
  
  let date = new Date(dob.date);

  const modalHTML = `
  <div class="card" data-index="${index}">
    <img class="img" src="${picture.large}" / >
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="adress">${adress}</p>
    </div>
  </div>`;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
  }

  
  