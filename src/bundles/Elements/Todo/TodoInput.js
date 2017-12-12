import React, {Component} from 'react';

export default class TodoInput extends Component {

  constructor(props){
    super(props);
    this.state = {
      todoTitle: '',
      todoResponsible: '',
      todoDescription: '',
      todoPriority:'Lowest'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onAddTodo(this.state);
    this.setState({
      todoTitle: '',
      todoResponsible: '',
      todoDescription: '',
      todoPriority:'Lowest'
    })
  }

  render(){
    return(
      <div>
        <h4>Add new Comment</h4>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="inputTodoTitle" className="col-sm-2 form-control-label">Todo</label>
            <div className="col-sm-10">
              <input name="todoTitle"
                     type="text"
                     className="form-control"
                     id="inputTodoTitle"
                     value={this.state.todoTitle}
                     onChange={this.handleInputChange}
                     placeholder="Title"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputTodoResponsible" className="col-sm-2 form-control-label">Responsible</label>
            <div className="col-sm-10">
              <input name="todoResponsible"
                     type="text"
                     className="form-control"
                     id="inputTodoResponsible"
                     value={this.state.todoResponsible}
                     onChange={this.handleInputChange}
                     placeholder="Responsible"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputTodoDescription" className="col-sm-2 form-control-label">Description</label>
            <div className="col-sm-10">
                  <textarea name="todoDescription"
                            type="text"
                            className="form-control"
                            id="inputTodoDescription"
                            rows="3"
                            value={this.state.todoDescription}
                            onChange={this.handleInputChange}
                            placeholder="Description"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputTodoPriority" className="col-sm-2 form-control-label">Priority</label>
            <div className="col-sm-10">
              <select name="todoPriority"
                      className="form-control"
                      id="inputTodoPriority"
                      value={this.state.todoPriority}
                      onChange={this.handleInputChange}>
                <option>Lowest</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Highest</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-2"/>
            <div className="col-sm-10">
              <button type="submit" className="btn btn-success">Add comment</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
