import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
      user_id: '',
    }
  }
  componentWillMount() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token })
    }
    if (userId && !this.state.user_id) {
      this.setState({ user_id: userId })
    }
  }

  setSessionToken = (token) => {
    if (!token || token === undefined) {
      alert('incorrect user login')
    } else {
      localStorage.setItem('token', token);
      this.setState({ sessionToken: token });
    }
  }
  setUserId = (userId) => {
    if (!userId || userId === undefined) {
      alert('something went wrong')
    } else {
      localStorage.setItem('userId', userId)
      this.setState({ user_id: userId })
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
          <Route onUpdate={() => window.scrollTo(0, 0)} path='/' exact>
            <HomePage token={this.state.sessionToken} />
          </Route>
          <Route onUpdate={() => window.scrollTo(0, 0)} path='/profile' exact><Profile userId={this.state.user_id} logout={this.logout} token={this.state.sessionToken} /></Route>
          <Route onUpdate={() => window.scrollTo(0, 0)} path='/forums' exact><Forum userId={this.state.user_id} token={this.state.sessionToken} /></Route>
          <Route path='/contact' exact><Contact /></Route>
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Redirect from='/profile' to='/' />
          <Redirect from='/forums' to='/' />
          <Route path='/' exact>
            <DefaultHome onUpdate={() => window.scrollTo(0, 0)} />
          </Route>
          <Route onUpdate={() => window.scrollTo(0, 0)} path='/contact' exact><Contact /></Route>
        </Switch>
      )
    }
  }


  render() {
    //console.log(this.state.user_id)
    //console.log(this.state.sessionToken);
    return (
      <div className="App">
        <Router>
          <NavBar showAuth={this.state.showAuth} setUserId={this.setUserId} sessionToken={this.state.sessionToken} setToken={this.setSessionToken} logout={this.logout} />
          {this.protectedViews()}
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
