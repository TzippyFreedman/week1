
'use strict';
const locationsDataset=  getLocationsDataFromLocalStorage();
const countries=  getCountriesDataFromLocalStorage();
const culumnNames= getCulumnNamesDataFromLocalStorage();
window.addEventListener('load',loadHtmlPage);
 
function getLocationsDataFromLocalStorage()
{
  return  JSON.parse(localStorage.getItem('locationsDataset'));
}

function getCulumnNamesDataFromLocalStorage()
{
  return  JSON.parse(localStorage.getItem('culumnNames'));
}

function  getCountriesDataFromLocalStorage()
{
    return JSON.parse(localStorage.getItem('countries'));
}

function isNotNull(element) {
    return (element===null) ? false : true;
}

function visualizitionOfElement(element,status){
element.style.visibility = status;
}

function statusOfElement(element,status){
    element.disabled = status;
 }

function loadHtmlPage() {
    if (isNotNull(document.getElementById("sortTableByDate"))===true) {
        const SortBtn = document.getElementById("sortTableByDate");
        
        SortBtn.addEventListener("click", function (){
            if (isNotNull(document.getElementById("LocationsOfPatienceTable"))===true) ;
            sortTableByDate(document.getElementById("LocationsOfPatienceTable"));
        });
   visualizitionOfElement(SortBtn,"hidden");   
    }
    
    if (isNotNull(document.getElementById("citySearchSubmit"))===true) {
        btnSearchSubmit = document.getElementById("citySearchSubmit");
        btnSearchSubmit.addEventListener("click",function(){ 
            if (isNotNull(document.getElementById("myInput"))===true)
            showResultsFilterdByCity(document.getElementById("myInput").value);});
            statusOfElement(btnSearchSubmit,true);
    }

    if (isNotNull(document.getElementById("getAllLocations"))===true)
        document.getElementById("getAllLocations").addEventListener("click", function (){
            getAllLocationsOfPatience(locationsDataset);});
  
    if (isNotNull(document.getElementById("citySearchDiv"))===true) {
      visualizitionOfElement( document.getElementById("citySearchDiv"),"hidden"); 
      
    if (isNotNull(document.getElementById("myInput"))===true)
        autocomplete(document.getElementById("myInput"), countries);

}
}

function createTable(locationsDataset) {
    const tableOnPage = document.getElementById('LocationsOfPatienceTable');
    if (tableOnPage !== null) {
        tableOnPage.parentNode.removeChild(tableOnPage);
    }
    if (isNotNull(document.getElementById("sortTableByDate"))===true)
    visualizitionOfElement(document.getElementById("sortTableByDate"),"visible");  
  

    if (locationsDataset.length > 0) {
        const col = [];
        const numberOfProperties = Object.keys(locationsDataset[0].locationdetails).length;
        const b = document.getElementsByTagName("body")[0];
        const table = document.createElement("table");
        const tHead = document.createElement("thead");
        const hRow = document.createElement("tr");
        const tBody = document.createElement("tbody");
        table.style.textAlign = "center";
        table.setAttribute("id", "LocationsOfPatienceTable");
        table.style.width = '50%';
        table.setAttribute('border', '1');
        table.style.borderColor = "red";
        table.setAttribute('cellspacing', '0');
        table.setAttribute('cellpadding', '5');

        for (let i = 0; i < numberOfProperties; i++) {
            const th = document.createElement("th");
            th.innerHTML = culumnNames[i].charAt(0).toUpperCase() + culumnNames[i].slice(1);
            hRow.appendChild(th);
        }
        tHead.appendChild(hRow);
        table.appendChild(tHead);

        for (var i = 0; i < locationsDataset.length; i++) {
            const bRow = document.createElement("tr");
            const currentRowValues = Object.values(locationsDataset[i].locationdetails);
            for (const item of currentRowValues) {
                const td = document.createElement("td");
                td.style.width = "50px";
                td.innerHTML = item;
                bRow.appendChild(td);
            }

            tBody.appendChild(bRow);
        }
        table.appendChild(tBody);
        b.appendChild(table);
    }
  
    else {
        if (isNotNull(document.getElementById("sortTableByDate"))===true)
        statusOfElement( document.getElementById("sortTableByDate"),true);
         

        if (isNotNull(document.getElementById("citySearchDiv")))
        visualizitionOfElement(document.getElementById("citySearchDiv"),"hidden");
        alert("There where No Results For Your Search!");
    }
}

function getAllLocationsOfPatience(locationsDataset) {
    if(isNotNull(document.getElementById("myInput"))===null);
    document.getElementById("myInput").value="";
    
    if (isNotNull(document.getElementById("sortTableByDate"))===true)
    statusOfElement(document.getElementById("sortTableByDate"),false);
    if (isNotNull(document.getElementById("citySearchDiv"))===true)
    visualizitionOfElement(document.getElementById("citySearchDiv"),"visible");
    createTable(locationsDataset);
    
}

function sortTableByDate(currentTable) {
    if (locationsDataset.length > 1) {
        var  rows, switching, i, x, y, shouldSwitch;
        if (typeof currentTable === undefined) {
            return;
        }
        switching = true;
        while (switching) {
            switching = false;
            rows = currentTable.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                dateIndexInTable = culumnNames.indexOf('Start Date');
                x = rows[i].getElementsByTagName("td")[dateIndexInTable];
                y = rows[i + 1].getElementsByTagName("td")[dateIndexInTable];
                if (new Date(x.innerHTML).getTime() < new Date(y.innerHTML).getTime()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
}

function autocomplete(inp, arr) {
    let currentFocus;
    inp.addEventListener("input", function (e) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    if (isNotNull(this.getElementsByTagName("input")[0])===true)
                        inp.value = this.getElementsByTagName("input")[0].value;
                    if (isNotNull(document.getElementById("citySearchSubmit"))===true)
                    statusOfElement(document.getElementById("citySearchSubmit"),false);

                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
        inp.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) { 
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
  
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
  
    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
  
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        if (isNotNull(x)===true) {

            for (let i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

function showResultsFilterdByCity(city) {
    const citiesSortedByInput = [];
    
        for (let i = 0; i < locationsDataset.length; i++) {
            if (locationsDataset[i].locationdetails.city === city) {
                citiesSortedByInput.push(locationsDataset[i]);
            }
        }
    createTable(citiesSortedByInput);
    if (isNotNull(document.getElementById("getAllLocations"))===true)
    statusOfElement(document.getElementById("getAllLocations"),false);

}
