import {
  ListItem, FontIcon, Snackbar, Toolbar, Drawer, Button
} from 'react-md';
import { render } from 'react-dom';
import request from 'superagent';
import React from 'react';

// Components
import XyfirMarketForm from 'components/pages/XyfirMarketForm';
import Documentation from 'components/pages/documentation/Documentation';
import Advertise from 'components/pages/Advertise';
import Contact from 'components/pages/Contact';
import Network from 'components/pages/Network';
import About from 'components/pages/About';

// Modules
import AppMetadata from 'lib/AppMetadata';

// Constants
import { URL } from 'constants/config';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: {},
      drawer: false,
      toasts: []
    };

    this._alert = this._alert.bind(this);

    // Redirect from old hash routes to normal routes
    if (location.pathname == '/' && location.hash.startsWith('#/'))
      return location.replace(location.hash.substr(1));

    // Handle route changes from link clicks
    document.addEventListener('click', e => {
      const el = e.target.nodeName == 'A'
        ? e.target : e.path
        ? e.path.find(el => el.nodeName == 'A') : null;

      if (!el)
        return;
      if (!el.href.startsWith(URL))
        return;
      if (e.ctrlKey || e.target.target == '_blank')
        return window.open(el.href);

      e.preventDefault();

      history.pushState({}, '', el.href);
      this.forceUpdate();
    });
    window.addEventListener('popstate', e => this.forceUpdate());
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

  /**
   * @typedef {object} AppMetadataValue
   * @prop {string|string[]} title
   * @prop {string} [description]
   */
  /** @param {AppMetadataValue} data */
  set meta(data) {
    AppMetadata.title = data.title,
    AppMetadata.description = data.description;
  }

  render() {
    if (!Object.keys(this.state.projects).length) return null;

    const props = {
      projects: this.state.projects,
      alert: this._alert,
      App: this
    },
    view = (() => {
      switch (location.pathname.split('/')[1]) {
        case 'documentation': return <Documentation {...props} />
        case 'advertise': return <Advertise {...props} />
        case 'contact': return <Contact {...props} />
        case 'market': return <XyfirMarketForm {...props} />
        case 'about': return <About {...props} />
        case 'network':
        default:
          return <Network {...props} />
      }
    })();

    return (
      <main className='app'>
        <Toolbar
          colored
          className='toolbar'
          actions={[
            <Button
              icon
              onClick={() => location.href = '/'}
              iconChildren='home'
            />
          ]}
          title='Xyfir'
          nav={
            <Button
              icon
              onClick={() => this.setState({ drawer: true })}
              iconChildren='menu'
            />
          }
        />

        <Drawer
          onVisibilityChange={v => this.setState({ drawer: v })}
          className='toolbar'
          autoclose={true}
          navItems={[
            <a href='/network'>
              <ListItem
                leftIcon={<FontIcon>domain</FontIcon>}
                primaryText='Network'
              />
            </a>,
            <a href='/contact'>
              <ListItem
                leftIcon={<FontIcon>contact_mail</FontIcon>}
                primaryText='Contact'
              />
            </a>,
            <a href='/about'>
              <ListItem
                leftIcon={<FontIcon>info_outline</FontIcon>}
                primaryText='About Us'
              />
            </a>,
            <a href='/advertise'>
              <ListItem
                leftIcon={<FontIcon>attach_money</FontIcon>}
                primaryText='Advertise'
              />
            </a>,
            <a href='/documentation'>
              <ListItem
                leftIcon={<FontIcon>insert_drive_file</FontIcon>}
                primaryText='Documentation'
              />
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
                  iconChildren='arrow_back'
                />
              }
            />
          }
          type={Drawer.DrawerTypes.TEMPORARY}
        />

        {view}

        <Snackbar
          toasts={this.state.toasts}
          onDismiss={() => this.onDismissAlert()}
        />
      </main>
    );
  }

}

render(<App />, document.querySelector('#content'));