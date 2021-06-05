/* Toggling for when dropbox is clicked */
/*function myFunction() {
    document.getElementById("changeUser").classList.toggle("changeUser");
} */

//   Redirect to Registration Page
function redirct () {
    location.href = "user.html"
}

  /* Closing the dropdown menu if the user clicks outside of it */
  /*window.onclick = function(event) {
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
  }*/

/* User interface */
// Select and load user profile
/*selectElement('user-content','user1')

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
*/
//Retrieve data from local storage 
var RetriveUserData = function() {
localStorage.setItem('userData', JSON.stringify(userDatabase));
  }

var resultSection = document.querySelector("#result-display");
var userDatabase = [];

var userDatabase = JSON.parse(localStorage.getItem('userData')) || [];
//-----DATE FOR TODAY-----// 
var dateToday = moment().format("YYYY-MM-DD");
var userDataIndex = 0;
//-----CAPTURE LOCALSTORAGE OR IF EMPTY INITIALIZE-----// 
/*if (localStorage.getItem('userData')) {
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
        calBurned: [],
        calTarget: 0,
        position: []
        //totalCal:"0"
    }
    userDatabase.push(thisUser);
    localStorage.setItem('userData', JSON.stringify(userDatabase));
}*/

console.log(userDatabase);
//-----DOM FOR EDIT DELETE-----// 
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

var calorieDetails = {};

//-----EXTRACT DATA FROM FOOD API-----//
var foodSearchResults = function(data) {
    console.log(data.results[0].analyzedInstructions)
    calorieDetails = {
        imgLink: [],
        calorie: [],
        weightPerServing: [],
        uomPerServing: [],
        FoodName: [],
        instruction: []
    }

    for (var i=0; i<data.results.length; i++) {
        calorieDetails.imgLink[i] = data.results[i].image;
        calorieDetails.calorie[i] = data.results[i].nutrition.nutrients[0].amount;
        calorieDetails.weightPerServing[i] = data.results[i].nutrition.weightPerServing.amount;
        calorieDetails.uomPerServing[i] = data.results[i].nutrition.weightPerServing.unit;
        calorieDetails.FoodName[i] = data.results[i].title;
        calorieDetails.instruction[i] = data.results[i].analyzedInstructions;
    }
    displaySearchResults(calorieDetails);
    console.log(calorieDetails);
}

//-----FETCH API FOR FOOD ITEM - SPOONACULAR-----//
var fetchFood = function(searchText) {
    
    //-----WORKING FETCH CODE - USING FIXED VARIABLE FOR TESTING-----//
    fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=1d1c3696b7904c6aa2424198b18c00b0&query="+searchText+"&addRecipeNutrition=true&number=6"
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
    })
}
//-----SAVE USERDATA IN LOCALSTORAGE-----//
var saveUserData = function() {
    console.log(userDatabase);
    localStorage.setItem('userData', JSON.stringify(userDatabase));
}

