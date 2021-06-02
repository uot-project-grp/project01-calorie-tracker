var userDatabase = JSON.parse(localStorage.getItem('userData')) || [];

$("#userData").on("click", ".userSubmit", function(event) {
    event.preventDefault();
    var userName = $(".name").val().trim();
    var initial = $(".initial").val().trim();

    var gender = $("input[name='gender']:checked").closest("label").text().trim();
    var api = $("input[name='api']:checked").closest("label").text().trim();

    var weight = $(".weight").val().trim();
    var height = $(".height").val().trim();
    console.log(userName,initial,gender,weight,height,api);

    if (api === "Mock API") {
        var clientId = "646428140885-vd6lkigqjfqvifar0oh941msd653ab1v.apps.googleusercontent.com";
        var clientSecret = "feOiXd3_T1YEkWPUC9uHdlzi";
        var refresherToken = "1//048y0xhlQuPcvCgYIARAAGAQSNwF-L9IrZ2jdygr-eiS3cTBTZZwsbamZ09fOMNjdzt-Q7GUIgMjWD5eRf2T0UHcFmrFqHn67oys";
        var authCode = "";
        var accessToken = "";
    }

    var thisUser = {
        name: userName,
        initial: initial,
        gender: gender,
        weight: weight,
        height: height,
        api: [clientId,clientSecret,refresherToken,authCode,accessToken],
        calConsumed:[],
        steps: [],
        calBurned: []
    }

    userDatabase.push(thisUser);
    localStorage.setItem('userData', JSON.stringify(userDatabase));
    window.location.replace("index.html");
})

$("#userData").on("click", ".userCancel", function(event) {
    event.preventDefault();
    window.location.replace("index.html");
})