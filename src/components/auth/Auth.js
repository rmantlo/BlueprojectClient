import React from 'react';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div  >
                {this.props.login ? <Login exit={this.props.exit} setUserId={this.props.setUserId} setToken={this.props.setToken} /> : null}
                {this.props.signup ? <Signup exit={this.props.exit} setUserId={this.props.setUserId} setToken={this.props.setToken} /> : null}
            </div>
        )
    }
}

export default Auth;