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
    // console.log(userEmail);
    var password = document.getElementById("psw");
    var loader = document.querySelector("#loader");
    var dashboard = document.querySelector(".dashboard")
    var formWrapper = document.querySelector(".from-wrapper");
    function displayDashboard() {
        dashboard.classList.add("display-block");

        
    }
    
    function displayLoader() {
        loader.classList.add("display");
        setTimeout(() => {
            loader.classList.remove("display");
        }, 5000)
    }
    function hideLoader() {
        loader.classList.remove("display")
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
        
        displayLoader()

        fetch('https://api.publicapis.org/entries')
        .then((response) => response.json())
        .then((data) => {
            
            hideLoader();
            displayDashboard();
            displayData(data);
        })
  

        let fetchedData;


        function displayData(data) {
            fetchedData = data.entries;
            console.log(fetchedData)
            let item = '';
            let txt = "";
            var myTable = document.querySelector(".item-table");
            fetchedData.forEach( keys => {
                var tableRow = document.createElement('tr');
                
                
                console.log(keys);
                
                Object.values(keys).forEach(text => {
                    // let objectProperty =  Object.getOwnPropertyNames(keys);
                    // let linkProperty = objectProperty[5]
                    // console.log(text);
                    let cell = document.createElement('td');
                    let textNode = document.createTextNode(text);
                        // console.log(textNode);

                        cell.appendChild(textNode);
                        if (cell.innerText == "true") {
                            cell.style.backgroundColor = "rgb(6 147 6)";
                            cell.style.color = "#00070c"
                            let httpsStatus = cell.innerText;
                            cell.innerText = httpsStatus.toUpperCase();                  
                        };
                        if (cell.innerText == "false") {
                          cell.style.backgroundColor = "rgb(126 1 1)" ;
                          cell.style.color = "#00070c"
                          let httpsStatus = cell.innerText;
                          cell.innerText = httpsStatus.toUpperCase(); 
                        };
                        if (cell.innerText == "yes") {
                          cell.style.backgroundColor = "rgb(6 147 6)" ;
                          cell.style.color = "#00070c"
                          let httpsStatus = cell.innerText;
                          cell.innerText = httpsStatus.toUpperCase(); 
                        }
                        if (cell.innerText == "no") {
                          cell.style.backgroundColor = "rgb(126 1 1)" ;
                          cell.style.color = "#00070c"
                          let httpsStatus = cell.innerText;
                          cell.innerText = httpsStatus.toUpperCase(); 
                        }
                        if (cell.innerText == "unknown") {
                          cell.style.backgroundColor = "rgb(162 177 165)" ;
                          cell.style.color = "#00070c"
                          let httpsStatus = cell.innerText;
                          cell.innerText = httpsStatus.toUpperCase(); 
                        }
                    
                    cell.classList.add("cell-style")

                    tableRow.appendChild(cell);
                    
                });

                myTable.appendChild(tableRow);
            });
            
        
        }

        // function showAll() {
        //     displayData(fetchedData, 200)
        //     console.log()
        // }
    
    }else {
        alert("Form data is invalid");
    }
    
};
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

// function sortTable(n) {
//     let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
//     table = document.querySelector(".item-table");
//     switching = true;
//     console.log("hi sort");
//     //Set the sorting direction to ascending:
//     dir = "asc"; 
//     /*Make a loop that will continue until
//     no switching has been done:*/
//     while (switching) {
//       //start by saying: no switching is done:
//       switching = false;
//       rows = table.rows;
//     //   console.log(rows);
//       /*Loop through all table rows (except the
//       first, which contains table headers):*/
//       for (i = 1; i < (rows.length - 1); i++) {
//         //start by saying there should be no switching:
//         shouldSwitch = false;
//         /*Get the two elements you want to compare,
//         one from current row and one from the next:*/
//         x = rows[i].getElementsByTagName("TD")[n];
//         y = rows[i + 1].getElementsByTagName("TD")[n];
//         /*check if the two rows should switch place,
//         based on the direction, asc or desc:*/
//         if (dir == "asc") {
//           if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//             //if so, mark as a switch and break the loop:
//             shouldSwitch= true;
//             break;
//           }
//         } else if (dir == "desc") {
//           if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//             //if so, mark as a switch and break the loop:
//             shouldSwitch = true;
//             break;
//           }
//         }
//       }
//       if (shouldSwitch) {
//         /*If a switch has been marked, make the switch
//         and mark that a switch has been done:*/
//         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//         switching = true;
//         //Each time a switch is done, increase this count by 1:
//         switchcount ++;      
//       } else {
//         /*If no switching has been done AND the direction is "asc",
//         set the direction to "desc" and run the while loop again.*/
//         if (switchcount == 0 && dir == "asc") {
//           dir = "desc";
//           switching = true;
//         }
//       }
//     }
//   }

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