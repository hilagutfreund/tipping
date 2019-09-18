// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDKd4sepVWeb9kyFSm0cJbRzpH7mFmGURY",
    authDomain: "test-thesis1.firebaseapp.com",
    databaseURL: "https://test-thesis1.firebaseio.com",
    projectId: "test-thesis1",
    storageBucket: "test-thesis1.appspot.com",
    messagingSenderId: "169300980699",
    appId: "1:169300980699:web:58a91c062bb26159c9edfe"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var tipApp = angular.module('tipApp', ['ngRoute', 'ui.router']);

    tipApp.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('start');
        $stateProvider
        .state('start', {
            url: '/start',
            templateUrl: 'templates/main.html',
            controller: 'startController'
        })

        .state('ambiguous', {
            url: '/tip1', 
            templateUrl: "templates/tipambiguous.html", 
            controller: 'ambiguousController'

        })

         .state('tipjar', {
            url: '/tip2', 
            templateUrl: "templates/tipjar.html", 
            controller: 'tipjarController'

        })

         .state('barista', {
            url: '/tip3', 
            templateUrl: "templates/barista.html", 
            controller: 'baristaController'

        })

         .state('confirmation', {
            url: '/confirmation',
            templateUrl: "templates/confirmationScreen.html", 
            controller: 'confirmationController'
         })

    });
   
    // create the controller and inject Angular's $scope
    tipApp.controller('mainController', function($scope, $rootScope) {
    });
    
    tipApp.controller('startController', function($scope, $rootScope) {
        $scope.message="hello";

        var db = firebase.firestore(); 
        db.collection("participants").doc().get().then(function(participant){
            console.log(participant); 
        })
       
    });
    

    tipApp.controller('ambiguousController', function($scope) {

        var db = firebase.firestore();

        //read current "user-1/clicked" value
        db.collection("users")
          .doc("user-1")
          .get()
          .then( function(doc){
            showClickedButton(doc);
          });

    //Update user-1/clicked value
        function writeClickedButton(val){
          db.collection("users")
          .doc("user-1")
          .set({
            clicked:val
          });
        }

    //Add buttons click handlers
        $(function(){
          $("#Button_10").click(function(){
            writeClickedButton("+10%");
          })
          $("#Button_15").click(function(){
            writeClickedButton("+15%");
          })
          $("#Button_18").click(function(){
            writeClickedButton("+18%");
          })
          $("#Button_custom").click(function(){
            writeClickedButton("+custom tip");
          })
          $("#Button_none").click(function(){
            writeClickedButton("");
          })
        });

    //Listen to user-1/* data changes
        db.collection("users")
          .doc("user-1")
          .onSnapshot(function(doc){
            showClickedButton(doc);
          });

    //Read the user document data and write the clickd button value to the DOM
        function showClickedButton(doc){
            var user1 = doc.data();
            console.log(doc.id + "->clicked:" + user1.clicked);
            $scope.tipClicked = user1.clicked; //in case we need this at some point to know final tip amount... but won't work for custom tip.. oops. will need to get every click + record the final number
            $("#TipAmount").html(user1.clicked);
            console.log($scope.tipClicked); 
        }
        
    });

    tipApp.controller('tipjarController', function($scope) {
        var db = firebase.firestore();

        //read current "user-1/clicked" value
        db.collection("users")
          .doc("user-1")
          .get()
          .then( function(doc){
            showClickedButton(doc);
          });

    //Update user-1/clicked value
        function writeClickedButton(val){
          db.collection("users")
          .doc("user-1")
          .set({
            clicked:val
          });
        }

    //Add buttons click handlers
        $(function(){
          $("#Button_10").click(function(){
            writeClickedButton("+10%");
          })
          $("#Button_15").click(function(){
            writeClickedButton("+15%");
          })
          $("#Button_18").click(function(){
            writeClickedButton("+18%");
          })
          $("#Button_custom").click(function(){
            writeClickedButton("+custom tip");
          })
          $("#Button_none").click(function(){
            writeClickedButton("");
          })
        });

    //Listen to user-1/* data changes
        db.collection("users")
          .doc("user-1")
          .onSnapshot(function(doc){
            showClickedButton(doc);
          });

    //Read the user document data and write the clickd button value to the DOM
        function showClickedButton(doc){
            var user1 = doc.data();
            console.log(doc.id + "->clicked:" + user1.clicked);
            $scope.tipClicked = user1.clicked; //in case we need this at some point to know final tip amount... but won't work for custom tip.. oops. will need to get every click + record the final number
            $("#TipAmount").html(user1.clicked);
            console.log($scope.tipClicked); 
        }
    });


    tipApp.controller('baristaController', function($scope) {
        var db = firebase.firestore();

        //read current "user-1/clicked" value
        db.collection("users")
          .doc("user-1")
          .get()
          .then( function(doc){
            showClickedButton(doc);
          });

    //Update user-1/clicked value
        function writeClickedButton(val){
          db.collection("users")
          .doc("user-1")
          .set({
            clicked:val
          });
        }

    //Add buttons click handlers
        $(function(){
          $("#Button_10").click(function(){
            writeClickedButton("+10%");
          })
          $("#Button_15").click(function(){
            writeClickedButton("+15%");
          })
          $("#Button_18").click(function(){
            writeClickedButton("+18%");
          })
          $("#Button_custom").click(function(){
            writeClickedButton("+custom tip");
          })
          $("#Button_none").click(function(){
            writeClickedButton("");
          })
        });

    //Listen to user-1/* data changes
        db.collection("users")
          .doc("user-1")
          .onSnapshot(function(doc){
            showClickedButton(doc);
          });

    //Read the user document data and write the clickd button value to the DOM
        function showClickedButton(doc){
            var user1 = doc.data();
            console.log(doc.id + "->clicked:" + user1.clicked);
            $scope.tipClicked = user1.clicked; //in case we need this at some point to know final tip amount... but won't work for custom tip.. oops. will need to get every click + record the final number
            $("#TipAmount").html(user1.clicked);
            console.log($scope.tipClicked); 
        }
    });

    tipApp.controller('confirmationController', function($scope) {
    });

