angular
  .module("app.routes", [])

  .config(function($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state("login", {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: "loginCtrl"
      })

      .state("participants", {
        url: "/selectPlayers",
        templateUrl: "templates/participants.html",
        controller: "participantsCtrl"
      })

      .state("addPlayer", {
        url: "/addPlayer",
        templateUrl: "templates/addPlayer.html",
        controller: "addPlayerCtrl"
      })

      .state("teams", {
        url: "/teams",
        templateUrl: "templates/teams.html",
        controller: "teamsCtrl"
      });

    $urlRouterProvider.otherwise("/login");
  });
