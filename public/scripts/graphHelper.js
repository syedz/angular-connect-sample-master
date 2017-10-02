/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/


// This sample uses an open source OAuth 2.0 library that is compatible with the Azure AD v2.0 endpoint. 
// Microsoft does not provide fixes or direct support for this library. 
// Refer to the library’s repository to file issues or for other support. 
// For more information about auth libraries see: https://azure.microsoft.com/documentation/articles/active-directory-v2-libraries/ 
// Library repo: http://adodson.com/hello.js/

"use strict";

(function () {
  angular
    .module('app')
    .service('GraphHelper', ['$http', function ($http) {

      // Initialize the auth request.
      hello.init( {
        aad: clientId // from public/scripts/config.js
        }, {
        redirect_uri: redirectUrl,
        scope: graphScopes
      });

      return {

        // Sign in and sign out the user.
        login: function login() {
          hello('aad').login({
            display: 'page',
            state: 'abcd'
          });
        },
        logout: function logout() {
          hello('aad').logout();
          delete localStorage.auth;
          delete localStorage.user;
        },

        // Get the profile of the current user.
        me: function me() {
          return graphClient.api('/me').get();
        },

        // Send an email on behalf of the current user.
        sendMail: function sendMail(email) {
          return graphClient.api('/me/sendMail').post({ 'message' : email, 'saveToSentItems': true });
        }
      }
    }]);
})();
