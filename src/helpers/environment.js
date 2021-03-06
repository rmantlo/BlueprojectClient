//this file is used to determine if the connected server is running locally or not, and set url accordingly

let APIURL = '';
switch(window.location.hostname){
    //running locally
    case 'localhost' || '127.0.0.1' :
    APIURL = 'http://localhost:3000'
    break;

    //running on heroku
    //case is heroku url of client
    case 'medicalconnectclient.herokuapp.com' :
    //set url to heroku server url
    APIURL = 'https://medicalconnect.herokuapp.com'

}
export default APIURL;