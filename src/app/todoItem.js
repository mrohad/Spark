var React = require('react');
import{Link} from 'react-router';

// CSS requires
require('./css/todoItem.css');

// Create ToDoItem ToDoComponent
var ToDoItem = React.createClass({
    render: function(){
        return (
            <li>
                <div className="todo-item">
                    <span className="item-name">{this.props.item}</span>
                    <span className="item-remove" onClick={this.handleDelete}> x </span>
                </div>
            </li>
        );
    }, // render

    //Custom Methods
    handleDelete: function(){
        this.props.onDelete(this.props.item);
    }
});

module.exports = ToDoItem;