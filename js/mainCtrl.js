var app = angular.module('chatroom');

app.controller('mainCtrl', function($scope, parseService){
    var vm = this;
    //In your controller you'll have a getParseData function and a postData function, but should be placed on $scope.
  
    //The getParseData function will call the getData method on the parseService object. You'll then save the result of that request to 
    //your controllers $scope as messages ($scope.messages)
    function applyRemoteData(newMessages) {
        vm.messages = newMessages.results;
    }
    vm.getParseData = function() {
        parseService.getData().then(function(response) {
            applyRemoteData(response);
        });
    };
    vm.getParseData();
    
    //The postData function will take whatever the user typed in (hint: look at the html and see what ng-model correlates to on the input box),
    //pass that text to the postData method on the parseService object which will then post it to the parse backend.
    vm.postData = function() { 
        parseService.postData(vm.message).then(vm.getParseData, function(errorMessage) {
            console.warn(errorMessage);
        });
        
        vm.message = "";
    };
    
    vm.test = function(data) {
        console.log(data);
    };
    
    
    //uncomment this code when your getParseData function is finished
    //This goes and gets new data every second, which mimics a chat room experience.
    setInterval(function(){
        vm.getParseData();
    }, 1500);
    
    vm.getClass = function(even, index) {
        var result = "message-box";
        
        // alternating rows, assigning different classes for colors
        if (even) {
          result += " evens";
        } else result += " odds";
        
        // selecting the last and first message boxes to round the corners
        if (index === 0) {
          result += " first";
        } else if (index === vm.messages.length - 1) {
          result += " last";
        }
        
        return result;
    };
    
    // vm.
});
