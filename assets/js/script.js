/* Toggling for when dropbox is clicked */
function myFunction() {
    document.getElementById("changeUser").classList.toggle("changeUser");
  }

//   Redirect to Registration Page
function redirct () {
    location.href = "user.html"
}

  /* Closing the dropdown menu if the user clicks outside of it */
  window.onclick = function(event) {
    if (!event.target.matches('.user')) {
      var dropdowns = document.getElementsByClassName("User");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('changeUser')) {
          openDropdown.classList.remove('changeUser');
        }
      }
    }
  }

/* User interface */
// Select and load user profile
selectElement('user-content','user1')

function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

selectElement('user-content','user2')

function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

selectElement('user-content','user3')

function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

//Retrieve data from local storage 
var RetriveUserData = function() {
localStorage.setItem('userData', JSON.stringify(userDatabase));
  }

var resultSection = document.querySelector("#result-display");
var userDatabase = [];

//var userDatabase = JSON.parse(localStorage.getItem('userData')) || [];

dateToday = moment().format("YYYY-MM-DD");
console.log(dateToday);

if (localStorage.getItem('userData')) {
    userDatabase = JSON.parse(localStorage.getItem('userData'));
}
else {
    var thisUser = {
        name: "Random User",
        initial: "RU",
        gender: "Male",
        weight: "78",
        height: "180",
        api: ["clientId","clientSecret","refresherToken","authCode","accessToken"],
        calConsumed:[],
        steps: [],
        calBurned: []
    }
    userDatabase.push(thisUser);
    localStorage.setItem('userData', JSON.stringify(userDatabase));
}


console.log(userDatabase);
var editDelete = `
<div class="dropdown is-right editDelete">
<div class="dropdown-trigger">
  <span aria-haspopup="true" aria-controls="dropdown-menu3">
    <span class="oi oi-caret-bottom">
    </span>
  </span>
</div>
<div class="dropdown-menu menuOveride" id="dropdown-menu3" role="menu">
  <div class="dropdown-content">
    <a class="dropdown-item editBtn">
      Edit
    </a>
    <a class="dropdown-item deleteBtn">
      Delete
    </a>
  </div>
</div>
</div>    
`
;

//-----FIXED TEST VARIABLE FROM SAMPLE DATA EXTRACTED-----//
var calorieDetails = {
    imgLink: ["https://spoonacular.com/recipeImages/655726-312x231.jpg", "https://spoonacular.com/recipeImages/638746-312x231.jpg"],
    calorie: [429.85, 356.99],
    weightPerServing: [316, 666],
    uomPerServing: ["g", "g"],
    FoodName: ["Perfect Chicken Soup", "Chipotle Chicken Soup"]
}

//-----EXTRACT DATA FROM FOOD API-----//
/*var foodSearchResults = function(data) {
    var calorieDetails = {
        imgLink: [],
        calorie: [],
        weightPerServing: [],
        uomPerServing: [],
        FoodName: []
    }
    //var imgLink = [];
    //var calorie = [];
    //var weightPerServing = [];
    //var uomPerServing = [];
    //var FoodName = [];

    for (var i=0; i<data.results.length; i++) {
        calorieDetails.imgLink[i] = data.results[i].image;
        calorieDetails.calorie[i] = data.results[i].nutrition.nutrients[0].amount;
        calorieDetails.weightPerServing[i] = data.results[i].nutrition.weightPerServing.amount;
        calorieDetails.uomPerServing[i] = data.results[i].nutrition.weightPerServing.unit;
        calorieDetails.FoodName[i] = data.results[i].title;
    }
     
    console.log(calorieDetails);
}*/

//-----FETCH API FOR FOOD ITEM - SPOONACULAR-----//
var fetchFood = function(searchText) {
    
    //-----WORKING FETCH CODE - USING FIXED VARIABLE FOR TESTING-----//
    /*fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=528245fe05d64c8ea869f7952527c40a&query="+searchText+"&addRecipeNutrition=true&number=2"
    ).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data)
                foodSearchResults(data);
            })
        }
        else {
            console.log("Result not found.")
        }
    })*/
    //-----FOR TESTING ONLY - THIS FUNCTION SHOULD BE IN foodSearchResults-----//
    displaySearchResults(calorieDetails);
}
//-----SAVE USERDATA IN LOCALSTORAGE-----//
var saveUserData = function() {
    localStorage.setItem('userData', JSON.stringify(userDatabase));
}

