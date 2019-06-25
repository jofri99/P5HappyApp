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
  var finalArr;

  function gotData(data){
    var dataArr = data.val();
    var keys = Object.keys(dataArr);
    var feel = [],ac = [],k;
    
    for(var i = 0; i<keys.length;i++){
      k = keys[i];
      feel[i] = dataArr[k].feelToday;
      ac[i] = dataArr[k].activites;
    }
    console.log("Write Feeling");

    writeFeeling(ac,feel)
  }


  function writeFeeling(ac,feel){
    finalArr = [["Sport",0],["Essen",0],["Wandern",0]];
    var a;
    for(var i = 0; i<ac.length;i++){
       a = ac[i];
      for(var h = 0; h< a.length;h++){
        var exist = false;
        for(var j = 0; j<finalArr.length;j++){
          if(a[h] == finalArr[j][0]){
            finalArr[j][1]+=feel[i];
            exist = true;
          }
        }
        if(!exist){
          finalArr.push([a[h],feel[i]]);
        }
      }
    }

    for(var i = 0; i<finalArr.length;i++){
      console.log(finalArr[i][0]+": "+finalArr[i][1]);
    }
  }

  function errData(err){
    console.log("Error :C");
    console.log(err);
  }
  
  function writeData(acti,feeling){
    if(acti.length > 0){
      var newDayRef = dbRef.push();
      newDayRef.set({
          feelToday: feeling,
          activites: acti
        });
    }
    }


