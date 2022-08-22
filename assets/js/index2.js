console.log("Hi");
var openMenu = function () {
    document.getElementById("dropDown").classList.toggle("display-block");
    console.log("Hi");
}

function handleLogin(e){
    e.preventDefault();
    var isValid = true;
    var emailValidationRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var passwordValidationRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var minNumberofChars = 6;
    var userEmail = document.getElementById("u-email");
    var password = document.getElementById("psw");
    var dashboard = document.querySelector(".dashboard")
    var formWrapper = document.querySelector(".from-wrapper");
    function displayDashboard() {
        dashboard.classList.add("display-block");
    }
    
    
    if ( !emailValidationRegex.test(userEmail.value)) {
        alert("Please enter valid Email")
        isValid = false;       
    };
    if (!passwordValidationRegex.test(password.value) || password < minNumberofChars) {
        alert("Your Password must contain atleast one special character, atleast one number and must be greater than or equal to 6 characters");
        isValid = false;
    }
    if (isValid) {
        alert("Form data is valid");
        formWrapper.classList.add("display-none");
        
        window.location = "./dashboard.html";
        
       

        // function showAll() {
        //     displayData(fetchedData, 200)
        //     console.log()
        // }
    
    }else {
        alert("Form data is invalid");
    }
    
};
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

function myFunction() {
    displayLoader()
        
    fetch('https://api.publicapis.org/entries')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        hideLoader();
        // displayDashboard();
        displayData(data);
    })


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
             var aTag = document.createElement("a")
             var cell = document.createElement("td");
             if (newArrayKeys[k] == "Link") {
                aTag.appendChild(textNode);
                cell.appendChild(aTag);
                aTag.setAttribute("href",newArrayValues[k], "target",)
                aTag.setAttribute("target","blank")

             } else {
                 
                cell.appendChild(textNode);
                console.log(cell.innerText)
            }
                
            if (cell.innerText == "true") {
                cell.classList.add("modified-cell-true")
            }
            if (cell.innerText == "false") {
                cell.classList.add("modified-cell-false")
            }
            if (cell.innerText == "yes") {
                cell.classList.add("modified-cell-true")
            }
            if (cell.innerText == "no") {
                cell.classList.add("modified-cell-false")
            }
            if (cell.innerText == "unknown") {
                cell.classList.add("modified-cell-unknown")
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



  const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

  const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
      v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
      )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
  
  // do the work...
  document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
      const table = th.closest('table');
      Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
          .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
          .forEach(tr => table.appendChild(tr) );
  })));