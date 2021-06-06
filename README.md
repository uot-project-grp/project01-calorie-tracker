# CALORIE TRACKER - COUNTING CALORIES
## Version 1.0
### [Link to "CALORIE TRACKER" page](https://uot-project-grp.github.io/project01-calorie-tracker/)

### Project Contributors
* [Abhishek Jamwal](https://github.com/jamwalab)
* [Ankur Shahi](https://github.com/ankurshahi80)
* [Abdul Khalil](https://github.com/absk786)
* [Amna Syeda](https://github.com/amnasyeda)
* [Aashir Javed](https://github.com/aashir104)

![Preview](./assets/images/preview.gif)

### Built with
* HTML, CSS AND JavaScript
* [Bulma](https://bulma.io/)
* JQuery
* Momentjs
* [chartist-js](https://github.com/gionkunz/chartist-js)

### API used
* [Spoonacular API](https://spoonacular.com/food-api)
* [OpenWeather API](https://openweathermap.org/api)

### Project description


### Build process
* Calorie tracker app keeps track of user data and inputs using local storage.
* Multiple uses can register and store their data using this page.
* If no user is registered then the page will display message, requesting user to register.
* Once user is registered their basic data will be displayed in the Bio section.
* Progress section tracks the user's progress against the calorie target.
* User can edit their calorie target anytime using the edit button, only numeric inputs will be accepted.
* In the Add Food Item section, user can search for their food item using the search form at the bottom.
* On clicking the search button Spoonacular API will search and display the results below.
* If the recipe for the dish is available, you will have the option t o click recipe button and display a summarized version of the recipe.
* If no recipe is available, there will be no recipe button.
* On clicking select on the result, the dish will be added to your calorie consumed section.
* If the serving amount does not match the one displayed, you can change it by clicking the down arrow next to the dish and clicking edit.
* The calorie amount will automaticall change based on your serving input. Please note only numeric values are accepted.
* You also have the option to delete a dish by clicking down arrow next to the row and clicking delete.
* The progress bar and the graph change dynamically based on your input and at the same time also stored in local storage.
* When the registered user first time opens the page, browser will ask for the location.
* The location is then saved in local storage and the user is shown the weather for today and the next day.