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
  var dbRef2 = firebase.database().ref("Feel");
  dbRef.on('value',gotData,errData);
  var ac = ["heheh","fd","saff"];
  var feeling = 2;
  

  function gotData(data){
    var dataArr = data.val();
    var keys = Object.keys(dataArr);
    console.log(keys);
    console.log(data.val());
    var feel,ac,k;
    
    for(var i = 0; i<keys.length;i++){
      k = keys[i];
      feel = dataArr[k].feelToday;
      ac = dataArr[k].activites;
      console.log(ac);
      console.log("--------------");
    }
    writeFeeling(ac,feel)
  }


  function writeFeeling(ac,feel){
    var arr = [["Sport",0],["Essen",0],["Wandern",0]]
    for(var i = 0; i<ac.length;i++){
      a = ac[i];
      for(var j = 0; j<arr.length;j++){
        if(a == arr[j][0]){
          console.log(arr[j][0]);
        }
      }

    }
  }

  function errData(err){
    console.log("Error :C");
    console.log(err);
  }
  
  function writeData(acti,feeling){
    var newDayRef = dbRef.push();
    newDayRef.set({
        feelToday: feeling,
        activites: acti
      });
    }


