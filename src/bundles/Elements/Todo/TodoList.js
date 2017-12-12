import React, {Component} from 'react';

export default class TodoList extends Component {

  constructor(props){
    super(props);
  }

  removeTodo(index){
    this.props.onRemove(index);
  }

  render(){
    const todos = this.props.data;
    return(
      <ul className="list-group">
        {todos.map((todo, index) =>
          <li className="list-group-item" key={index}>
            <div className="w-100"><h5 className="list-group-item-heading d-inline-block">{todo.todoTitle}</h5><small><span className="label badge-info">{todo.todoPriority}</span></small></div>
            <p className="w-100"><span className="fa fa-user"/> {todo.todoResponsible}</p><br/>
            <p className="w-100">{todo.todoDescription}</p>

            <button className="btn btn-danger btn-sm" onClick={this.removeTodo.bind(this, index)}><i className="fa fa-remove" /> Delete</button>
          </li>
        )}
      </ul>
    )
  }
}
