//Functions for Facebook Authentication & API Calls

function statusChangeCallback(response) {
  //If User is Logged into facebook
  if(response.status === "connected") {
    var result = response.authResponse;
    var userAccess = result.accessToken;
    //Console log that the user is logged in
    console.log( "logged in and authenticated");
  
    console.log(result);
    console.log(userAccess);
  } else {
    //Else log that the user is not logged into Facebook
    console.log("not logged into Facebook");
    
  }

}

// function enterUser(userId, userName) {
//   var currentURL = window.location.origin;
//   $.post(currentURL + "/api/users", userId, userName);
//   console.log("pushed user data");
// }

function logout() {
  FB.logout(function(response){
  })
}

function facebookAPI() {
  FB.api('/me?fields=id,name,email, picture', function(response){
    if(response && !response.error){
      console.log(response);
     var userName = response.name;
     var userId = response.id;
     var userPic = response.picture.data.url;
     var userEmail = response.email;
      console.log(userName +  userId);
      enterUser({
        userName: userName,
        id: userId
      });
      buildProfile(userName, userEmail, userPic);
    }
  })
}

function enterUser(userData) {
  $.post("/api/users", userData)

  console.log("pushed user data");
}


function buildProfile(userName, userEmail, userPic) {
  var profileText = "Your Profile Information"
  console.log("build profile should be working " + userName, +" " + userEmail + " " + userPic);

  $("#buildProfile").append(`<div><h4>${profileText}</h4>
  <img data-img=${userPic} src=${userPic} class='rounded mx-auto mt-2 d-block' alt="profile picture" style='height: 10rem; width: 10rem'> 
  <p>${userName}</p>
  <p>${userEmail}</p>`);
  };


// function setElements(isLoggedIn) {
//   if(isLoggedIn) {
//     document.getElementById('logout').style.display = "block";
//     document.getElementById('profile').style.display ="block";
//     document.getElementById ('fb-btn').style.display ="none";
//   } else
//     document.getElementById('logout').style.display = "none";
//     document.getElementById('profile').style.display ="none";
//     document.getElementById ('fb-btn').style.display ="block";
// }

