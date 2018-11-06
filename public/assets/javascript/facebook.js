 // On Document Load,  check to see if the user is logged into Facebook
// $(document).ready(function() {
//   getLoginStatus();
//   console.log(response);
  
//   });

  // ++++ Functions with Facebook - Client-Side +++++ 

  // Function to store User Access Token in Session Storage//
  function storeUserAccessToken (userAccess) {
    sessionStorage.setItem("userAccess", userAccess);
      alert("User Access Stored");
  }

  // Function to check for 
  function statusChangeCallback(response) {
    //If User is Logged into facebook
    if(response.status === "connected") {
      var result = response.authResponse;
      var userAccess = result.accessToken;
      //Console log that the user is logged in
      console.log( "logged in and authenticated");
      console.log(result);
      console.log(userAccess);
      //Session Store the User Access Token to be used for API request
      storeUserAccessToken(userAccess);
      //Hide the Login With Facebook Button
      //+==========
      //Display the Logout button in the upper corner
    } else {
      //Else log that the user is not logged into Facebook
      console.log("not logged into Facebook");
      //Display the Login With Facebook Button
          //===============
    }
    
      //setElements(false);
      // $("#profileName").html(result.name);
      // $("#profileEmail").html(result.email);
      //if connected - then take the user id, email and name and push to the UserTable in Sequelize
      //setElements(true);
     // testAPI();
    
    
  }

  function postUserInfo(response) {
    var currentURL = window.location.origin;
       var response = response.authResponse;
      $.post(currentURL + "/api/users", function(response) {
         result = response.authResponse;
         id = result.id;
         userName = result.name;

         console.log(id + userName);
       // initializeRows();
      });
    }
  

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
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
  function logout() {
    FB.logout(function(response){
      //setElements(false);
    })
  }

  function testAPI() {
    FB.api('/me?fields=id,name,email', function(response){
      if(response && !response.error){
        console.log(response);
        var name = response.name;
        var userId = response.id;
       // var userEmail = response.email;
        console.log(name +  userId);
        enterUser(userId,name);
        //buildProfile(user);
      }
    })
  }

  function enterUser(userId, name) {
    $.post("/api/users", userId, name);
    console.log("pushed user data");
}
  
  function buildProfile(user) {
    let profile = `
      <h2>${user.name} </h2>
      <h3>${user.email}</h3>
    `;

      document.getElementById("profile").innerHTML = profile;
  }
           
// //Facebook Login Button HTML Code
//   <fb:login-button 
//   id = "fb-btn"
//   scope="public_profile,email"
//   onlogin="checkLoginState();">
//   </fb:login-button>
// //Facebook Logout Code 
//   <li><a id="logout" href = "#" onclick="logout()">Logout</a></li>
// //Add Profile Div for InnerHTML or Use Handlebars
//    <div id="profile"></div>

// Object results from Facebook with user token
// {
//   "first_name": "Samantha",
//   "last_name": "Johnston",
//   "id": "10157106986155798",
//   "email": "samareimorgan@gmail.com",
//   "picture": {
//     "data": {
//       "height": 50,
//       "is_silhouette": false,
//       "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10157106986155798&height=50&width=50&ext=1543864240&hash=AeRB7ntHjsyZ-NMD",
//       "width": 50
//     }
//   }
// }

//in order to obtain infromation from the user