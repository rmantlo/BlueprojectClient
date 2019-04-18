import React, { Component } from 'react';
import './App.css';
//import Auth from './components/auth/Auth';
import NavBar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DefaultHome from './components/home/DefaultHome';
import HomePage from './components/home/HomePage';
import Profile from './components/profile/Profile';
import Forum from './components/forums/Forum';
import Footer from './components/footer/Footer';
import Contact from './components/contact/contact';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: '',

    }
  }
  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token })
    }
  }
  setSessionToken = (token) => {
    if (!token || token === undefined) {
      alert('incorrect user login')
    } else {
      localStorage.setItem('token', token);
      this.setState({ sessionToken: token })
    }
  }
  logout = () => {
    this.setState({ sessionToken: '' });
    localStorage.clear();
  }

  protectedViews = () => {
    if (this.state.sessionToken === localStorage.getItem('token')) {
      return (
        <Switch>
          <Route path='/' exact>
            <HomePage token={this.state.sessionToken} />
          </Route>
          <Route path='/profile' exact><Profile logout={this.logout} token={this.state.sessionToken} /></Route>
          <Route path='/forums' exact><Forum token={this.state.sessionToken} /></Route>
          <Route path='/contact' exact><Contact /></Route>
        </Switch>
      )
    } else {
      return (
        <Route path='/defaulthome' exact>
          <DefaultHome />
        </Route>
      )
    }
  }

  render() {
    //console.log(this.state.sessionToken);
    return (
      <div className="App">
        <Router>
          <NavBar sessionToken={this.state.sessionToken} setToken={this.setSessionToken} logout={this.logout} />
          {this.protectedViews()}
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
