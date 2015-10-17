var mainApp = angular.module("mainApp", ['ngRoute']);
         
mainApp.controller('eventController', function($scope) {
	$scope.message = "This page will be used to display add student form";
});      
mainApp.controller('somethingController', function($scope) {
	$scope.message = "This page will be used to display all the students";
});

mainApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/event', {
	  templateUrl: 'event.html', controller: 'eventController'
	}).
	when('/something', {
	  templateUrl: 'something.html', controller: 'somethingController'
	}).
	otherwise({
	  redirectTo: 'index.html'
	});
	
}]);
//var myDataRef = new Firebase('https://blinding-heat-105.firebaseio.com');
var myDataRef = new Firebase('https://ugvkexm8jyc.firebaseio-demo.com/');
$('#messageInput').keypress(function (e) {
	if (e.keyCode == 13) {
		var name = $('#nameInput').val();
		var text = $('#messageInput').val();
		myDataRef.push({name: name, text: text});
		$('#messageInput').val('');
	}
});
myDataRef.on('child_added', function(snapshot) {
	var message = snapshot.val();
	displayChatMessage(message.name, message.text);
});
function displayChatMessage(name, text) {
	$('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
	$('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};
