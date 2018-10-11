import 'github-markdown-css/github-markdown.css';
import '@xyfir/blog/dist/blog.css';
import 'styles/app.scss';

import {
  ListItem,
  FontIcon,
  Snackbar,
  Toolbar,
  Drawer,
  Button
} from 'react-md';
import { render } from 'react-dom';
import React from 'react';
import Blog from '@xyfir/blog';

// Components
import Documentation from 'components/pages/documentation/Documentation';
import Advertise from 'components/pages/Advertise';
import Contact from 'components/pages/Contact';
import Network from 'components/pages/Network';

// Modules
import AppMetadata from 'lib/AppMetadata';

// Constants
import { URL } from 'constants/config';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawer: false,
      toasts: []
    };

    this._alert = this._alert.bind(this);

    // Redirect from old hash routes to normal routes
    if (location.pathname == '/' && location.hash.startsWith('#/'))
      return location.replace(location.hash.substr(1));

    // Handle route changes from link clicks
    document.addEventListener('click', e => {
      const el =
        e.target.nodeName == 'A'
          ? e.target
          : e.path
            ? e.path.find(el => el.nodeName == 'A')
            : null;

      if (!el) return;
      if (!el.href.startsWith(URL)) return;
      if (e.ctrlKey || e.target.target == '_blank') return window.open(el.href);

      e.preventDefault();

      history.pushState({}, '', el.href);
      this.forceUpdate();
    });
    window.addEventListener('popstate', e => this.forceUpdate());
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
    AppMetadata.title = data.title;
    AppMetadata.description = data.description;
  }

  render() {
    const view = (() => {
      const paths = location.pathname.split('/');

      switch (paths[1]) {
        case 'documentation':
          return <Documentation App={this} />;
        case 'advertise':
          return <Advertise App={this} />;
        case 'contact':
          return <Contact App={this} />;
        case 'blog':
          return (
            <Blog
              post={paths.length == 6 ? paths.slice(2).join('/') : null}
              repository="Xyfir/blog-posts"
              linkFormat="/blog/{{post.id}}"
              titleFormat={['Blog – Xyfir', '{{post.title}} – Blog – Xyfir']}
              descriptionFormat={[
                'The Xyfir Network Blog.',
                '{{post.description}}'
              ]}
            />
          );
        case 'network':
        default:
          return <Network App={this} />;
      }
    })();

    return (
      <main className="app">
        <Toolbar
          colored
          className="toolbar"
          actions={[
            <Button
              icon
              onClick={() => (location.href = '/')}
              iconChildren="home"
            />
          ]}
          title="Xyfir"
          nav={
            <Button
              icon
              onClick={() => this.setState({ drawer: true })}
              iconChildren="menu"
            />
          }
        />

        <Drawer
          onVisibilityChange={v => this.setState({ drawer: v })}
          className="toolbar"
          autoclose={true}
          navItems={[
            <a href="/network">
              <ListItem
                leftIcon={<FontIcon>domain</FontIcon>}
                primaryText="Network"
              />
            </a>,
            <a href="/contact">
              <ListItem
                leftIcon={<FontIcon>contact_mail</FontIcon>}
                primaryText="Contact"
              />
            </a>,
            <a href="/advertise">
              <ListItem
                leftIcon={<FontIcon>attach_money</FontIcon>}
                primaryText="Advertise"
              />
            </a>,
            <a href="/documentation/">
              <ListItem
                leftIcon={<FontIcon>insert_drive_file</FontIcon>}
                primaryText="Documentation"
              />
            </a>,
            <a href="/blog/">
              <ListItem
                leftIcon={<FontIcon>mode_comment</FontIcon>}
                primaryText="Blog"
              />
            </a>
          ]}
          visible={this.state.drawer}
          header={
            <Toolbar
              className="md-divider-border md-divider-border--bottom"
              colored
              nav={
                <Button
                  icon
                  onClick={() => this.setState({ drawer: false })}
                  iconChildren="arrow_back"
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
