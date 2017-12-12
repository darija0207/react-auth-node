import React, {Component} from 'react';
import Header from "../../Layout/Header/Header";
import TodoInput from "../../Elements/Todo/TodoInput";
import todos from "../../../../data/todo";
import TodoList from "../../Elements/Todo/TodoList";

export default class BlogPageContainer extends Component{

  constructor(props){
    super(props);
    this.state = {
      todos
    };

    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }


  handleAddTodo(todo){
    this.setState({todos: [...this.state.todos, todo]})
  }

  handleRemove(index) {
    this.setState({todos: this.state.todos.filter((e, i) => i !== index)})
  }

  render(){
    return(
      <div>
        <Header/>
        <div className="container">
          <h2 className="text-center">Blog Page</h2>
          <TodoInput onAddTodo={this.handleAddTodo}/>
          <hr/>
          <h4>Comments: <span className="text-white badge-default">{this.state.todos.length}</span></h4>
          <TodoList data={this.state.todos} onRemove={this.handleRemove}/>
        </div>
      </div>
    )
  }
}
