import React from 'react';


class SessionForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {username: "", password: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.update.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state);
  }

  update(field){
    return e => {
      this.setState({[field]: e.target.value});
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Username: <input type="text" value={this.state.username} onChange={this.update("username")} />
        Password: <input type="password" value={this.state.password} onChange={this.update("password")} />
        <input type="submit" value={this.props.formType}/>
      </form>
    )
  }
}

export default SessionForm;