define(['react', 'showdown', 'jquery', 'jquery.timeago'], 
  function(React, Showdown, $) {

var converter = new Showdown.converter();
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var UserList = React.createClass({

  //could be optimized to render changes instead of pulling everything
  loadUsersFromServer: function(message) { 
    $.ajax({
      url: this.props.url,
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: this.props.data};
  },

  userWillMount: function() {
    var func = this.loadUsersFromServer;
    // Listen for Comet messages from Sails
    socket.on('user', function whenMessageRecevied(message) {
      console.log('New user message received :: ', message);
      func(message);
    });
  },

  render: function() {
    var url = this.props.url;
    var userNodes = this.state.data.reverse().map(function (user, index) {
      return (
        <User key={user.id} author={user.name} time={user.createdAt} url={url} userid={user.id}>
          {user.name}
        </User>);
    });
    return (
      <div className="commentList">
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {userNodes}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}); //UserList

var User = React.createClass({

  handleClick: function(e) {
    console.log('click occured ' + e + ' to ' + this.props.url);
    socket.delete(this.props.url + '/' + this.props.userid, function whenServerResponds(data) {
      console.log('Message deleted :: ', data);
    });  
  },

  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    var t = new Date(this.props.time);
    return (
      <div className="user">
        <hr />
        <h4 className="userName">{this.props.name} <small> user {$.timeago(t)}</small>
          <button type="button" className="close" aria-hidden="true" onClick={this.handleClick}>&times;</button>          
        </h4>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
}); //User


return UserList;


}); //define



