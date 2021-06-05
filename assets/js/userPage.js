var userDatabase = JSON.parse(localStorage.getItem('userData')) || [];

var selectDefault = function() {
    $.each(userDatabase, function(index, value) {
        value.default = "n";
        console.log(value.default);
    })
    console.log(userDatabase);
}
    

$("#userData").on("click", ".userSubmit", function(event) {
    event.preventDefault();
    var userName = $(".name").val().trim();
    var initial = $(".initial").val().trim();

    var gender = $("input[name='gender']:checked").closest("label").text().trim();
    var api = $("input[name='api']:checked").closest("label").text().trim();

    var weight = $(".weight").val().trim();
    var height = $(".height").val().trim();
    console.log(userName,initial,gender,weight,height,api);

    var thisUser = {
        name: userName,
        initial: initial,
        gender: gender,
        weight: weight,
        height: height,
        api: [],
        calConsumed:[],
        steps: [],
        calBurned: [],
        calTarget: 0,
        position: [],
        default: "y"
    }

    if (userDatabase.length > 0) {
        selectDefault();
    }
    userDatabase.push(thisUser);
    localStorage.setItem('userData', JSON.stringify(userDatabase));
    window.location.replace("index.html");
})

$("#userData").on("click", ".userCancel", function(event) {
    event.preventDefault();
    window.location.replace("index.html");
})