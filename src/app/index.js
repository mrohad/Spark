var React = require('react');
var ReactDOM = require('react-dom');
import{Router, Route, browserHistory, Link} from 'react-router';

// Module requires
var ToDoItem = require('./todoItem');
var AddItem = require('./addItem');
var Pomodoro = require('./pomodoro');

//CSS requires
require('./css/index.css');

// Routing
var App = React.createClass({
    render: function(){
        return(
            <Router history={browserHistory}>
                <Route path={'/'} component={ToDoComponent}></Route>
                <Route path={'/pomodoro'} component={Pomodoro}></Route>
            </Router>
        );
    }
});

// Create component
var ToDoComponent = React.createClass({
    getInitialState: function(){
        return{
            todos: ['wash up', 'eat some cheese', 'take a nap','buy flowers']
        }
    }, // getInitialState
    render: function(){
        var todos = this.state.todos;
        todos = todos.map(function(item, index){
            return(<ToDoItem item={item} key={index} onDelete={this.onDelete} />);
        }.bind(this));
        return(
            <div id="todo-list">
                <Link to={'/pomodoro'}>Pomodoro</Link>
                <p>The busiest people have the most leisure...</p>
                <ul>{todos}</ul>
                < AddItem onAdd={this.onAdd} />
            </div>
        );
    }, // render

    // Custom Methods
    onDelete: function(item){
        var updatedTodos = this.state.todos.filter(function(val, index){
            return item !== val;
        });
        this.setState({
            todos: updatedTodos
        });
    },

    onAdd: function(item){
        var updatedTodos = this.state.todos;
        updatedTodos.push(item);
        this.setState({
            todos: updatedTodos
        })
    }
});

ReactDOM.render(<App />, document.getElementById('todo-wrapper'));