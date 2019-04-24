import React from 'react';
import {Button} from 'reactstrap';
import Radium from 'radium';

const styles = {
    contact: {
        paddingTop: '100px',
        height: '92vh',
    }
}

class Contact extends React.Component {
    render() {
        return (
            <div style={styles.contact} >
                <section id="contact">
                    <div  id="collapseExample">
                        <div className="card card-body">
                            <div className="container">
                                <br />
                                <br />
                                <h2 className="text-center text-uppercase">Contact</h2>
                                <div className="row-contact">
                                    <div className="col-12">
                                        <form action="https://formspree.io/rebekahmantlo@gmail.com" method="POST">
                                            <div className="control-group">
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input type="text" className="form-control" placeholder="Your Name" id="name" required
                                                        data-validation-required-message="Please enter your name" name="name" />
                                                    <p className="help-block text-danger"></p>
                                                </div>
                                            </div>
                                            <div className="control-group">
                                                <div className="form-group">
                                                    <label>Email Address</label>
                                                    <input type="email" className="form-control" placeholder="Your Email" id="email" required
                                                        data-validation-required-message="Please enter your email" name="_replyto" />
                                                    <p className="help-block text-danger"></p>
                                                </div>
                                            </div>
                                            <div className="control-group">
                                                <div className="form-group">
                                                    <textarea className="form-control" rows="7" placeholder="Your Message" id="message" required
                                                        data-validation-required-message="Please leave a message" name="message"></textarea>
                                                    <p className="help-block text-danger"></p>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div id="success"></div>
                                                <Button type="submit" className="btn btn-lg btn-black">
                                                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                                                    Send Message</Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Radium(Contact);