requirejs.config({
    paths: {
      'react': '/bower_components/react/react-with-addons',
      'reactdom': '/bower_components/react/react-dom',
      'jquery': '/bower_components/jquery/dist/jquery',
      'jquery.timeago': '/bower_components/jquery-timeago/jquery.timeago',  
      'showdown': '/bower_components/showdown/compressed/Showdown',  
      'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap',
      'app': '/js'
    },

    shim: {
      'jquery.timeago': ["jquery"]
    }
});

require(['jquery', 'react', 'reactdom', 'app/UserForm', 'app/UserList'], 
  function ($, React, ReactDOM, UserForm, UserList) {


  $(function whenDomIsReady() {

      ReactDOM.render(
        <UserForm url='/user'/>,
        document.getElementById('userForm')
      );

      // as soon as this file is loaded, connect automatically, 
      var socket = io.sails.connect();
      
      console.log('Connecting to Sails.js...');

      // Subscribe to updates (a sails get or post will auto subscribe to updates)
      socket.get('/user', function (message) {
        console.log('Listening...' + message);

        // initialize the view with the data property
        ReactDOM.render(
          <UserList url='/user' data={message} />,
          document.getElementById('userList')
        );

      });

      // Expose connected `socket` instance globally so that it's easy
      // to experiment with from the browser console while prototyping.
      window.socket = socket;

  });
  

});