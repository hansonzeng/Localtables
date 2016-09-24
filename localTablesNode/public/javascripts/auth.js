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
  console.log("signed in");
  console.log("i got here...")
  currentUid = user.uid;
  document.getElementById('user-signed-in').className = "";
  document.getElementById('user-signed-in').style.display = "block";
  document.getElementById('user-signed-out').style.display = 'none';
  document.getElementById('name').textContent = user.displayName;
  if (user.photoURL){
    document.getElementById('photo').src = user.photoURL;
    document.getElementById('photo').style.display = 'block';
  } else {
    document.getElementById('photo').style.display = 'none';
  }
    window.location.assign('/chefGuest');

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

/**
 * Initializes the app.
 */
var initApp = function() {

  document.getElementById('sign-out').addEventListener('click', function() {
    console.log("current user logged out is " + firebase.auth().currentUser.uid);
    firebase.auth().signOut();
  });
};

window.addEventListener('load', initApp);