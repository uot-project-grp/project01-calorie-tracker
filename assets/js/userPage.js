var userDatabase = JSON.parse(localStorage.getItem('userData')) || [];

var selectDefault = function() {
    $.each(userDatabase, function(index, value) {
        value.default = "n";
        console.log(value.default);
    })
    console.log(userDatabase);
}

$("#userData").on("focus", "input", function() {
    $(this).removeClass("is-danger");
    $(".userWarning").hide();
})

var validateInput = function(userName, initial, gender, weight,height) {
    var okay = true;
    if (userName.length === 0) {
        $(".name").addClass("is-danger");
        okay = false;
    }
    if (initial.length === 0) {
        $(".initial").addClass("is-danger");
        okay = false;
    }
    if (gender.length === 0) {
        okay = false;
    }
    if (isNaN(weight) || weight.length === 0) {
        $(".weight").addClass("is-danger");
        okay = false;
    }
    if (isNaN(height) || height.length === 0) {
        $(".height").addClass("is-danger");
        okay = false;
    }
    return okay;
}

$("#userData").on("click", ".userSubmit", function(event) {
    event.preventDefault();
    var userName = $(".name").val().trim();
    var initial = $(".initial").val().trim();

    
    var gender = $("input[name='gender']:checked").closest("label").text().trim();
    console.log(gender.length)
    var weight = $(".weight").val().trim();
    var height = $(".height").val().trim();
    console.log(userName,initial,gender,weight,height);

    if (validateInput(userName, initial, gender, weight,height) === false) {
        $(".userWarning").show();
        $(".userWarning").text("Missing or invalid input!! All feilds are required. Height and weight only accept numbers!!")
    } 
    else {
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
    }
})

$("#userData").on("click", ".userCancel", function(event) {
    event.preventDefault();
    window.location.replace("index.html");
})