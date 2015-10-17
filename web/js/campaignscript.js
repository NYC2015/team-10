var app = angular.module("rock",[]);
app.controller("rockController", function($scope) {
	$scope.title = "Shut Down Indian Point";
	$scope.status = "Active";
	$scope.created_date = "12/3/2015";
	//$scope.img = "http://placehold.it/750x500";
	$scope.img = "./images/indianpoint.png";
	$scope.description = "Built over 40 years ago, Indian Point Nuclear Plant is located 25 miles north of New York City on the Hudson River at the intersection of two earthquake faults, the Ramapo Fault and the Stamford-to-Peekskill Fault Line. Indian Point is also sited in the most populous location of any US nuclear plant, with 20 million people living or working within 50 miles of the plant, and experts say that evacuation plans are severely deficient. A catastrophic accident at Indian Point could kill tens of thousands, cause many more long-term cancers, and render NYC and much of the Hudson Valley uninhabitable. The Nuclear Regulatory Commission (NRC) is considering Entergy’s application to relicense Indian Point Reactors (IP) 2 & 3 which are operating under their original 40 year licenses, expiring in 2013 and 2015, respectively. Both IP2 and IP3 have been plagued with major safety problems for decades. As the reactors age, Indian Point will experience an increasing number of equipment and safety-related failures. As a recent explosion and shutdowns at Indian Point show, the plant’s aging reactors pose an unnecessary and unacceptable risk to New York City residents. In addition to its proximity to one of the largest metropolitan areas in the United States and being located on two significant fault lines, Indian Point has been rated the most vulnerable nuclear plant in the country to an earthquake-induced meltdown. It is also known to be a potential target for terrorism because of its proximity to NYC, presenting a tremendous security risk. A 2011 Natural Resources Defense Council report found a major accident at the plant could require the evacuation or sheltering of nearly 10 million people from radiation exposure (including most city residents) and render much of NYC too radioactively contaminated to live in. A 2004 Union of Concerned Scientists study determined the economic costs of an accident could be as high as $1.1 trillion, primarily because of the impact on NYC.";
	$scope.goals = ["Raise awareness for the risk of a nuclear catastrophe", "Prevent nuclear power plants from being developed in heavily urban areas in the future", "Reach 10,000 petition signers"];
	$scope.petitioner_pics = ["http://i.istockimg.com/image-zoom/60313996/3/380/293/zoom-60313996-3.jpg", "http://i.istockimg.com/image-zoom/60313996/3/380/293/zoom-60313996-3.jpg"];
	$scope.petitioner_number = 234;
	$scope.footer = "Team 10 & Rock The Earth 2015";
});
app.controller("tabsCtrl", function($scope) {
    $scope.tabs = [{
            title: 'Petition',
            url: 'petition.html'
        }, {
            title: 'Contributors',
            url: 'contributors.html'
        }, {
            title: 'Donate',
            url: 'donate.html'
		}, {
			title: 'Share',
			url: 'share.html'
    }];

    $scope.currentTab = 'petition.html';

    $scope.onClickTab = function (e) {
        //$(e.target).addClass('active_tab');
		$(e.target).css('background-color', 'white');
    };

    $scope.isActiveTab = function(e) {
		$(e.target).addClass('active_tab');

    };
});
app.controller("petition-controller", function( $scope ) {
	var myDataRef = new Firebase('https://blinding-heat-105.firebaseio.com');
	//var myDataRef = new Firebase('https://ugvkexm8jyc.firebaseio-demo.com/');
	myDataRef.on('child_added', function(snapshot) {
		var message = snapshot.val();
		displayChatMessage(message.name, message.text);
	});
	function displayChatMessage(name, text) {
		$('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
		$('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
	}
	$scope.addToDatabase = function( e ){
		if (e.keyCode == 13) {
			var name = $('#nameInput').val();
			var text = $('#messageInput').val();
			myDataRef.push({name: name, text: text});
			$('#messageInput').val('');
		}
	};
});

// Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    console.log("User is logged out");
  }
}

// Register the callback to be fired every time auth state changes
var ref = new Firebase('https://blinding-heat-105.firebaseio.com');
ref.onAuth(authDataCallback);
