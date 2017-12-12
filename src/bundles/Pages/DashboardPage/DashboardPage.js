import React, {Component} from 'react';
import CalendarContainer from "../../Elements/CalendarEvents/CalendarContainer";
import {Redirect} from "react-router";
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import {List, RaisedButton} from "material-ui";
import FileFolder from 'material-ui/svg-icons/file/folder';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Drawer from 'material-ui/Drawer';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import ActionGrade from 'material-ui/svg-icons/action/grade';

export default class UserDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.location.state.user,
      token: this.props.location.state.token,
      isAuthenticated: true,
      open: false
    }
  }

  handleToggle = () => this.setState({open: !this.state.open});

  logout = () => {
    localStorage.removeItem('token');
    this.setState({
      user: null,
      token: '',
      isAuthenticated: false
    });
  };

  render() {
    const Logged = (props) => (
      <div>
        <Badge
          className="notification"
          badgeContent={5}
          secondary={true}
        >
          <IconButton tooltip="Notifications">
            <NotificationsIcon/>
          </IconButton>
        </Badge>
        <IconMenu
          {...props}
          iconButtonElement={
            <IconButton><MoreVertIcon/></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Refresh"/>
          <MenuItem primaryText="Help"/>
          <MenuItem primaryText="Sign out" onClick={this.logout}/>
        </IconMenu>
      </div>
    );
    return (
      <div>
        {!this.state.isAuthenticated ? (<Redirect to={{
          pathname: '/login'
        }}/>) : (
          <div>
            <Drawer open={this.state.open}>
              <AppBar
                title="Settings"
                onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
                iconElementLeft={<IconButton><NavigationClose/></IconButton>}
              />
              <List>
                <Subheader>Nested List Items</Subheader>
                <ListItem primaryText="Sent mail" leftIcon={<ContentSend/>}/>
                <ListItem primaryText="Drafts" leftIcon={<ContentDrafts/>}/>
                <ListItem
                  primaryText="Inbox"
                  leftIcon={<ContentInbox/>}
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem
                      key={1}
                      primaryText="Starred"
                      leftIcon={<ActionGrade/>}
                    />,
                    <ListItem
                      key={2}
                      primaryText="Sent Mail"
                      leftIcon={<ContentSend/>}
                      disabled={true}
                      nestedItems={[
                        <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts/>}/>,
                      ]}
                    />,
                    <ListItem
                      key={3}
                      primaryText="Inbox"
                      leftIcon={<ContentInbox/>}
                      open={this.state.open}
                    />,
                  ]}
                />
              </List>
            </Drawer>
            <AppBar
              className="app-bar"
              title="Dashboard"
              onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
              iconElementRight={<Logged/>}
            />
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-7 col-sm-12">
                  <List>
                    <ListItem
                      disabled={true}
                      leftAvatar={
                        <Avatar icon={<FileFolder/>}/>
                      }>
                      <b> {this.state.user} </b>
                    </ListItem>
                  </List>
                </div>
                <div className="col-md-5 col-sm-12 text-right">
                  <RaisedButton onClick={this.logout} label="Logout" primary={true}/>
                </div>
              </div>
              <h2 className="text-center title">Welcome to Calendar!</h2>
              <CalendarContainer/>
            </div>
          </div>
        )
        }
      </div>
    )
  }
}