//-----DISPLAY API RESULTS-----//
var displaySearchResults = function(result) {
    if (result.FoodName.length) {
        for (var i=0; i<result.FoodName.length; i++) {

            var displayBox = document.createElement("article");
            displayBox.className = "column boxBorder searchResult";
            displayBox.setAttribute("data-result-id", i);
            var imgBox = document.createElement("img");

            imgBox.src=result.imgLink[i];
            imgBox.alt='food image';

            var textBox = document.createElement("div");
            textBox.className = "dispResTextBox";
            textBox.innerHTML = "<p>"+result.FoodName[i]+"</p><p>Calories: "
                +result.calorie[i]+" kcal</p><p>Serving: "+
                result.weightPerServing[i]+" "+result.uomPerServing[i]+"</p>"
            
            var buttonDiv = document.createElement("div");
            buttonDiv.className = "buttonContainer";
            var selectOneButton = document.createElement("button");
            selectOneButton.className = "button is-info selectOneButton";
            selectOneButton.textContent = "Select";
            buttonDiv.appendChild(selectOneButton);

            if (result.instruction[i].length) {
                var showRecipe = document.createElement("button");
                showRecipe.className = "button is-info showRecipe";
                showRecipe.textContent = "Recipe";
                buttonDiv.appendChild(showRecipe);
            }
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
        resultSection.appendChild(displayBox);
    }    
}

//-----EVENT HANDLER FOR SEARCH SUBMIT-----//
$("#searchForm").on("submit", function(event) {
    event.preventDefault();
    var searchText = $("#foodSearch").val().trim();
    resultSection.textContent = "";
    fetchFood(searchText);
    $("#foodSearch").val("");
})

//-----EVENT HANDLER FOR SELECT RESULT CLICK-----//
//When the select on the search result is clicked
$("#result-display").on("click", ".selectOneButton", function(event) {

    var index = $(this).closest(".searchResult").attr("data-result-id");
    var sno = $("#calorieConsumed tr").length -1;
    //creates a table and inserts the data to the display table
    $("tbody").append("<tr><th class='sno'>"+sno+"</th><th>"+calorieDetails.FoodName[index]+
        "</th><td><span class='cal'>"+calorieDetails.calorie[index]+"</span></td><td><span class='serv'>"+calorieDetails.weightPerServing[index]+
        "</span></td><td>"+editDelete+"</td></tr>");

    resultSection.textContent = "";
    //-----ADD LOCAL STORAGE - FOR NOW DEFAULTED TO ARRAY 0-----//
    if (userDatabase[userDataIndex].calConsumed.length === 0 || userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].date != dateToday) {
        userDatabase[userDataIndex].calConsumed.push({
            date: dateToday,
            food: [calorieDetails.FoodName[index]],
            cal: [calorieDetails.calorie[index]],
            serv: [calorieDetails.weightPerServing[index]]   
        })
        // adding calories to totalCal
        // userDatabase[0].totalCal=userDatabase[0].totalCal+calorieDetails.calorie[index];
    } else {
        if (userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].date === dateToday) {
            userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].food.push(calorieDetails.FoodName[index]);
            userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal.push(calorieDetails.calorie[index]);
            userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].serv.push(calorieDetails.weightPerServing[index]);
        }
    }   
    saveUserData();
    //Dynamically update progress bar on add
    if (userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal.length) {
        progressBar(userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal);
    }
    updateChart();
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

//-----TABLE SAVE AFTER EDIT LOGIC ON BLUR-----//
$(".calorieSection").on("blur", ".form-control", function() {
    var text = $(this)
        .val()
        .trim();
    
    var servVal = $("<span>").addClass("serv").text(text);
    //-----EDIT LOCAL STORAGE - FOR NOW DEFAULTED TO ARRAY 0-----//
    var rowIndex = $(this).closest("tr").index();
    var calNew = parseFloat($(this).closest("tr").find(".cal").text());
    var storeText = parseFloat(text);

    userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal.splice(rowIndex,1,calNew);
    userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].serv.splice(rowIndex,1,storeText);

    $(this).replaceWith(servVal); 
    saveUserData(); 
    //Dynamically update progress bar on edit
    if (userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal.length) {
        progressBar(userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal);
    } else {
        progressBar([0]);
    }
    updateChart();
})

//-----TABLE DELETE BUTTON LOGIC-----//
$(".calorieSection").on("click", ".deleteBtn", function() {
    var rowIndex = $(this).closest("tr").index();
    $(this).closest("tr").remove();

    //-----DELETE LOCAL STORAGE - FOR NOW DEFAULTED TO ARRAY 0-----//
    userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].food.splice(rowIndex,1);
    userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal.splice(rowIndex,1);
    userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].serv.splice(rowIndex,1);

    $(".sno").each(function(i) {
        $(this).text(i+1);
    })
    saveUserData();
    //Dynamically update progress bar on delete
    if (userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal.length) {
        progressBar(userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal);
    } else {
        progressBar([0]);
    }
    updateChart();
})

