import React from 'react';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';
import Radium from 'radium';

const styles = {
    modal: {
        background: 'white',
        border: '2px solid lightgrey',
        borderRadius: '20px',
        boxShadow: '2px 2px 2px',
        width: '20vw',
        left: 0,
        right: 0,
        marginTop: '100px',
    }
}

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div style={styles.modal} className='auth' >
                {!this.props.signup ? <Login setToken={this.props.setToken} /> : null}
                {this.props.signup ? <Signup setToken={this.props.setToken} /> : null}
            </div>
        )
    }
}

export default Radium(Auth);