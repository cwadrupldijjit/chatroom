/* global angular */
var app = angular.module('chatroom');

app.service('parseService', function($http, $q){
  //Here you'll need to create two methods. One called postData and the other called getData.
  
  // this.postData = function(message) {
  //   var request = $http({
  //     method: 'POST',
  //     url: 'https://api.parse.com/1/classes/chat',
  //     params: {
  //       action: 'add'
  //     },
  //     data: {text: message}
  //   });
    
  //   return (request.then(handleSuccess, handleFailure));
  // };
  
  this.postData = function(message) {
    var request = $http.post('https://api.parse.com/1/classes/chat', {text: message});
    
    return(request.then(handleSuccess, handleFailure));
  }
  
  
  //On the lines below create a getData method. This method will retrieve data from the parse backend.
  //The url for the get request should be 'https://api.parse.com/1/classes/chat?order=-createdAt'
  //Be sure to return whatever gets returned from $http so you can call .then in your controller.
  
  
  // this.getData = function() {
  //   var request = $http({
  //     method: 'GET',
  //     params: {
  //       action: 'get'
  //     },
  //     url: 'https://api.parse.com/1/classes/chat?order=-createdAt'
  //   });
    
  //   return(request.then(handleSuccess, handleFailure));
  // }
  
  
  this.getData = function() {
    var request = $http.get('https://api.parse.com/1/classes/chat?order=-createdAt');
    
    return(request.then(handleSuccess, handleFailure));
  }
  
  
  //On the line below create the postData method. This method will add data to the parse backend.
  //The url for the request needs to be 'https://api.parse.com/1/classes/chat'
  //Because we're making a POST request, we need a way to tell parse the data we want to give it, 
    //in your $http call (along with url and method) have a data property which has a value that is equal to another object which a key of text and a value of the message being passed to parse. IE data: {text: yourMessage} 
  //Also, remember that $http returns a promise. So if you return the whole $http call (return $http(...)), you can then use .then in your controller.
  function handleSuccess(response) {
    return response.data;
  }
  
  function handleFailure(response) {
    if (!angular.isObject(response.data) || !response.data.message) {
      return $q.reject("An unknown error occurred");
    }
    
    return ($q.reject(response.data.message)); 
  }
});