//-----DISPLAY API RESULTS-----//
var displaySearchResults = function(result) {
    
    if (result.FoodName.length) {
        for (var i=0; i<result.FoodName.length; i++) {
            console.log(result.FoodName[i]);

            var displayBox = document.createElement("article");
            displayBox.className = "column boxBorder searchResult";
            displayBox.setAttribute("data-result-id", i);
            var imgBox = document.createElement("img");

            imgBox.src=result.imgLink[i];
            imgBox.alt='food image';

            var textBox = document.createElement("div");

            textBox.innerHTML = "<p>"+result.FoodName[i]+"</p><p>Calories: "
                +result.calorie[i]+" kcal</p><p>Serving: "+
                result.weightPerServing[i]+" "+result.uomPerServing[i]+"</p>"
            
            var buttonDiv = document.createElement("div");
            buttonDiv.className = "buttonContainer";
            var selectOneButton = document.createElement("button");
            selectOneButton.className = "button is-info selectOneButton";
            selectOneButton.textContent = "Select";
            var showRecipe = document.createElement("button");
            showRecipe.className = "button is-info showRecipe";
            showRecipe.textContent = "Recipe";
            buttonDiv.appendChild(selectOneButton);
            buttonDiv.appendChild(showRecipe);

            displayBox.appendChild(imgBox);
            displayBox.appendChild(textBox);
            displayBox.appendChild(buttonDiv);

            resultSection.appendChild(displayBox);
        }
    }
    else {
        var displayBox = document.createElement("article");
        displayBox.className = "column boxBorder searchResult";
        displayBox.textContent = "No results found, please try again!!"
    }    
}

//-----EVENT HANDLER FOR SEARCH SUBMIT-----//
$("#searchForm").on("submit", function(event) {
    event.preventDefault();
    //console.log($(this));
    var searchText = $("#foodSearch").val().trim();
    resultSection.textContent = "";
    fetchFood(searchText);
    $("#foodSearch").val("");
})

//-----EVENT HANDLER FOR ADD RESULT CLICK-----//
//When the select on the search result is clicked
$("#result-display").on("click", ".selectOneButton", function(event) {
    console.log($(this).closest(".searchResult").attr("data-result-id"));
    var index = $(this).closest(".searchResult").attr("data-result-id");
    var sno = $("#calorieConsumed tr").length -1;
    //creates a table and inserts the data to the display table
    console.log(length);
    $("tbody").append("<tr><th class='sno'>"+sno+"</th><th>"+calorieDetails.FoodName[index]+
        "</th><td><span class='cal'>"+calorieDetails.calorie[index]+"</span></td><td><span class='serv'>"+calorieDetails.weightPerServing[index]+
        "</span></td><td>"+editDelete+"</td></tr>");

    resultSection.textContent = "";
    //-----ADD LOCAL STORAGE - FOR NOW DEFAULTED TO ARRAY 0-----//
    if (userDatabase[0].calConsumed.length === 0) {
        userDatabase[0].calConsumed.push({
            date: dateToday,
            food: [calorieDetails.FoodName[index]],
            cal: [calorieDetails.calorie[index]],
            serv: [calorieDetails.weightPerServing[index]]    
        })
        console.log(userDatabase)
    } else {
        console.log(userDatabase[0].calConsumed.length-1);
        if (userDatabase[0].calConsumed[userDatabase[0].calConsumed.length-1].date === dateToday) {
            userDatabase[0].calConsumed[userDatabase[0].calConsumed.length-1].food.push(calorieDetails.FoodName[index]);
            userDatabase[0].calConsumed[userDatabase[0].calConsumed.length-1].cal.push(calorieDetails.calorie[index]);
            userDatabase[0].calConsumed[userDatabase[0].calConsumed.length-1].serv.push(calorieDetails.weightPerServing[index]);
        }
        console.log(userDatabase)
    }

    saveUserData();
})

//-----TOGGLE ON THE DROPDOWN WHEN CLICKED-----//
$("body").on("click", ".dropdown", function() {
    $(this).toggleClass("is-active");
})

//-----TOGGLE OFF THE DROPDOWN WHEN CLICKED OUTSIDE-----//
$(document).on("click", function(event) {
    if ($(".dropdown").hasClass("is-active") && $(".dropdown").has(event.target).length === 0) {
        $(".dropdown").removeClass("is-active");
    }
})