//-----ON CLICK MANUAL SUBMIT-----//
$("#manualForm").on("submit", function(event) {
    event.preventDefault();
    //picks value to be appended to table
    var sno = $("#calorieConsumed tr").length -1;

    var desc = $("#manualInput").val().trim();
    var calNew = $("#manualCalorie").val().trim();
    var servNew = $("#manualServing").val().trim();
    //creates and append the row
    $(".calorieSection").find("tbody").append("<tr><th class='sno'>"+sno+"</th><th>"+desc+
        "</th><td><span class='cal'>"+calNew+"</span></td><td><span class='serv'>"+servNew+
        "</span></td><td>"+editDelete+"</td></tr>");

    //-----ADD LOCAL STORAGE - FOR NOW DEFAULTED TO ARRAY 0-----//
    if (userDatabase[userDataIndex].calConsumed.length === 0 || userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].date != dateToday) {
        userDatabase[userDataIndex].calConsumed.push({
            date: dateToday,
            food: [desc],
            cal: [calNew],
            serv: [servNew]    
        })    
    } 
    else {
        if (userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].date === dateToday) {
            userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].food.push(desc);
            userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal.push(calNew);
            userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].serv.push(servNew);
        }
    }
    saveUserData();
    //Dynamically update progress bar on add
    if (userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal.length) {
        progressBar(userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal);
    }
    updateChart();
    //clears form values
    $("#manualInput").val("");
    $("#manualCalorie").val("");
    $("#manualServing").val("");
})

//-----ON CLICK RECIPE BUTTON OPEN MODAL-----//
$("#result-display").on("click", ".showRecipe", function(event) {
    var index = $(this).closest(".searchResult").attr("data-result-id");
    var recipe = calorieDetails.instruction[index];
    //recipe head with food name
    var recipeHead = "<h3> Recipe for " + calorieDetails.FoodName[index] + "</h3>"
    
    var recipeText = "";
    var inininText = "";
    var inText = "";
    //picks text data from the api for instruction
    $.each(recipe, function(index, value) {
        inText = value.name;
        inText = "<p><span class='recipeBold'>INSTRUCTION "+(index+1)+": </span>"+inText+" </p>";
        $.each(value.steps, function(index, valueIn) {
            inininText = inininText + valueIn.step + " ";
        })
        recipeText = recipeText + inText + "<p class='recipeBold'>STEPS</p><span>"+inininText+"</span>";
        inininText = "";
    })
    recipeText = recipeHead + recipeText;

    //creates new modal on click
    var newModal = $("<div>").addClass("modal is-active")
        .html('<div class="modal-background"></div><div class="modal-content myRecipe">'+
        recipeText+'</div><button class="modal-close is-large" aria-label="close"></button');

    $("#result-display").append(newModal);   
})

//-----ON CLICK CLOSE MODAL CLOSE-----//
$("#result-display").on("click", ".modal-close", function(event) {
    //removes modal
    $(".modal").remove();
})

//-----CALORIE TARGET EDIT ON BUTTON CLICK-----//
$(".myCalTarget").on("click" , ".calTarButton", function() {
    var calTar = $(".setMyTarget")
        .text()
        .trim();
    var calInput = $("<input>").addClass("form-control").val(calTar);

    $(".setMyTarget").replaceWith(calInput);
    calInput.trigger("focus");
})

//-----CALORIE TARGET SAVE ON BLUR-----//
$(".myCalTarget").on("blur", ".form-control", function() {
    var text = $(this)
        .val()
        .trim();

    var calTar = $("<span>").addClass("setMyTarget").text(text);
    userDatabase[userDataIndex].calTarget = parseInt(text);
    $(this).replaceWith(calTar);
    saveUserData();
    progressBar(userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal);
    updateChart();
})    

//-----PROGRESS BAR UPDATE FUNCTION - UPDATES THE BAR VALUE AND DISPLAYS %-----//
var progressBar = function(arr) {
    var sum = 0;
    //adds array value
    $.each(arr,function(){
        sum+=parseFloat(this);
    });
    //calculates progress and displays percent
    var progress = ((sum / parseInt(userDatabase[userDataIndex].calTarget)) * 100).toFixed(2);
    if (userDatabase[userDataIndex].calTarget === 0) {
        $(".myCalPercent").text("Please set calorie target");
    } else {
        $(".myCalPercent").text(progress + "%");
    }
    
    //updates bar value
    $(".progressCalCon").attr("value", progress);
}

