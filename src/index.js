import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Content from "./bundles/Layout/Content/Content";

render(
  <MuiThemeProvider>
    <Content/>
  </MuiThemeProvider>,
  document.getElementById('root')
);
