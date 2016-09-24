/**
 * FirebaseUI initialization to be used in a Single Page application context.
 */
// FirebaseUI config.
var uiConfig = {

    // Opens IDP Providers sign-in flow in a popup.
  'queryParameterForSignInSuccessUrl': 'signInSuccessUrl',
  'signInFlow': 'popup',
  'signInSuccessUrl': './chefGuest',
  'signInOptions': [
    // TODO(developer): Remove the providers you don't need for your app.
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: ['https://www.googleapis.com/auth/plus.login']
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes :[
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ]
    }
  ],
  // Terms of service url.
  'tosUrl': 'https://www.google.com',
  'callbacks': {
    // Called when the user has been successfully signed in.
    'signInSuccess': function(user, credential, redirectUrl) {
      console.log("signInSuccess");
      handleSignedInUser(user);
      console.log('user',user);
      console.log('credential',credential);
      console.log('redirectUrl',redirectUrl);
      // Do redirect.
      return true;
    }
  },
  

};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Keep track of the currently signed in user.
var currentUid = null;

/**
 * Open a popup with the FirebaseUI widget.
 */
var signInWithPopup = function() {
  window.open('/widget', 'Sign In', 'width=985,height=735');
};


/**
 * Displays the UI for a signed in user.
 */
var handleSignedInUser = function(user) {
  console.log("signed in");
  currentUid = user.uid;
  var db = firebase.database();
  var chefsRef = db.ref("chefs/");

  var createNewChef = function(){
    console.log("inside method creating new chef");
    console.log("user is:",user);
    var chefJSON = generateUserJson(user)
    //put user into database, assume curently a chef~
    $.ajax({
        url: '/chefs/putChef',
        type: 'PUT',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({chefData: chefJSON, userID: currentUid}),
        success:function(result){
          alert(result);
        }
      });
  };

  var checkExistingChefs = function(chefsRef){
    console.log('entered checkExistingChefs functions');
    console.log(chefsRef);
    chefsRef.on("value",function(dataSnapShot){
      console.log('once worked');
      var flag = true;
      dataSnapShot.forEach(function(data){
        if(data.key === currentUid){
          console.log("data, currentuID", data.key,currentUid);
          flag = false;
        }
      });
      if(flag){
          console.log("flag was true so running createNewChef method");
          createNewChef();
      }
    });
  };

  console.log('right before running method checkExistingChefs');
  // checkExistingChefs(chefsRef);
  createNewChef();

  document.getElementById('user-signed-in').className = "";
  document.getElementById('user-signed-in').style.display = 'block';
  document.getElementById('user-signed-out').style.display = 'none';
  document.getElementById('name').textContent = user.displayName;
  if (user.photoURL){
    document.getElementById('photo').src = user.photoURL;
    document.getElementById('photo').style.display = 'block';
  } else {
    document.getElementById('photo').style.display = 'none';
  }
};

//function to generateChef
var generateUserJson = function(user){
  console.log('generating user',  user)
  var chef = {
    "Name" : user.displayName,
    "Picture" : user.photoURL,
    "Description" : "Hi my name is " + user.displayName,
    "Reviews" : [{
      "message" : "host is amazing!!"
    }],
    "Meals" : {}
  };
  return chef
};

/**
 * Displays the UI for a signed out user.
 */
var handleSignedOutUser = function() {
  document.getElementById('user-signed-in').style.display = 'none';
  document.getElementById('firebaseui-spa').style.display = 'block';
  document.getElementById('user-signed-out').style.display = 'block';
  ui.start('#firebaseui-container', uiConfig);
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function(user) {
  // The observer is also triggered when the user's token has expired and is
  // automatically refreshed. In that case, the user hasn't changed so we should
  // not update the UI.
  if (user && user.uid == currentUid) {
    console.log("entered");
    return;
  }
  document.getElementById('loading').style.display = 'none';
  document.getElementById('loaded').style.display = 'block';
  document.getElementById('loaded').className = "";
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

var getChefMeals = function(){
  var allMeals = [];

  $.ajax({
        url: '/chefs/getChefMeals/' + currentUid,
        type: 'GET',
        success: function(result){
            result.forEach(function(obj){
              console.log("I'm getting all the meals for the chef")
              console.log(obj);
            });
         }

      });

}

/**
 * Initializes the app.
 */
var initApp = function() {
  //document.getElementById('get-chef-meals').addEventListener('click',getChefMeals);
  document.getElementById('sign-out').addEventListener('click', function() {
    console.log("current user logged out is " + firebase.auth().currentUser.uid);
    firebase.auth().signOut();
  });
};

window.addEventListener('load', initApp);