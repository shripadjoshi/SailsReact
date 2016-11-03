define(['react'], function(React) {


var UserForm = React.createClass({
  
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.refs.name.value.trim();    
    this.onUserSubmit({name: name});
    return false;
  },

  onUserSubmit: function(user) {
    socket.post(this.props.url, user, function whenServerResponds(data) {
      console.log('Message posted :: ', data);
    });
  },

  render: function() {
    return (
      <form className="userForm" onSubmit={this.handleSubmit} role="form">
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" type="text" placeholder="Your name" ref="name" />
        </div>        
          <button type="submit" className="btn btn-default" value="Submit">Submit</button>
      </form>
    );
  }

}); //UserForm

return UserForm;

}); //define