//-----CHART UPDATE FUNCTION-----//
var updateChart = function() {
    //-----CHART DECLARATION-----//  
    var xAxis = []
    var yAxis = []
    for (var i=0; i<7; i++) {
        xAxis.splice(0,0,moment().subtract(i, 'days').format("MMMDD"))
    }
    var x = 1;
    for (var i=0; i<7; i++) {
        var sum = 0;
        //Initialize index starting from last index
        var index = userDatabase[userDataIndex].calConsumed.length-x;
        //if index exists go in
        if (index >= 0) {
            //checks if the date matches (sub 0 - 6) so starting today to last seven days
            if (userDatabase[userDataIndex].calConsumed[index].date === moment().subtract(i, 'days').format("YYYY-MM-DD")) {    
                //calculate sum of cal
                $.each(userDatabase[userDataIndex].calConsumed[index].cal,function() {
                    sum+=parseFloat(this);
                })
                yAxis.splice(0,0,sum);
                //if there is a match only then x is incremented else it will keep looking for a date match in the last index
                x++;
            }
        }
        //if no index left just put 0, sum is initialized to 0    
        else {
            yAxis.splice(0,0,sum);
        }
    }
    //-----CHART IMPLEMENTATION-----//

    var data = {
        labels: xAxis,
        series: [
            yAxis
        ]
    }
    //check calorie target
    var chartThresh = userDatabase[userDataIndex].calTarget;
    //initialized to 200
    var topUp = 200;
    //If anything in total calorie is greater than calorie target, topup value is increased dynamically
    if (Math.max.apply(Math, yAxis) > chartThresh) {
        topUp = Math.max.apply(Math, yAxis) - chartThresh;

    }

    var chartDimen = {
        fullWidth: true,
        chartPadding: {
            right: 35
        },
        high: chartThresh + topUp,
        plugins: [
            Chartist.plugins.ctThreshold({
            threshold: chartThresh
            })
        ]
    }
    new Chartist.Line('.ct-chart', data, chartDimen)
}

//-----USER DROPDOWN ON HOVER-----//
$('.userDrpdwn').hover(function() {
    $(this).parent().toggleClass('.is-active');
}
);

//-----CHANGE BIO SECTION WHEN NO USER IS REGISTERED-----//
var divertUser = function() {
    $("#otherSection").hide();
    var registerNotice = $("<div>").addClass("registerNotice boxBorder bioBoxCont").html(
        '<h2>No User Registered</h2>'+
        '<h3>Please use the below link to register</h3>'+
        '<button class="button headButtonOveride" onclick="redirct()">'+
        '<div><span class="UserBtnText">Register Here</span></div>'+
        '</button>'
    );
    $("#bioBoxCont").replaceWith(registerNotice);
}
//-----DISPLAY ALL USERS IN DROPDOWN AND SELECT DEFAULT DROPDOWN-----//
var displayUser = function() {
    $.each(userDatabase, function(index, value) {
        var userLink = $("<a>")
            .addClass("registor")
            .attr("data-user",index)
            .text(value.initial);
        $(".dynamicUser").append(userLink);

        if (value.default === "y") {
            userDataIndex = index;
            console.log(userDataIndex);
            $(".UserBtnText").text(userDatabase[userDataIndex].initial);
        }
    })
}

//-----CHANGE USER ON CLICKING DROPDOWN-----//
$(".dynamicUser").on("click", "a", function() {
    console.log($(this).attr("data-user"));
    userDataIndex = parseInt($(this).attr("data-user"));
    $.each(userDatabase, function(index, value) {
        if (index === userDataIndex) {
            value.default = "y";
        } else {
            value.default = "n";
        }
    })
    saveUserData();
    location.reload();
})

// VARIABLE DECLERATION FOR LOADING THE VALUES TO THE BIO AND PROGRESS CHART
var userNameEl=document.querySelector("#user-name");
var userGenderEl=document.querySelector("#user-gender");
var userWeightEl=document.querySelector("#user-weight");
var userHeightEl=document.querySelector("#user-height");
var userCalTargetEl=document.querySelector("#target-bar");
var userCalConsumedEl=document.querySelector("#prog-bar");
var bioUpdate = function() {
    // MVP - DISPLAY THE FIRST USER's DETAIL - BIO
    userNameEl.textContent="Name: "+ userDatabase[userDataIndex].name;
    userGenderEl.textContent="Gender: "+ userDatabase[userDataIndex].gender;
    userWeightEl.textContent="Weight: "+ userDatabase[userDataIndex].weight;
    userHeightEl.textContent="Height: "+ userDatabase[userDataIndex].height;
}

