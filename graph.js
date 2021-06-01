name = document.querySelectorAll(".name");
weight = parseInt(document.querySelectorAll(".weight"));
height = parseInt(document.querySelectorAll(".height"));
initail =document.querySelectorAll(".initail");
male =document.querySelectorAll(".male");
gender = null
female =document.querySelectorAll(".demale");
mock_api =document.querySelectorAll(".mock_api");
mock = "";

users = []



function add_to_list (name, weight, height, initail, gender, mock_api) {
    if (male.checked == true) {
        gender = "Male"
    }  else {
        gender = "Female"
    }

    if (mock_api.checked == true) {
        mock = "True"
    } else {
        mock = "False"
    }

    user_1 = {Name: name, initail: initail, gender: gender, weight: weight, height: height, mock_api: mock}
}

users.append(user_1)