//-----TABLE EDIT BUTTON LOGIC-----//
$(".calorieSection").on("click", ".editBtn", function() {

    var serving = $(this).closest("tr").find(".serv")
        .text()
        .trim();
    var cal = $(this).closest("tr").find(".cal")
        .text()
        .trim();
    var servInput = $("<input>").addClass("form-control").val(serving);

    $(this).closest("tr").find(".serv").replaceWith(servInput);
    servInput.trigger("focus");
    //-----AUTOMATIC CALORIE CHANGE LOGIC FOR CHANGE IN SERVING-----//
    $(".calorieSection").on("change keyup paste click", ".form-control", function() {

        var newVal = ((cal/serving)*$(".form-control").val().trim()).toFixed(2);
        $(this).closest("tr").find(".cal")
            .text(newVal);
    })
})

//-----TABLE SAVE LOGIC ON BLUR-----//
$(".calorieSection").on("blur", ".form-control", function() {
    var text = $(this)
        .val()
        .trim();
    
    var servVal = $("<span>").addClass("serv").text(text);
    //-----EDIT LOCAL STORAGE - FOR NOW DEFAULTED TO ARRAY 0-----//
    var rowIndex = $(this).closest("tr").index();
    var calNew = parseFloat($(this).closest("tr").find(".cal").text());
    var storeText = parseFloat(text);
    console.log(calNew,storeText)

    userDatabase[0].calConsumed[userDatabase[0].calConsumed.length-1].cal.splice(rowIndex,1,calNew);
    userDatabase[0].calConsumed[userDatabase[0].calConsumed.length-1].serv.splice(rowIndex,1,storeText);

    $(this).replaceWith(servVal); 
    saveUserData();  
})

//-----TABLE DELETE BUTTON LOGIC-----//
$(".calorieSection").on("click", ".deleteBtn", function() {
    console.log("delete");
    var rowIndex = $(this).closest("tr").index();
    $(this).closest("tr").remove();

    //-----DELETE LOCAL STORAGE - FOR NOW DEFAULTED TO ARRAY 0-----//
    userDatabase[0].calConsumed[userDatabase[0].calConsumed.length-1].food.splice(rowIndex,1);
    userDatabase[0].calConsumed[userDatabase[0].calConsumed.length-1].cal.splice(rowIndex,1);
    userDatabase[0].calConsumed[userDatabase[0].calConsumed.length-1].serv.splice(rowIndex,1);

    $(".sno").each(function(i) {
        console.log("here");
        $(this).text(i+1);
    })
    saveUserData();
})

//-----ONCLICK MANUAL SUBMIT-----//
$("#manualForm").on("submit", function(event) {
    event.preventDefault();
    var sno = $("#calorieConsumed tr").length -1;
    console.log($("#manualInput").val().trim());
    $(".calorieSection").find("tbody").append("<tr><th class='sno'>"+sno+"</th><th>"+$("#manualInput").val().trim()+
        "</th><td><span class='cal'>"+$("#manualCalorie").val().trim()+"</span></td><td><span class='serv'>"+$("#manualServing").val().trim()+
        "</span></td><td>"+editDelete+"</td></tr>");
    $("#manualInput").val("");
    $("#manualCalorie").val("");
    $("#manualServing").val("");
})

//-----WINDOW ONLOAD DISPLAY TABLE-----//
$(window).on("load", function() {
    //-----DISPLAY FROM LOCAL STORAGE - FOR NOW DEFAULTED TO ARRAY 0-----//
    if (userDatabase[0].calConsumed.length === 0) {
        return;
    } else {$.each(userDatabase[0].calConsumed, function(index, value) {
        if (value.date === dateToday) {
            var currentIndex = index;
        }
        for (var i=0; i<userDatabase[0].calConsumed[currentIndex].cal.length; i++) {
            $("tbody").append("<tr><th class='sno'>"+(i+1)+"</th><th>"+userDatabase[0].calConsumed[currentIndex].food[i]+
            "</th><td><span class='cal'>"+userDatabase[0].calConsumed[currentIndex].cal[i]+"</span></td><td><span class='serv'>"+userDatabase[0].calConsumed[currentIndex].serv[i]+
            "</span></td><td>"+editDelete+"</td></tr>");
        }
    })
    }

    /*for (var i=0; i<userDatabase[0].calConsumed[currentIndex].cal.length; i++) {
        $("tbody").append("<tr><th class='sno'>"+i+"</th><th>"+userDatabase[0].calConsumed[currentIndex].food[i]+
        "</th><td><span class='cal'>"+userDatabase[0].calConsumed[currentIndex].cal[i]+"</span></td><td><span class='serv'>"+userDatabase[0].calConsumed[currentIndex].serv[i]+
        "</span></td><td>"+editDelete+"</td></tr>");
    }*/
    
})

