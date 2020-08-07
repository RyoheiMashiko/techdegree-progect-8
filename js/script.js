employees=[];
const urlAPI =  `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalBack = document.querySelector(".modal-back");
const modalForth = document.querySelector(".modal-forth");
let indexNumber = "";

fetch(urlAPI) 
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err));

function displayEmployees(employeeData) {

   employees = employeeData; 
   let employeeHTML = "";

   employees.forEach((employee,index) => {
   let name = employee.name;
   let email = employee.email;
   let city = employee.location.city;
   let picture = employee.picture;
   
   employeeHTML += `
  <div class="card" data-index="${index}">
    <img class="img" src="${picture.large}">
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="adress">${city}</p>
    </div>
  </div>`
   });

   gridContainer.innerHTML = employeeHTML;
}

function displayModel(index) {
  let { name, dob, phone, email, location: { city, street, state, postcode
  }, picture } = employees[index];
  
  let date = new Date(dob.date);
  
  const modalHTML = `
    <img class="img-modal" src="${picture.large}" / >
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="adress">${city}</p>
      <hr>
      <p class="phone">${phone}</p>
      <p class="adress">${street.number} ${street.name}, ${state} ${postcode}</p>
      <p class="birthday">Birthday:${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  </div>`;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
  }

  gridContainer.addEventListener("click", e => {
    if( e.target !== gridContainer) { 

    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
    indexNumber = index;

    displayModel(index);
    }
  });

 modalClose.addEventListener("click", () => {
   overlay.classList.add("hidden");
 });

//  Search bar function
const input = document.getElementById("searchbar");
const card = document.getElementsByClassName("card");
// let inputValue = input.value.toUpperCase();

input.addEventListener("keyup", e => { 
  let inputValue =e.target.value.toUpperCase();
  let employeeName = document.getElementsByClassName("name");
  for (let i = 0; i < (employeeName.length-1); i ++ ) {
    let employeeNames = employeeName[i].innerHTML.toUpperCase();
    let check = employeeNames.indexOf(inputValue);
   
   if ( check > -1 ) {
     card[i].style.display="";
   }else {
     card[i].style.display="none";
  }
  }
});

modalForth.addEventListener("click", () =>{
  if(indexNumber <11 ) {
    indexNumber ++ ;
    displayModel(indexNumber);
  }else if(indexNumber = 11){
    indexNumber = 0;
    displayModel(indexNumber);
  }
});

modalBack.addEventListener("click", () =>{
  if(indexNumber > 0 ) {
    indexNumber -- ;
    displayModel(indexNumber);
  }else if(indexNumber = 1) {
    indexNumber = 11;
    displayModel(indexNumber);
   }
});


if(indexNumber = 0) {
  modalBack.classList.add("hidden");
};