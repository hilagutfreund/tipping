    // tipApp.controller('tipjarController', function($scope, $stateParams) {
    //     var db = firebase.firestore();

    //     //read current "user-1/clicked" value
    //     db.collection("users")
    //       .doc("user-1")
    //       .get()
    //       .then( function(doc){
    //         showClickedButton(doc);
    //       });

    // //Update user-1/clicked value
    //     function writeClickedButton(val){
    //       db.collection("users")
    //       .doc("user-1")
    //       .set({
    //         clicked:val
    //       });
    //     }

    // //Add buttons click handlers
    //     $(function(){
    //       $("#Button_10").click(function(){
    //         writeClickedButton("+10%");
    //       })
    //       $("#Button_15").click(function(){
    //         writeClickedButton("+15%");
    //       })
    //       $("#Button_18").click(function(){
    //         writeClickedButton("+18%");
    //       })
    //       $("#Button_custom").click(function(){
    //         writeClickedButton("+custom tip");
    //       })
    //       $("#Button_none").click(function(){
    //         writeClickedButton("");
    //       })
    //     });

    // //Listen to user-1/* data changes
    //     db.collection("users")
    //       .doc("user-1")
    //       .onSnapshot(function(doc){
    //         showClickedButton(doc);
    //       });

    // //Read the user document data and write the clickd button value to the DOM
    //     function showClickedButton(doc){
    //         var user1 = doc.data();
    //         console.log(doc.id + "->clicked:" + user1.clicked);
    //         $scope.tipClicked = user1.clicked; //in case we need this at some point to know final tip amount... but won't work for custom tip.. oops. will need to get every click + record the final number
    //         $("#TipAmount").html(user1.clicked);
    //         console.log($scope.tipClicked); 
    //     }
    // });


    // tipApp.controller('baristaController', function($scope, $stateParams) {
    //     var db = firebase.firestore();

    //     //read current "user-1/clicked" value
    //     db.collection("users")
    //       .doc("user-1")
    //       .get()
    //       .then( function(doc){
    //         showClickedButton(doc);
    //       });

    // //Update user-1/clicked value
    //     function writeClickedButton(val){
    //       db.collection("users")
    //       .doc("user-1")
    //       .set({
    //         clicked:val
    //       });
    //     }

    // //Add buttons click handlers
    //     $(function(){
    //       $("#Button_10").click(function(){
    //         writeClickedButton("+10%");
    //       })
    //       $("#Button_15").click(function(){
    //         writeClickedButton("+15%");
    //       })
    //       $("#Button_18").click(function(){
    //         writeClickedButton("+18%");
    //       })
    //       $("#Button_custom").click(function(){
    //         writeClickedButton("+custom tip");
    //       })
    //       $("#Button_none").click(function(){
    //         writeClickedButton("");
    //       })
    //     });

    // //Listen to user-1/* data changes
    //     db.collection("users")
    //       .doc("user-1")
    //       .onSnapshot(function(doc){
    //         showClickedButton(doc);
    //       });

    // //Read the user document data and write the clickd button value to the DOM
    //     function showClickedButton(doc){
    //         var user1 = doc.data();
    //         console.log(doc.id + "->clicked:" + user1.clicked);
    //         $scope.tipClicked = user1.clicked; //in case we need this at some point to know final tip amount... but won't work for custom tip.. oops. will need to get every click + record the final number
    //         $("#TipAmount").html(user1.clicked);
    //         console.log($scope.tipClicked); 
    //     }
    // });