console.log("Hi");

function handleLogin(e){
    e.preventDefault();
    var isValid = true;
    var emailValidation = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var passwordValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var minNumberofChars = 6;
    var userEmail = document.getElementById("u-email");
    // console.log(userEmail);
    var password = document.getElementById("psw");
    var loader = document.querySelector("#loader");
    function displayLoader() {
        loader.classList.add("display");
        setTimeout(() => {
            loader.classList.remove("display");
        }, 5000)
    }
    function hideLoader() {
        loader.classList.remove("display")
    }
    if ( !emailValidation.test(userEmail.value)) {
        alert("Please enter valid Email")
        isValid = false;       
    };
    if (!passwordValidation.test(password.value) || password < minNumberofChars) {
        alert("Your Password must contain atleast one special character, atleast one number and must be greater than or equal to 6 characters");
        isValid = false;
    }
    if (isValid) {
        alert("Form data is valid");
        displayLoader()

        fetch('https://api.publicapis.org/entries')
        .then((response) => response.json())
        .then((data) => {
            hideLoader();
            displayData(data)
        })
  

        let fetchedData;


        function displayData(data, total = 4) {
            fetchedData = data;
            console.log(fetchedData)
            let item = '';

        for (let i = 0; i < total; i++) {
            item += `<th>${data.entries[i].API}</th>`;
        }
        document.getElementById("item").innerHTML = item;
        }

        function showAll() {
            displayData(fetchedData, 200)
            console.log()
        }
    
    }else {
        alert("Form data is invalid");
    }
};

// function validateLogin () {
//     var userEmail = document.getElementById("u-email");
//     console.log(userEmail.value);
//     var password = document.getElementById("psw");
//     var minNumberofChars = 6;
//     console.log(password.value); 
//     var emailValidation = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//     var passwordValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

//     if ( !emailValidation.test(userEmail.value)) {
//         alert("Please enter valid Email")       
//     };
//     if (!passwordValidation.test(password.value) || password.value < minNumberofChars) {
//         alert("Your Password must contain atleast one special character, atleast one number and must be greater than or equal to 6 characters");
//     } else {

//     };


// };