//-----WINDOW ONLOAD DISPLAY TABLE-----//
$(window).on("load", function() {

    //-----INITIALIZE USER MENU-----//
    if (userDatabase.length === 0) {
        $(".UserBtnText").text("Register Here");
        divertUser();
        return;
    } 

    displayUser();
    bioUpdate();
    //Progress BAR function - check if cal consumed data exist
    if (userDatabase[userDataIndex].calConsumed.length != 0) {
        progressBar(userDatabase[userDataIndex].calConsumed[userDatabase[userDataIndex].calConsumed.length-1].cal);
    }   
    //Display calorie target from storage in progress
    $(".setMyTarget").text(userDatabase[userDataIndex].calTarget);

    //-----DISPLAY FROM LOCAL STORAGE - FOR NOW DEFAULTED TO ARRAY 0-----//
    if (userDatabase[userDataIndex].calConsumed.length != 0) {
        $.each(userDatabase[userDataIndex].calConsumed, function(index, value) {
            if (value.date === dateToday) {
                var currentIndex = index;
                for (var i=0; i<userDatabase[userDataIndex].calConsumed[currentIndex].cal.length; i++) {
                    $("tbody").append("<tr><th class='sno'>"+(i+1)+"</th><th>"+userDatabase[userDataIndex].calConsumed[currentIndex].food[i]+
                    "</th><td><span class='cal'>"+userDatabase[userDataIndex].calConsumed[currentIndex].cal[i]+"</span></td><td><span class='serv'>"+userDatabase[userDataIndex].calConsumed[currentIndex].serv[i]+
                    "</span></td><td>"+editDelete+"</td></tr>");
                }
            }
        });
    }
    //-----UPDATE CHART-----//
    updateChart();
    //-----WEATHER API-----//

    if (userDatabase[userDataIndex].position.length < 1) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition); 
        }
    } else {
        searchWeather(userDatabase[userDataIndex].position[0], userDatabase[userDataIndex].position[1]);
    }

})

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

// this functoin will get the lon/lat of the user location.
//let latitude = '';
//let longitude = '';
/*let positionBtn = $("#getLocation")
$("#getLocation").on("click", function getLocation () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        positionBtn.text("Geolocation is not supported by this browser.");
    }
    function showPosition(position) {
        latitude = Math.floor(position.coords.latitude);
        longitude =Math.floor(position.coords.longitude);
        positionBtn.text("longitude = " + longitude + " " + " latitude = " + latitude)
   }

})*/

//-----Weather API integration/functionality begins here
function showPosition(position) {
    console.log(Math.floor(position.coords.latitude))
    userDatabase[userDataIndex].position[0] = Math.floor(position.coords.latitude);
    userDatabase[userDataIndex].position[1] = Math.floor(position.coords.longitude);
    //positionBtn.text("longitude = " + longitude + " " + " latitude = " + latitude)
    saveUserData();
    searchWeather(userDatabase[userDataIndex].position[0], userDatabase[userDataIndex].position[1]);
}
/*$("#displayWeather").on("click", function serachEvent (event) { 
    event.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        
    } else { 
        positionBtn.text("Geolocation is not supported by this browser.");
        return;
    }
    function showPosition(position) {
        latitude = Math.floor(position.coords.latitude);
        longitude =Math.floor(position.coords.longitude);
        //positionBtn.text("longitude = " + longitude + " " + " latitude = " + latitude)
        searchWeather(latitude, longitude)
    }

   console.log(longitude,latitude)
   
})*/

