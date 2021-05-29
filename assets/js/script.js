//
var foodSearchResults = function() {
    
}

//-----FETCH API FOR FOOD ITEM - SPOONACULAR-----//
var fetchFood = function(searchText) {
    fetch(
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
    })
}

//-----EVENT HANDLER FOR SEARCH SUBMIT-----//
$("#searchForm").on("submit", function(event) {
    event.preventDefault();
    console.log($(this));
    var searchText = $("#foodSearch").val().trim();
    fetchFood(searchText);
})
