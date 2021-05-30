var resultSection = document.querySelector("#result-display");
console.log(resultSection);

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

var displaySearchResults = function(result) {
    
    if (result.FoodName.length) {
        for (var i=0; i<result.FoodName.length; i++) {
            console.log(result.FoodName[i]);
            //var displayBox = $("<article>")
            //    .addClass("column boxBorder searchResult");
            var displayBox = document.createElement("article");
            displayBox.className = "column boxBorder searchResult";
            //var imgBox = $("<div>")
            //    .html("<img src='"+result.imgLink[i]+"' alt='icon'/>");
            var imgBox = document.createElement("img");
            //imgBox.className = "imgBox";
            imgBox.src=result.imgLink[i];
            imgBox.alt='food image';
            //imgBox.innerHTML = "<img src='"+result.imgLink[i]+"' alt='icon'/>"
            //console.log(imgBox);
            var textBox = document.createElement("div");
            /*var textBox = $("<div>")
                .html("<p>"+result.FoodName[i]+"</p><p>Calories: "
                +result.calorie[i]+" kcal</p><p>Serving: "+
                result.weightPerServing[i]+" "+result.uomPerServing[i]+"</p>");
            $(imgBox).appendTo(displayBox);
            $(textBox).appendTo(displayBox);*/
            textBox.innerHTML = "<p>"+result.FoodName[i]+"</p><p>Calories: "
                +result.calorie[i]+" kcal</p><p>Serving: "+
                result.weightPerServing[i]+" "+result.uomPerServing[i]+"</p>"
            
            var buttonDiv = document.createElement("div");
            buttonDiv.className = "buttonContainer";
            var addButton = document.createElement("button");
            addButton.className = "button is-info addButton";
            addButton.textContent = "Add";
            var showRecipe = document.createElement("button");
            showRecipe.className = "button is-info showRecipe";
            showRecipe.textContent = "Recipe";
            buttonDiv.appendChild(addButton);
            buttonDiv.appendChild(showRecipe);

            displayBox.appendChild(imgBox);
            displayBox.appendChild(textBox);
            displayBox.appendChild(buttonDiv);
            //console.log($("#result-display"), displayBox);
            //$(displayBox).appendTo(resultSection)
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
    fetchFood(searchText);
})