function searchWeather(latitude,longitude) {

    let cardElContainer = $("#cardElementsContainer").text("");
    // these are the variables for the API fetch
    cardElContainer.text('');
    
    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?lat=' +
        latitude +
        '&lon='+
        longitude +
        '&appid=4e9b190f26827f446e804d86e0f8f699'
            // 'https://api.openweathermap.org/data/2.5/forecast?q=Toronto&cnt=48&appid=4e9b190f26827f446e804d86e0f8f699'
            )
            .then(function (response) {
                    return response.json();
            })
            .then(function (weatherData) {

                    let weatherDataList = weatherData.list || [];

                    //     data from API
                    console.log(weatherData);

                    if (weatherDataList.length == 0) {
                            //TODO: show a friendly error message
                            return; 
                    }            
        
                    let firstDate = weatherDataList[0].dt_txt;
                    let firstDateMoment = moment(firstDate);
                    let now = moment();

                    firstDateMoment.set({
                            hour: now.get('hour'),
                            minute: now.get('minute'),
                            second: now.get('second')
                    });
                    // Build an array of moments we want to report on (one per day)
                    let forcastDayMoments = [];
                    for (let i = 0; i < 2; i++) {
                            let forcastDayMoment = moment(firstDateMoment).add(i, 'days');
                            forcastDayMoments.push(forcastDayMoment);
                    }

                    let forcastDataItems = [];
                    forcastDayMoments.forEach(function (forcastDayMoment) {
                            let previousDiffInMS;
                            let previousWeatherData;
                            for (let i = 0; i < weatherDataList.length; i++) {
                                    let dayDateTime = weatherDataList[i].dt_txt;
                                    let weatherMoment = moment(dayDateTime);
                                    let diffInMS = moment(weatherMoment).diff(forcastDayMoment);
                                    diffInMS = Math.abs(diffInMS);

                                    if (previousDiffInMS === undefined) {
                                            previousDiffInMS = diffInMS;
                                            previousWeatherData = weatherDataList[i];
                                            continue;
                                    }

                                    if (diffInMS > previousDiffInMS || (i == weatherDataList.length - 1)) {
                                            forcastDataItems.push(previousWeatherData);
                                            break;
                                    }

                                    previousDiffInMS = diffInMS;
                                    previousWeatherData = weatherDataList[i];
                            }
                    });

                    forcastDataItems.forEach(function (forcastDataItem) {

                            let dayDateTime = forcastDataItem.dt_txt;
                            let dayTempKelvin = Math.floor(forcastDataItem.main.temp - 273);
                            let dayWeatherDetailsDescription = forcastDataItem.weather[0].description;
                            let dayWeatherDetailsIcon = forcastDataItem.weather[0].icon;
                            let weatherIconUrl = 'http://openweathermap.org/img/wn/' +
                                    dayWeatherDetailsIcon +
                                    '@2x.png';

                            // creating the elements for each card
                            cardElContainer = $("#cardElementsContainer");
                            createcardEL = $("<div>").addClass("card border border-primary weatherBox").text(dayDateTime);
                            createCardBody = $("<div>").addClass("card-body");
                            headerEl = $("<h5>").addClass("card-title");
                            listElTemp = $("<li>").addClass("listClass").attr("id", "dayTemp").text(dayTempKelvin + " C");
                            listElDetailsDescription = $("<li>").addClass("listClass").attr("id", "detailsDescription").text(dayWeatherDetailsDescription);;
                            imageIcon = $("<img>").attr("src", weatherIconUrl);

                            // appending all the elements within each card
                            headerEl.append(listElTemp);
                            headerEl.append(listElDetailsDescription);
                            headerEl.append(imageIcon);
                            createCardBody.append(headerEl);
                            createcardEL.append(createCardBody);
                            cardElContainer.append(createcardEL);
                            
                            let extremlyColdWeather = "It seems like a very cold day, maybe stay and do a home workout"
                            let veryColdWeather = "It seems like a cold day, maybe take a warm layer before going to workout outside"
                            let coldWeather = "It seems cooler then normal, maybe take an extra layer before working out outside"
                            let niceWeather = "It seems like a nice day, try go outside for a walk or a run"
                            let hotWeather = "It seems like a very hot day, if you go out make sure to keep hydrated"
                            let veryHotWeather = "It seems like an extremly hot day, try not to stay out too long"
                    // add iff statements to append extra information 
                        if (dayTempKelvin < 0) {
                            workoutSugg = $("<p>").text(extremlyColdWeather);
                            headerEl.append(workoutSugg);
                        }
                        if (dayTempKelvin < 10) {
                            workoutSugg = $("<p>").text(veryColdWeather);
                            headerEl.append(workoutSugg);
                        }
                        if (dayTempKelvin < 15) {
                            workoutSugg = $("<p>").text(coldWeather);
                            headerEl.append(workoutSugg);
                        }
                        if (dayTempKelvin >= 15 && dayTempKelvin <25 ) {
                            workoutSugg = $("<p>").text(niceWeather);
                            headerEl.append(workoutSugg);
                        }
                        if (dayTempKelvin >= 25 ) {
                            workoutSugg = $("<p>").text(hotWeather);
                            headerEl.append(workoutSugg);
                        }
                        if (dayTempKelvin > 30 ) {
                            workoutSugg = $("<p>").text(veryHotWeather);
                            headerEl.append(workoutSugg);
                        }
                    });
                    // -----------------------------------------------------------------------------------------------
            });

}

