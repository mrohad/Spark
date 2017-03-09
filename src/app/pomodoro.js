var React = require('react');
import{Link} from 'react-router';

//CSS requires
// require('./css/pomodoro.css');

var Pomodoro = React.createClass({
    render: function(){
        return(
            <div>
                <Link to={'/'}>Back</Link>
                <h1>Hi</h1>
                <h3>Your Task is Say Hello</h3>
            </div>
        );
    } // render

    //Custom functions

});

module.exports = Pomodoro;