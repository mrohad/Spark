var React = require('react');
var ReactDOM = require('react-dom');

// Module requires
// var TableItem = require('./tableItem');

//CSS requires
// TODO - decide how to 
// require('./css/index.css'); 

// Create component
var TableComponent = React.createClass({
    getInitialState: function(){
        return{
            todos: ['wash up', 'eat some cheese', 'take a nap','buy flowers']
        }
    }, // getInitialState
    render: function(){
        // var todos = this.state.todos;
        // todos = todos.map(function(item, index){
        //     return(<ToDoItem item={item} key={index} onDelete={this.onDelete} />);
        // }.bind(this));
        return(
            <table className="table table-stripped table-hover">
                <thead>
                    <tr className="headers">
                        <th>#</th>
                        <th className="camp_name_en">Camp Name</th>
                        <th className="contact_person">Contact Person</th>
                        <th className="status">Camp Status</th>
                        <th className="published">Published</th>
                        <th className="facebook_page_url">Facebook</th>
                        <th className="admin-edit">Edit</th>
                        <th className="admin-remove">Remove</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        );
    }, // render

    // Custom Methods
    // onDelete: function(item){
    //     var updatedTodos = this.state.todos.filter(function(val, index){
    //         return item !== val;
    //     });
    //     this.setState({
    //         todos: updatedTodos
    //     });
    // },

    // onAdd: function(item){
    //     var updatedTodos = this.state.todos;
    //     updatedTodos.push(item);
    //     this.setState({
    //         todos: updatedTodos
    //     })
    // }
});

ReactDOM.render(<TableComponent />, document.getElementById('camps-stats-table'));