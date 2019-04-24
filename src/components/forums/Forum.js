import React from 'react';
import './Forum.css';
import CreateForum from './CreateForum';
import ForumSearch from './ForumSearch';
import ForumPosts from './ForumPosts';
import APIURL from '../../helpers/environment';

class Forum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        }
    }
    componentDidMount() {
        this.fetchForums();
    }
    toggleSearch = (e) => {
        e.preventDefault();
        if (!e.target.id) {
            this.fetchForums();
        } else {
            this.fetchSearch(e);
        }
    }

    fetchForums = () => {
        fetch(`${APIURL}/forum/`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            }
        })
            .then(result => result.json())
            .catch(err => console.log(err))
            .then(result => this.setState({ results: result }))
    }

    fetchSearch = (e) => {
        fetch(`${APIURL}/forum/search/${e.target.id}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application',
                "Authorization": this.props.token
            }
        })
            .then(result => result.json())
            .then(search => this.setState({ results: search }))

    }

    render() {
        //console.log(this.state.results)
        return (
            <div className='mainPage'>
                <div className='wrapper'>
                    <div className='mainForum'>
                        <ForumSearch toggleSearch={this.toggleSearch} />
                        <div className='forum'>
                            <CreateForum fetchForums={this.fetchForums} token={this.props.token} />
                            <ForumPosts userId={this.props.userId} results={this.state.results} token={this.props.token} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Forum;