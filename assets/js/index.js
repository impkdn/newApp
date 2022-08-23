var openMenu = function () {
  document.getElementById("dropDown").classList.toggle("display-block");
  console.log("Hi");
};
function togglePassword(e) {
  const togglePassword = document.querySelector("#togglePassword");
  const password = document.querySelector("#psw");

  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
}
function handleLogin(e) {
  e.preventDefault();
  var isValid = true;
  var emailValidationRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var passwordValidationRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  var minNumberofChars = 6;
  var maxNumberofChars = 20;
  var userEmail = document.getElementById("u-email");
  var password = document.getElementById("psw");
  var dashboard = document.querySelector(".dashboard");
  var formWrapper = document.querySelector(".from-wrapper");
  function displayDashboard() {
    dashboard.classList.add("display-block");
  }

  if (!emailValidationRegex.test(userEmail.value)) {
    alert("Please enter valid Email");
    isValid = false;
  }
  if (
    !passwordValidationRegex.test(password.value) ||
    password < minNumberofChars ||
    password > maxNumberofChars
  ) {
    alert(
      "Your Password must contain atleast one special character, atleast one number and must be greater than or equal to 6 characters"
    );
    isValid = false;
  }
  if (isValid) {
    alert("Form data is valid");
    formWrapper.classList.add("display-none");

    window.location = "./dashboard.html";

    
  } else {
    alert("Form data is invalid");
  }
}
var loader = document.querySelector("#loader");
function displayLoader() {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}
function hideLoader() {
  loader.classList.remove("display");
}

function myFunction() {
  displayLoader();

  fetch("https://api.publicapis.org/entries")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      hideLoader();
      // displayDashboard();
      displayData(data);
    });

  let fetchedData;

  function displayData(data) {
    fetchedData = data.entries;
    var myTable = document.querySelector(".item-table");
    for (let i = 0; i < fetchedData.length; i++) {
      let objectApi = fetchedData[i];
      let newArrayValues = Object.values(objectApi);
      let newArrayKeys = Object.keys(objectApi);

      console.log(newArrayValues);
      console.log(newArrayKeys);
      var row = document.createElement("tr");

      for (let k = 0; k < newArrayKeys.length; k++) {
        var textNode = document.createTextNode(newArrayValues[k]);
        var aTag = document.createElement("a");
        var cell = document.createElement("td");
        if (newArrayKeys[k] == "Link") {
          aTag.appendChild(textNode);
          cell.appendChild(aTag);
          aTag.setAttribute("href", newArrayValues[k], "target");
          aTag.setAttribute("target", "blank");
        } else {
          cell.appendChild(textNode);
          console.log(cell.innerText);
        }

        if (cell.innerText == "true") {
          cell.classList.add("modified-cell-true");
        }
        if (cell.innerText == "false") {
          cell.classList.add("modified-cell-false");
        }
        if (cell.innerText == "yes") {
          cell.classList.add("modified-cell-true");
        }
        if (cell.innerText == "no") {
          cell.classList.add("modified-cell-false");
        }
        if (cell.innerText == "unknown") {
          cell.classList.add("modified-cell-unknown");
        }

        row.appendChild(cell);
      }
      myTable.appendChild(row);
    }
  }
}

function searchFromTable() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.querySelector(".item-table");
  tr = document.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

const getCellValue = (tr, idx) =>
  tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) =>
  ((v1, v2) =>
    v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)
      ? v1 - v2
      : v1.toString().localeCompare(v2))(
    getCellValue(asc ? a : b, idx),
    getCellValue(asc ? b : a, idx)
  );


document.querySelectorAll("th").forEach((th) =>
  th.addEventListener("click", () => {
    const table = th.closest("table");
    Array.from(table.querySelectorAll("tr:nth-child(n+2)"))
      .sort(
        comparer(
          Array.from(th.parentNode.children).indexOf(th),
          (this.asc = !this.asc)
        )
      )
      .forEach((tr) => table.appendChild(tr));
  })
);

var openMenu = function () {
    document.getElementById("dropDown").classList.toggle("display-block");
    console.log("Hi");
  }
  
  function getUsers() {
      fetch("https://randomuser.me/api/")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          var user = data.results[0]
          // console.log(user);
          showUsers(user)
          // Access your data here
        });
    }
  
  
  function showUsers(user) {
      // console.log(user);
      if (sessionStorage.getItem("userInfo" )) {
          var myNewArr;
          console.log(sessionStorage.getItem("userInfo" , JSON.stringify(user)));
          
             myNewArr = sessionStorage.getItem("userInfo");
             console.log(myNewArr);
             
      } else {
              sessionStorage.setItem("userInfo", JSON.stringify(user));
              console.log(window.sessionStorage.getItem("userInfo"), JSON.stringify(user));
          
              myNewArr = sessionStorage.getItem("userInfo");
      }
      console.log(myNewArr);
      var userObject = JSON.parse(myNewArr)
      console.log(userObject);
      var userImage = document.createElement("img");
      userImage.setAttribute("src", userObject.picture.thumbnail);
      var profileImage = document.querySelector(".user-image");
      profileImage.appendChild(userImage)
      var profileImage = document.querySelector(".profile-image");
      var profileAvatar = document.createElement("img");
      profileAvatar.setAttribute("src",userObject.picture.thumbnail);
      profileImage.appendChild(profileAvatar); 
      var userName = document.querySelector(".user-name");
      userName.innerHTML = userObject.name.title +" " + userObject.name.first +" " + userObject.name.last ;
      var headerUserImage = document.querySelector(".header-image")
      headerUserImage.appendChild(userImage);
      var newArrayOfKey = Object.keys(userObject);
      var newArrayValue = Object.values(userObject);
      var userName = document.querySelector(".u-name");
      userName.innerHTML = userObject.name.title +" " + userObject.name.first +" " + userObject.name.last ;
      var userGender = document.querySelector(".u-gender");
      userGender.innerHTML = userObject.gender;
      var userEmail = document.querySelector(".u-email");
      userEmail.innerHTML = userObject.email;
      var userPh = document.querySelector(".u-ph");
      userPh.innerHTML = userObject.phone;
      var userDob = document.querySelector(".u-dob");
      var uDob = new Date(userObject.dob.date);
      userDob.innerHTML = uDob.toDateString();
      var uAge = document.querySelector(".u-age");
      uAge.innerHTML = userObject.dob.age;
      var uCell = document.querySelector(".u-cell");
      uCell.innerHTML = userObject.cell;
      var uAddress = document.querySelector(".u-address");
      uAddress.innerHTML ="<span class = user-address>" + "City:-" + userObject.location.city + "<br/>" + "State:-" + userObject.location.state + "<br/>" + "Country:-" + userObject.location.country + "<br/>" + "Postcode:-" + userObject.location.postcode + "</span>";
      var login = document.querySelector(".u-login");
      login.innerHTML ="<span class = user-address>" + "Log In ID:-" + userObject.login.uuid + "<br/>" + "User Name:-" + userObject.login.username + "<br/>" + "Password:-" + userObject.login.password + "</span>";
      var registrationDate = new Date(userObject.registered.date)
      var registration = document.querySelector(".u-registration");
      registration.innerHTML ="<span class = user-address>" + "Registration Date:-" + registrationDate.toDateString() + "<br/>" + "Registration Age:-" + userObject.registered.age + "</span>";
  
      
      
  
  
      // var username  = document.querySelector(".userinformation");
      // username.appendChild(userNameDiv)
      
     
  
  }
  function removeStorage(e) {
    sessionStorage.clear();
  }