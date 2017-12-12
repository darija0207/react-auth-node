import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import {SelectField} from "material-ui";

export default class ToolbarEvents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reset: false,
      getDefaultProps() {
        return {
          value: 'Select an employer',
        }
      }
    };
  }

  resetEvents = () => {
    this.setState({
      reset: true,
      value: this.props.value
    });
    this.props.onHandleReset(this.state.reset);
  };

  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.onSelectEmployer(this.props.events[index]);
  };

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <SelectField
            className="select-employers"
            floatingLabelText="Select an employer"
            floatingLabelStyle={{
              top: 18,
              lineHeight: '30px'
            }}
            value={this.state.value}
            onChange={this.handleChange}
          >
            {this.props.events.map((val, index) => {
              return <MenuItem className="select-item" key={index} value={val.fullName} primaryText={val.fullName}/>
            })}
          </SelectField>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator/>
          <RaisedButton label="Reset List" primary={true} onClick={this.resetEvents}/>
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon/>
              </IconButton>
            }
          >
            <MenuItem primaryText="Download"/>
            <MenuItem primaryText="More Info"/>
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}