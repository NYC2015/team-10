var app = angular.module( "Demo", [] );
app.controller(
	"AppController",
	function( $scope ) {
		// Create a callback to handle the result of the authentication
		function authHandler(error, authData) {
		  if (error) {
			console.log("Login Failed!", error.code);
		  } else {
			console.log("Authenticated successfully with payload:", authData);
		  }
		}
		$scope.loginFacebook = function() {
			myDataRef.authWithOAuthPopup("facebook", authHandler);
		}

	}
);

var myDataRef = new Firebase('https://blinding-heat-105.firebaseio.com');



