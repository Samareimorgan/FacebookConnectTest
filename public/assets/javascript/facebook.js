


//Functions for Facebook 
 $("#logFacebookBtn").on("click",function() {
  //FB.logout();
 }
 )
  function logInFacebook(){
    FB.login();
    
  }
  function storeUserAccessToken (userAccess) {
    sessionStorage.setItem("userAccess", userAccess);
  }
  function statusChangeCallback(response) {
    if(response.status === "connected") {
      var result = response.authResponse;
      var userAccess = result.accessToken;
      console.log( "logged in and authenticated");
      console.log(result);
      console.log(userAccess);
      
      
   
      
      // $("#profileName").html(result.name);
      // $("#profileEmail").html(result.email);
      //if connected - then take the user id, email and name and push to the UserTable in Sequelize
      //setElements(true);
     // testAPI();
    } else {
      console.log("not authenicated");
      setElements(false);
    }
    d
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
        var user = response.authResponse.name
        console.log(user);
        //buildProfile(user);
      }
    })
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