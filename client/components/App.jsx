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

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: {},
      drawer: false,
      toasts: []
    };

    this._alert = this._alert.bind(this);

    window.onhashchange = () => this.forceUpdate();
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
    if (!Object.keys(this.state.projects).length) return <div />;

    const props = {
      projects: this.state.projects,
      alert: this._alert
    },
    view = (() => {
      switch (location.hash.split('/')[1]) {
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
            <a href='#/network'>
              <ListItem
                leftIcon={<FontIcon>domain</FontIcon>}
                primaryText='Network'
              />
            </a>,
            <a href='#/contact'>
              <ListItem
                leftIcon={<FontIcon>contact_mail</FontIcon>}
                primaryText='Contact'
              />
            </a>,
            <a href='#/about'>
              <ListItem
                leftIcon={<FontIcon>info_outline</FontIcon>}
                primaryText='About Us'
              />
            </a>,
            <a href='#/advertise'>
              <ListItem
                leftIcon={<FontIcon>attach_money</FontIcon>}
                primaryText='Advertise'
              />
            </a>,
            <a href='#/documentation'>
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