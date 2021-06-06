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
* [JQuery](https://jquery.com/)
* [Momentjs](https://momentjs.com/)
* [chartist-js](https://github.com/gionkunz/chartist-js)

### APIs used
* [Spoonacular API](https://spoonacular.com/food-api)
* [OpenWeather API](https://openweathermap.org/api)

### Project Description
An application which allows its users to easily manage their calories consumed over a given time but inputting or selecting values for meals. Every user's information will be saved in the application for easy retreival when they return to their designated page. 

### User Story 
* AS a USER, 
* I WANT to have the ability to stay on track of my health and fitness by recording the number of calories consumed in a day to ultimately accomplish a set target for myself.  

### Acceptance Test for User Story 
* GIVEN the need to track my calories in order to modify eating patterns to stay healthy, 
* WHEN I manually input a food and its calories,
* THEN the value captured should be saved in the table according to the individual. 
* WHEN I search a food item,
* THEN I will be given 10 different food items and I can select the one which is most similar to the meal I consumed calorie-wise and serving-wise.
* AND I will also be able to click on the “recipe” button to display the recipe for the selected dish. 
* WHEN I want to remove a food item,
* THEN I can click the arrow on the right-hand corner to either edit the serving size or delete the item entirely from the log. 
* WHEN I can input a quantitative calorie target in kcal, 
* THEN I will be given a percentage and visual representation of the number of calories consumed in the day at a given time. 
* WHEN I first load the application,
* THEN I will be asked my location and this information will be stored in local storage and suggest whether it is ideal to exercise outdoors or stay indoors for the next two days.
* WHEN I have recorded a number of different food items on a weekly means,
* THEN I am shown a graph which outlines personal progress over the course of the last 7 days.
* AND if I go beyond the set target, 
* Then the graph’s line will change to red to indicate that attention is required to stay consistent with the user’s calorie goal. 

* GIVEN my need to have an individualized model and plan for calories consumed overtime,
* WHEN I open my personalized user page every time, 
* THEN I will see my avatar, health-related bio, calorie target, calories consumed, and a record of the food I have consumed. 
* IF I am a new user,
* THEN I can create a new user profile which will be accessible for me every time I open the application.
* IF I am a returning user and I would like to change quantitative data such as my height and weight, 
* THEN I can edit such values by inputting a different numerical value.
* IF I attempt to change such values in non-numerical values, 
* THEN the section will show error and require the user to enter a numerical value.
* WHEN I click on another user’s profile,
* THEN I can view their avatar, bio, calorie target, calories consumed, and food record. 

### Build Process
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