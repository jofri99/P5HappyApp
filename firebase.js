var firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "happyapp-c279e.firebaseapp.com",
    databaseURL: "https://happyapp-c279e.firebaseio.com",
    projectId: "happyapp-c279e",
    storageBucket: "happyapp-c279e.appspot.com",
    messagingSenderId: "794370154104",
    appId: "1:794370154104:web:42f105b39de003eb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var dbRef = firebase.database().ref("Day");
  var ac = ["heheh","fd","saff"];
  var feeling = 2;
  function writeData(acti,feeling){
    var newDayRef = dbRef.push();
    newDayRef.set({
        feelToday: feeling,
        activites: acti
      });
    }
  writeData(ac,feeling);