import React from 'react';
import Error from "./session_errors";


class SessionForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {username: "", password: ""};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.update.bind(this);
  }

  componentDidMount(){
    if(this.props.demo){
      this.loginUser(this.props.demo)
    }
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

  loginUser(user){
    const username = user.username;
    const password = user.password;
    const typeSpeed = 100;
    let i = 0;
    let j = 0;
    const userInterval = setInterval(() => {
      this.setState({username: this.state.username + username[i]});
      i++;
    }, typeSpeed);
    setTimeout(() => {
      clearInterval(userInterval);
      const passInterval = setInterval(() => {
        this.setState({password: this.state.password + password[j]});
        j++;
      }, typeSpeed);
      setTimeout(() => {
        clearInterval(passInterval);
        this.props.action(this.state);
      }, typeSpeed * password.length);
    }, typeSpeed * username.length);
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }



  render() {
    return (
      <div className="session-form">
        <div id="session-img">
          <img src="images/form_half.png"/>
        </div>
        <div className="form-side">
          <div className="session-form-container">
            <h2>Welcome to Robinhood</h2>
            <form onSubmit={this.handleSubmit}>
              <label><div>Email or Username</div>
                <input className="text-input" required type="text" value={this.state.username} onChange={this.update("username")} />
              </label>
              <label><div>Password</div>
                <input className="text-input" required type="password" value={this.state.password} onChange={this.update("password")} />
              </label>
              <div id="error-container" className={this.props.errors.length > 0 ? "grow" : ""}>
                {this.props.errors.map((error, i) => <Error key={i} error={error}/>)}
              </div>
              <input className="submit-button" type="submit" value={this.props.formType}/>
            </form>
          </div>
        </div>
      </div>
      
    )
  }
}

export default SessionForm;