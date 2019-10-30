const loadSignup = (e) =>{
    var signup = document.querySelector(".signup-wrapper");
    var login = document.querySelector(".login-wrapper");
    signup.style.display = "block";
    login.style.display = "none";
}

const loadLogin = (e) =>{
    var signup = document.querySelector(".signup-wrapper");
    var login = document.querySelector(".login-wrapper");
    login.style.display = "block";
    signup.style.display = "none";
}