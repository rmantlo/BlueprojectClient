import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import Radium from 'radium';
import APIURL from '../../helpers/environment';

const styles = {
    a: {
        color: 'purple',
        textDecorationLine: 'none',
        ":hover": {
            textDecorationLine: 'underline',
            color: 'purple',
        }
    }
}
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    }
    componentDidMount() {
        this.fetchOne();
    }

    fetchOne = () => {
        fetch(`${APIURL}/forum/mostrecent`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            }
        })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(data => { this.setState({ results: data }) })
    }

    render() {
        return (
            <div className='mainPage'>
                <div className='jumbotron'>
                    <h1>Medical Connect</h1>
                </div>
                <div className='wrapper'>
                    <div className='siteDescription'>
                        <h3 className='homePageh3'>Most recent post</h3>
                        <div className='forumLink'>
                            <Link to='forums' className='homeLink'>
                                {this.state.results.map(result => {
                                    return (
                                        <div className='homeForum' key={result.id}>
                                            <h3 style={styles.text} key={result.title}>{result.title}</h3>
                                            <p key={result.forumMessage}>{result.forumMessage}</p>
                                            <a style={styles.a} href={result.url}>{result.url}</a>
                                        </div>
                                    )
                                })}
                            </Link>
                        </div>
                        <h2>Our mission</h2>
                        <p>There are countless social media out floating in the web for people to communicate as well as many resources of articles exploring scientific innovation. But nothing built just for people to actively communicate and share these miracles without it getting lost in a wave of celebaties and self obsession. So this site's future is to be a useful place for people to share new or interest science and have a conversation with other interested parties. Share something that touches your life personally to bring forth information that may help others.</p>
                        <h3>Site updates</h3>
                        <p>Added keywords for forum posts and a search function to search by those key words. Added an edit post option from the profile page, as well as a delete post. delete account button has a confirmation warning pop up to continue with account deletion. future updates include commenting functions. fixed updating issue allowing only one update at a time. added user post deletion when user account is deleted.</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Radium(HomePage);