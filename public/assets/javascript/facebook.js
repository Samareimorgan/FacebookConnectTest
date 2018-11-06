
window.fbAsyncInit = function() {

      FB.init({
        appId      : '290716314893480',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });
        
      
      FB.getLoginStatus(function(response) {
        console.log(response);
        console.log(response.authResponse);
        console.log(response.authResponse.accessToken);
        console.log(response.authResponse.userID);
          statusChangeCallback(response);
        testAPI();
      });
        
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));



//Functions for Facebook 

  function statusChangeCallback(response) {
    if(response.status === "connected") {
      console.log( "logged in and authenticated");
      //if connected - then take the user id, email and name and push to the UserTable in Sequelize
      //setElements(true);
     // testAPI();
    } else {
      console.log("not authenicated");
      setElements(false);
    }
    
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
    FB.api('/me?fields=name,email', function(response){
      if(response && !response.error){
        console.log(response);
        //buildProfile();
      }
    })
  }

  function buildProfile(user) {
    let profile = `
      <h3>${user.name} </h3>
      <ul class = "list-group">
        <li class = "list-group-item">User ID: ${user.id}</li>
        <li class = "list-group-item">User Email: ${user.email}</li>
      </ul>
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