import React from 'react';
import './DefaultHome.css';

class DefaultHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className='mainPage'>
                <div className='jumbotron'>
                <h1>Medical Connect</h1>
                </div>
                <div className='wrapper'>
                    <div className='siteDescription'>
                        <h2>Our Mission</h2>
                        <p>There are countless social media out floating in the web for people to communicate as well as many resources of articles exploring scientific innovation. But nothing built just for people to actively communicate and share these miracles without it getting lost in a wave of celebaties and self obsession. So this site's future is to be a useful place for people to share new or interest science and have a conversation with other interested parties. Share something that touches your life personally to bring forth information that may help others.</p>
                        <h3>My Story</h3>
                        <p>I have always had a love of science, biology and computer science in particular. So sharing information about things that interest me with people who would also enjoy it would be amazing. I also have many health issues, and to be able to find and look into new innovative health research and studies would be benificial to me personally, and to share would benefit others with the same issues, or just to help educate my family and friends.</p>

                    </div>
                </div>
            </div>
        )
    }
}
export default DefaultHome;