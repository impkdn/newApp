console.log("Hi");

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
    var headerUserImage = document.querySelector(".header-image")
    headerUserImage.appendChild(userImage);
    var newArrayOfKey = Object.keys(userObject);
    var newArrayValue = Object.values(userObject);
    var userName = document.querySelector(".u-name");
    userName.innerHTML = userObject.name.title +" " + userObject.name.first +" " + userObject.name.last;
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
    


    // var username  = document.querySelector(".userinformation");
    // username.appendChild(userNameDiv)
    
   

}
  
getUsers();
