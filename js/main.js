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

         .state('confirmation', {
            url: '/confirmation',
            templateUrl: "templates/confirmationScreen.html", 
            controller: 'confirmationController'
         })

    });
   
    // create the controller and inject Angular's $scope
    tipApp.controller('mainController', function($scope, $rootScope) {
        //$scope.resume = "documents-forweb/HILAGUTFREUND-Website-resume-2018.pdf"; 
    });
    
    tipApp.controller('startController', function($scope, $rootScope) {


    });

    tipApp.controller('ambiguousController', function($scope) {
    });

    tipApp.controller('tipjarController', function($scope) {
    });

    tipApp.controller('confirmationController', function($scope) {
    });

