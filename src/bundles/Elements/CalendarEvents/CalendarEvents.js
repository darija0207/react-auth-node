import React, {Component} from 'react';
import moment from "moment";
import BigCalendar from 'react-big-calendar';
import ToolbarEvents from "./ToolbarEvents";

let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k]);

const DEFAULT_VIEW = 'month';
const API_GET_DATE_FORMAT = 'YYYY-MM-DD';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    let data = this.props;
    this.state = {
      events: data,
      current_date: moment().endOf(DEFAULT_VIEW),
      current_view: DEFAULT_VIEW,
      filterEvents: this.updateEvents(),
      selectEmployer: this.updateEvents(),
      onSelect: false,
      reset: false
    };

    this.bindScopes([
      'handleReset',
      'handleSelect',
      'onView',
      'onNavigate',
      'updateTimes',
      'timesToEvents',
    ]);
  }

  bindScopes(keys) {
    for (let key of keys) {
      this[key] = this[key].bind(this);
    }
  }

  componentWillMount() {
    moment.updateLocale('en', {
      week: {dow: 1}
    });
    BigCalendar.setLocalizer(
      BigCalendar.momentLocalizer(moment)
    );
    this.updateTimes();
  }

  componentDidMount() {
    this.handleName();
  }

  handleName() {
    let events = this.props;
    Object.keys(events).map((val) => {
      events[val].map(item => {
        let name = item.employee.firstName;
        let lastname = item.employee.lastName;
        this.setState({events: Object.assign(item, {'fullName': name + ' ' + lastname})});
      });
    });
  }

  onView(view) {
    this.setState({
      current_view: view,
    });
    this.updateTimes(this.state.current_date, view);
  }

  onNavigate(date, view) {
    const new_date = moment(date);
    this.setState({
      current_date: new_date
    });
    this.updateTimes(new_date, view);
  }

  updateTimes(date = this.state.current_date, view = this.state.current_view) {
    let start, end;
    if (view === 'day') {
      start = moment(date).startOf('day');
      end = moment(date).endOf('day');
    }
    else if (view === 'week') {
      start = moment(date).startOf('isoWeek');
      end = moment(date).endOf('isoWeek');
    }
    else if (view === 'month') {
      start = moment(date).startOf('month');
      end = moment(date).endOf('month');
    }
    else if (view === 'agenda') {
      start = moment(date).startOf('day');
      end = moment(date).endOf('day').add(1, 'month');
    }
    this.timesToEvents([moment(start).format(API_GET_DATE_FORMAT), moment(end).format(API_GET_DATE_FORMAT)]);
  }

  timesToEvents(times) {
    let events = this.props;
    const filtEvents = Object.keys(events).map((val) => {

      let filt = events[val].filter(item => moment(item.dateFrom).format(API_GET_DATE_FORMAT) >= times[0] &&
        moment(item.dateFrom).format(API_GET_DATE_FORMAT) <= times[1] ||
        moment(item.dateTo).format(API_GET_DATE_FORMAT) >= times[0] &&
        moment(item.dateTo).format(API_GET_DATE_FORMAT) <= times[1]);

      filt.sort((a, b) => {
        if (a.employee.firstName > b.employee.firstName) {
          return 1;
        }
        else if (a.employee.firstName == b.employee.firstName) {
          return 0;
        }
        else {
          return -1;
        }
      });
      return filt;
    });

    this.updateEvents(filtEvents);
    this.setState({
      filterEvents: filtEvents
    });
  }

  updateEvents(event) {
    return event;
  }

  handleSelect(selectValue) {
    this.onSelect = true;
    this.updateEvents(selectValue);
    this.setState({
      reset: false,
      selectEmployer: [selectValue]
    });
  };

  handleReset() {
    this.setState({reset: true});
  }

  render() {
    let filtEvents = this.state.filterEvents;
    let selectEvents = this.state.selectEmployer;
    return (
      <div className="container">
        <ToolbarEvents events={filtEvents[0]} onSelectEmployer={this.handleSelect} onHandleReset={this.handleReset}/>
        <BigCalendar
          events={!this.onSelect || this.state.reset ? filtEvents[0] : selectEvents}
          popup
          titleAccessor={(event) => event.fullName}
          startAccessor={(event) => moment(event.dateFrom).toDate()}
          endAccessor={(event) => moment(event.dateTo).toDate()}
          onNavigate={this.onNavigate}
          onView={this.onView}
        />
      </div>
    )
  }
}

