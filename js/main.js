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
            url: '/tip1?userid', 
            templateUrl: "templates/tipambiguous.html", 
            controller: 'tipController'

        })

         .state('tipjar', {
            url: '/tip2?userid', 
            templateUrl: "templates/tipjar.html", 
            controller: 'tipController'

        })

         .state('barista', {
            url: '/tip3?userid', 
            templateUrl: "templates/barista.html", 
            controller: 'tipController'

        })

           .state('confirmation', {
            url: '/confirmation?userid&tip',
            templateUrl: "templates/confirmationScreen.html", 
            controller: 'confirmationController'
         })

         .state('mobileStart', {
            url: '/mobileStart?userid', 
            templateUrl: "templates/mobilestart.html", 
            controller: "mobileStartController"
         })

           .state('mobileConfirm1', {
            url: '/mobileConfirm1?userid', 
            templateUrl: "templates/confirmationScreenMobile1.html", 
            controller: "mobile1ConfirmationController"
         })

            .state('thanks', {
            url: '/thanks?userid', 
            templateUrl: "templates/thankyou.html", 
            controller: "thankyouController"
         })

         //  .state('custom', {
         //    url: '/custom',
         //    templateUrl: "templates/customScreen.html", 
         //    controller: 'customController'
         // })

    });
   
    // create the controller and inject Angular's $scope
    tipApp.controller('mainController', function($scope, $rootScope, $timeout, $state, $stateParams) {
        $rootScope.linkHistoryBack = '/';
        $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            $rootScope.linkHistoryBack = $state.href(from, fromParams, {
            absolute: true
        });
      });
    });
    
    tipApp.controller('startController', function($scope, $rootScope, $timeout, $state, $stateParams) {

        $scope.message="hello";
        $scope.participants = [];
        $scope.selected = {
            id: "x",
            IA:"",
            device:""
        };

        //select participant from list
        $scope.onSelectParticipant = function(){
            var newId = $scope.selected.id;
            localStorage.setItem("selectedId",newId);

            var par = $scope.participants.find(p=>p.id==newId);
            if(par!==undefined){
                $scope.selected.IA = par.data.IA;
                $scope.selected.device = par.data.device;
                $scope.selected.switch = par.data.switch; 
                //$scope.web = $scope.webPage($scope.selected.switch);
            }else{
                $scope.selected.IA = "";
                $scope.selected.device = "";
            }
        }

        //get a list of all participants from database
        var db = firebase.firestore();
          db.collection("participants")
            .get()
            .then(function(querySnapshot) {
                var list = [];
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    // $timeout(function(){
                    list.push({id:doc.id, data:doc.data()}); 
                    // });
                    

                });
                $timeout(function(){
                    $scope.participants =list;
                    $timeout(function() {
                      $scope.selected.id =
                          localStorage.getItem("selectedId") || "x";
                      $scope.onSelectParticipant();
                  });
                });
                console.log($scope.participants); 
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });


            //this is not working... so far can only hard code which thing.. 
       $scope.webPage = function(scenario){
        switch (scenario) {
            case 'st':
                return 'tipjar';
                break;
            case 'sm':
                return 'tipjar';
                break;
            case 'bt':
                return'barista';
                break; 
            case 'bm':
                return 'barista';
                break; 
            case 'at':
                return 'ambiguous';
                break; 
            case 'am':
                return 'ambiguous';
                break; 
            default:
        }
       }
       
    });
    
  

    tipApp.controller('tipController', function($scope, $rootScope, $timeout, $state, $stateParams) {
        $scope.userid = $stateParams.userid; 
        if(!$scope.userid){
            $state.go('start',{},{location:"replace"}); 
            return; 
        }
        console.log( "->user id from param:" + $stateParams.userid);
        console.log( "->user id from scope:" + $scope.userid);


        var db = firebase.firestore();

        
        //read current "user-1/clicked" value
        db.collection("participants")
          .doc($scope.userid)
          .get()
          .then( function(doc){
            $scope.data = doc.data(); 
            console.log($scope.data); 
            //showClickedButton(doc);
          });

    //Update user-1/clicked value
        function writeClickedButton(val){
        var history; 
            history = $scope.data.history || [];
            history.push({clicked:val, IA:$scope.data.IA, device:$scope.data.device, timestamp:new Date().toLocaleString()}); 
        
          db.collection("participants")
          .doc($scope.userid)
          .set({
            clicked:val,
            tip:val,
            IA:$scope.data.IA,
            device:$scope.data.device,
            switch:$scope.data.switch, 
            showMobile: "off",
            history: history
          });
        }


    //Add buttons click handlers
        // $(function(){
        //   $("#Button_10").click(function(){
        //     writeClickedButton("10%");
        //   })
        //   $("#Button_15").click(function(){
        //     writeClickedButton("15%");
        //   })
        //   $("#Button_18").click(function(){
        //     writeClickedButton("18%");
        //   })
        //   // $("#Button_custom").click(function(){
        //   //   writeClickedButton("+custom tip");
        //   // })
        //   $("#Button_none").click(function(){
        //     writeClickedButton("");
        //   })
        // });

        $scope.tipClicked = function(val){
            writeClickedButton(val);
            $state.go("confirmation",{userid:$scope.userid, tip:val});

        }

    //Listen to user-1/* data changes
        // db.collection("participants")
        //   .doc($scope.userid)
        //   .onSnapshot(function(doc){
        //     showClickedButton(doc);
        //   });

    //Read the user document data and write the clickd button value to the DOM
        // function showClickedButton(doc){
        //     var user1 = doc.data();
        //     console.log("IA" + user1.IA); 
        //     console.log("device" + user1.device);
        //     console.log(doc.id + "->clicked:" + user1.clicked);
        //     $scope.tipClicked = user1.clicked; 
        //     $("#TipAmount").html(user1.clicked);
        //     console.log($scope.tipClicked); 

        // }  
    });


      
    tipApp.controller('confirmationController', function($scope, $rootScope, $timeout, $state, $stateParams) {
        //var usertip = $stateParams.useridtip; 
        //console.log(usertip); 
        //var strings = usertip.split("tip");
        //console.log(strings); 
        //$scope.userid = strings[0]; 
        //$scope.tip = strings[1];

        $scope.userid = $stateParams.userid;
        $scope.tip = $stateParams.tip; 
        console.log("userid: " + $scope.userid);
        console.log("tip: " + $scope.tip); 
        //console.log("pls be tip: " + $scope.tip);  
        var amount = parseFloat($scope.tip) + parseFloat(5); 
        $scope.finalAmount = amount.toFixed(2); 
        console.log($scope.finalAmount); 

        

        var db = firebase.firestore();

        //read current "user-1/clicked" value
        db.collection("participants")
          .doc($scope.userid)
          .get()
          .then( function(doc){
            $scope.data = doc.data(); 
            console.log($scope.data); 
            //showClickedButton(doc);
            findUrl($scope.data.switch); 
          });

       



        $scope.pickURL = function(){
            $state.go($scope.url, {userid: $scope.userid}); 
        }

        function findUrl(urldata){
          switch (urldata){
            case 'am':
                $scope.url='ambiguous';
                console.log("url should be ambiguous: " + $scope.url); 
                break;
            case 'sm':
                $scope.url='tipjar';
                console.log("url should be tipjar: " + $scope.url);
                break;
            case 'bm':
                $scope.url='barista';
                console.log("url should be barista: " + $scope.url); 
                break; 
              case 'at':
            $scope.url='ambiguous';
            console.log("url should be ambiguous: " + $scope.url); 
            break;
        case 'st':
            $scope.url='tipjar';
            console.log("url should be tipjar: " + $scope.url);
            break;
        case 'bt':
            $scope.url='barista';
            console.log("url should be barista: " + $scope.url); 
            break; 
            default:
                $scope.url="start";
                break; 
          }
         }

      // $scope.getLinkUrl = function(){
      //           return $state.href($scope.url, {userid: $scope.userid});
      //       };


      //   function findUrl(urldata){
      //     switch (urldata){
      //       case 'at':
      //           $scope.url='ambiguous';
      //           console.log("url should be ambiguous: " + $scope.url); 
      //           break;
      //       case 'st':
      //           $scope.url='tipjar';
      //           console.log("url should be tipjar: " + $scope.url);
      //           break;
      //       case 'bt':
      //           $scope.url='barista';
      //           console.log("url should be tipjar: " + $scope.url); 
      //           break; 
      //       default:
      //           $scope.url="start";
      //           break; 
      //     }
      //    }


    //Update user-1/clicked value
        function writeClickedButton(val){
        var history; 
        history = $scope.data.history || [];
        history.push({clicked:val, IA:$scope.data.IA, device:$scope.data.device,finalTip:$scope.tip, showMobile:"false", timestamp:new Date().toLocaleString()}); 
        

          db.collection("participants")
          .doc($scope.userid)
          .set({
            clicked:val,
            IA:$scope.data.IA,
            device:$scope.data.device,
            switch:$scope.data.switch,
            finalTip: $scope.tip, 
            showMobile: "off", 
            history: history
          });
        }

    //Add buttons click handlers
      //   $(function(){
      //     $("#Print").click(function(){
      //       writeClickedButton("print receipt");
      //     })
      //     $("#None").click(function(){
      //       writeClickedButton("no receipt");
      //   });
      // });

    $scope.onBtnClick = function(msg){
        writeClickedButton(msg);
        $state.go("thanks")
    }

    //Listen to user-1/* data changes
        db.collection("participants")
          .doc($scope.userid)
          .onSnapshot(function(doc){
            //showClickedButton(doc);
          });

    //Read the user document data and write the clickd button value to the DOM
        // function showClickedButton(doc){
        //     var user1 = doc.data();
        //     console.log("IA" + user1.IA); 
        //     console.log("device" + user1.device);
        //     console.log(doc.id + "->clicked:" + user1.clicked);
        //     $scope.tipClicked = user1.clicked; //in case we need this at some point to know final tip amount... but won't work for custom tip.. oops. will need to get every click + record the final number
        //     $("#TipAmount").html(user1.clicked);
        //     console.log($scope.tipClicked); 

        // }
       
    //});

    });

    tipApp.controller('mobileStartController', function($scope, $rootScope, $timeout, $state, $stateParams){
        $scope.userid = $stateParams.userid; 
        if(!$scope.userid){
            $state.go('start',{},{location:"replace"}); 
            return; 
        }

        $scope.notification = false; 

        console.log( "->user id from param:" + $stateParams.userid);
        console.log( "->user id from scope:" + $scope.userid);

        $scope.url = ''; 
        var db = firebase.firestore();

        
        //read current "user-1/clicked" value
        db.collection("participants")
          .doc($scope.userid)
          .get()
          .then( function(doc){
            $timeout(function(){
                $scope.data = doc.data(); 
                showNotification(doc);
                console.log($scope.data); 
                //showClickedButton(doc);
                findUrl($scope.data.switch);
            })
          });

 //Listen to user-1/* data changes
        db.collection("participants")
          .doc($scope.userid)
          .onSnapshot(function(doc){
            $timeout(function(){
                showNotification(doc);
            }, 10*1000);
          });

    //Read the user document data and write the clickd button value to the DOM
        function showNotification(doc){
            var userData = doc.data();
            console.log("IA : " + userData.IA); 
            console.log("device : " + userData.device);
            console.log("showMobile : " + userData.showMobile);
            console.log("notification: " + $scope.notification);
            $scope.notification = (userData.showMobile == 'on'); 
            console.log($scope.notification); 


        }




          $scope.pickURL = function(){
            $state.go($scope.url, {userid: $scope.userid});
            writeClickedButton('notification');
          }

        function writeClickedButton(val){
            var history; 
            history = $scope.data.history || [];
            history.push({clicked:val, IA:$scope.data.IA, device:$scope.data.device, showMobile:"off", timestamp:new Date().toLocaleString()}); 
        

             db.collection("participants")
              .doc($scope.userid)
              .set({
                clicked:val,
                IA:$scope.data.IA,
                device:$scope.data.device,
                switch:$scope.data.switch,
                // finalTip: "0", 
                showMobile: "off", 
                history: history
              });
        }

        function findUrl(urldata){
          switch (urldata){
            case 'am':
                $scope.url='ambiguous';
                console.log("url should be ambiguous: " + $scope.url); 
                break;
            case 'sm':
                $scope.url='tipjar';
                console.log("url should be tipjar: " + $scope.url);
                break;
            case 'bm':
                $scope.url='barista';
                console.log("url should be barista: " + $scope.url); 
                break; 
              case 'at':
            $scope.url='ambiguous';
            console.log("url should be ambiguous: " + $scope.url); 
            break;
        case 'st':
            $scope.url='tipjar';
            console.log("url should be tipjar: " + $scope.url);
            break;
        case 'bt':
            $scope.url='barista';
            console.log("url should be barista: " + $scope.url); 
            break; 
            default:
                $scope.url="start";
                break; 
          }
         }
    });

    

     tipApp.controller('mobile1ConfirmationController', function($scope, $rootScope, $timeout, $state, $stateParams) {
    

        $scope.userid = $stateParams.userid;
        console.log("userid: " + $scope.userid);
        var amount = parseFloat($scope.tip) + parseFloat(5); 
        $scope.finalAmount = amount.toFixed(2); 
        console.log($scope.finalAmount); 

        var db = firebase.firestore();

        //read current "user-1/clicked" value
        db.collection("participants")
          .doc($scope.userid)
          .get()
          .then( function(doc){
            $scope.data = doc.data(); 
            console.log($scope.data); 
            //findUrl($scope.data.switch); 
          });

       

        // $scope.pickURL = function(){
        //     $state.go($scope.url, {userid: $scope.userid}); 
        // }

        // function findUrl(urldata){
        //   switch (urldata){
        //     case 'am':
        //         $scope.url='ambiguous';
        //         console.log("url should be ambiguous: " + $scope.url); 
        //         break;
        //     case 'sm':
        //         $scope.url='tipjar';
        //         console.log("url should be tipjar: " + $scope.url);
        //         break;
        //     case 'bm':
        //         $scope.url='barista';
        //         console.log("url should be barista: " + $scope.url); 
        //         break; 
        //       case 'at':
        //     $scope.url='ambiguous';
        //     console.log("url should be ambiguous: " + $scope.url); 
        //     break;
        // case 'st':
        //     $scope.url='tipjar';
        //     console.log("url should be tipjar: " + $scope.url);
        //     break;
        // case 'bt':
        //     $scope.url='barista';
        //     console.log("url should be barista: " + $scope.url); 
        //     break; 
        //     default:
        //         $scope.url="start";
        //         break; 
        //   }
        //  }



    //Update user-1/clicked value
        function writeClickedButton(val){
        var history; 
        history = $scope.data.history || [];
        history.push({clicked:val, IA:$scope.data.IA, device:$scope.data.device, finalTip:"0", showMobile:"on", timestamp:new Date().toLocaleString()}); 
        

         db.collection("participants")
          .doc($scope.userid)
          .set({
            clicked:val,
            IA:$scope.data.IA,
            device:$scope.data.device,
            switch:$scope.data.switch,
            finalTip: "0", 
            showMobile: "on", 
            history: history
          });
        }


    //Add buttons click handlers
      //   $(function(){
      //     $("#Print").click(function(){
      //       writeClickedButton("print receipt");
      //     })
      //     $("#None").click(function(){
      //       writeClickedButton("no receipt");
      //   });
      // });
      $scope.printReceipt=function(){
        writeClickedButton("print receipt");
        $state.go("thanks");
      }

      $scope.noThanks=function(){
        writeClickedButton("no receipt");
        $state.go("thanks");
      }


    });

     tipApp.controller('thankyouController', function($scope, $rootScope, $timeout, $state, $stateParams) {

     }); 

