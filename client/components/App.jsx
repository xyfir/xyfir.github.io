import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { render } from 'react-dom';
import request from 'superagent';
import React from 'react';

// Components
import DocumentationList from 'components/documentation/List';
import DocumentationView from 'components/documentation/View';
import Advertise from 'components/pages/Advertise';
import Contact from 'components/pages/Contact';
import Network from 'components/pages/Network';
import About from 'components/pages/About';

// react-md
import ListItem from 'react-md/lib/Lists/ListItem';
import Snackbar from 'react-md/lib/Snackbars';
import Toolbar from 'react-md/lib/Toolbars';
import Drawer from 'react-md/lib/Drawers';
import Button from 'react-md/lib/Buttons/Button';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { projects: {}, drawer: false, toasts: [] };

    this._alert = this._alert.bind(this);
  }

  componentWillMount() {
    request
      .get(
        'https://raw.githubusercontent.com/Xyfir/Documentation/master/' +
        'projects.json'
      )
      .end((err, res) =>
        !err && this.setState({ projects: JSON.parse(res.text) })
      );
  }

  /**
   * Remove first element from toasts array.
   */
  onDismissAlert() {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }

  /**
   * Creates a 'toast' for react-md Snackbar component.
   * @param {string} message - The text content of the toast.
   */
  _alert(message) {
    this.setState({
      toasts: this.state.toasts.concat([{ text: message }])
    });
  }

  render() {
    if (!Object.keys(this.state.projects).length) return null;

    return (
      <main className='app'>
        <Toolbar
          colored
          className='toolbar'
          title='Xyfir'
          nav={
            <Button
              icon
              onClick={() => this.setState({ drawer: true })}
            >menu</Button>
          }
        />

        <Drawer
          onVisibilityToggle={v => this.setState({ drawer: v })}
          className='toolbar'
          autoclose={true}
          navItems={[
            <a href='#/network'>
              <ListItem primaryText='Network' />
            </a>,
            <a href='#/contact'>
              <ListItem primaryText='Contact' />
            </a>,
            <a href='#/about'>
              <ListItem primaryText='About Us' />
            </a>,
            <a href='#/advertise'>
              <ListItem primaryText='Advertise' />
            </a>,
            <a href='#/documentation'>
              <ListItem primaryText='Documentation' />
            </a>
          ]}
          visible={this.state.drawer}
          header={
            <Toolbar
              className='md-divider-border md-divider-border--bottom'
              colored
              nav={
                <Button
                  icon
                  onClick={() => this.setState({ drawer: false })}
                >arrow_back</Button>
              }
            />
          }
          type={Drawer.DrawerTypes.TEMPORARY}
        />

        {React.cloneElement(this.props.children, {
          projects: this.state.projects,
          alert: this._alert
        })}

        <Snackbar
          toasts={this.state.toasts}
          onDismiss={() => this.onDismissAlert()}
        />
      </main>
    );
  }

}

render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Network} />
      
      <Route path='about' component={About} />
      <Route path='network' component={Network} />
      <Route path='contact' component={Contact} />
      <Route path='advertise' component={Advertise} />
      
      <Route path='documentation' component={DocumentationList} />
      <Route
        path='documentation/:project/:doc'
        component={DocumentationView}
      />
    </Route>
  </Router>
), document.querySelector('#content'));