import React, {Component} from 'react';
import Calendar from "./CalendarEvents";


export default class CalendarContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async getEvents(){
    try{
      let response = await fetch('api/employers');
      let data = await response.json();
      return data;
    } catch (error){
      throw new Error('Не удалось получить данные');
    }
  }

  async componentWillMount() {
    let events = await this.getEvents();
    this.setState({
      employers: events.data
    });
  }

  render() {
    if (Object.keys(this.state).length === 0) return null;
    return (
      <div>
        <Calendar {...this.state}/>
      </div>
    );
  }
}