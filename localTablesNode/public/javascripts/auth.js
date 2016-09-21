/**
 * FirebaseUI initialization to be used in a Single Page application context.
 */
// FirebaseUI config.
var uiConfig = {
  'callbacks': {
    // Called when the user has been successfully signed in.
    'signInSuccess': function(user, credential, redirectUrl) {
      handleSignedInUser(user);
      // Do not redirect.
      return false;
    }
  },
  // Opens IDP Providers sign-in flow in a popup.
  'signInFlow': 'popup',
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
  'tosUrl': 'https://www.google.com'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Keep track of the currently signed in user.
var currentUid = null;

/**
 * Redirects to the FirebaseUI widget.
 */
var signInWithRedirect = function() {
  window.location.assign('/widget');
};

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
  currentUid = user.uid;
  var db = firebase.database();
  var chefsRef = db.ref("chefs/");

  var createNewChef = function(){
    console.log("did I create new chef? Yes...")
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
    chefsRef.on("value",function(dataSnapShot){
      console.log("datasnapshot name is " + dataSnapShot.val());
      var flag = true;
      dataSnapShot.forEach(function(data){
        console.log("the snapshot is " + data);
        console.log("the key is " + data.key);
        console.log("the current Uid is " + currentUid);
        console.log("the comparison boolean is" + (data.key === currentUid));
        if(data.key === currentUid){
          flag = false;
        }
      });
      if(flag){
          createNewChef();
      }
      console.log("did I fail the check? yes...")
    });
  };

  checkExistingChefs(chefsRef);


  document.getElementById('user-signed-in').style.display = 'block';
  document.getElementById('buttons-signed-in-meals').style.display = 'block';
  document.getElementById('user-signed-out').style.display = 'none';
  document.getElementById('name').textContent = user.displayName;
  document.getElementById('email').textContent = user.email;
  if (user.photoURL){
    document.getElementById('photo').src = user.photoURL;
    document.getElementById('photo').style.display = 'block';
  } else {
    document.getElementById('photo').style.display = 'none';
  }
};

//function to generateChef
var generateUserJson = function(user){
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
    return;
  }
  document.getElementById('loading').style.display = 'none';
  document.getElementById('loaded').style.display = 'block';
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

/**
 * Initializes the app.
 */
var initApp = function() {

  document.getElementById('sign-out').addEventListener('click', function() {
    console.log("current user logged out is " + firebase.auth().currentUser.uid);
    firebase.auth().signOut();
  });
  document.getElementById('delete-account').addEventListener(
      'click', function() {
        firebase.auth().currentUser.delete();
      });
};

window.addEventListener('load', initApp);