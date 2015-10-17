var app = angular.module( "Demo", [] );
app.controller(
	"AppController",
	function( $scope ) {
		// I flag the visibility of the big box.
		$scope.isBoxVisible = true;
		// Build up a large set of images, all with unique
		// SRC values so that the browser cannot cache them.
		$scope.photos = buildPhotoSet( 200 );
		// I clear the current photo set.
		$scope.clearPhotos = function() {
			$scope.photos = [];
		};
		$scope.hideBox = function() {
			$scope.isBoxVisible = false;
		};
		$scope.rebuildSet = function() {
			$scope.photos = buildPhotoSet( 20 );
		};
		$scope.addToDatabase = function( e ){
			if (e.keyCode == 13) {
				var name = $('#nameInput').val();
				var text = $('#messageInput').val();
				myDataRef.push({name: name, text: text});
				$('#messageInput').val('');
			}
		};
		function buildPhotoSet( size ) {
			var photos = [];
			for ( var i = 0 ; i < size ; i++ ) {
				if (i == 0) {
					photos.push({
						src: ("img/indianpoint.png"),
						href: ("./views/campaign.html")
					});
				} else if(i == 1) {
					photos.push({
						src: ("img/yosemite.jpg"),
						href: ("./views/campaign.html")
					});
				} else {
					photos.push({
						src: ( "img/204.jpg"),
						href: ( "./views/campaign.html")
					});
				}
			}
			return( photos );
		}
	}
);

var myDataRef = new Firebase('https://blinding-heat-105.firebaseio.com');
//var myDataRef = new Firebase('https://ugvkexm8jyc.firebaseio-demo.com/');
/*
myDataRef.on('child_added', function(snapshot) {
	var message = snapshot.val();
	displayChatMessage(message.name, message.text);
});
function displayChatMessage(name, text) {
	$('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
	$('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};
*/
