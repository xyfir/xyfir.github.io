import React from "react";
import { render } from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

injectTapEventPlugin();

// Modules
import request from "lib/request";

// Constants
import { URL, XACC } from "constants/config";

// Components
import About from "components/pages/About";
import Contact from "components/pages/Contact";
import Network from "components/pages/Network";
import DocumentationList from "components/documentation/List";
import DocumentationView from "components/documentation/View";

// Material UI Components
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = { projects: {}, drawer: false };
    }

    componentWillMount() {
        const url = "https://api.github.com/repos/Xyfir/Documentation/contents/"
            + "projects.json";

        request(url, (res) => {
            this.setState({
                projects: JSON.parse(window.atob(res.content))
            });
        });
    }

    onCloseDrawer() {
        this.setState({ drawer: false });
    }

    render() {
        if (!Object.keys(this.state.projects).length) return <div />;

        return (
            <main className="app">
                <AppBar
                    title="Xyfir"
                    className="app-bar"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={() =>
                        this.setState({ drawer: true })
                    }
                />

                <Drawer
                    open={this.state.drawer}
                    docked={false}
                    className="drawer"
                    onRequestChange={drawer => this.setState({ drawer })}
                >
                    <AppBar
                        className="app-bar"
                        onLeftIconButtonTouchTap={() =>
                            this.setState({ drawer: false })
                        }
                    />

                    <a href="#/network">
                        <MenuItem onTouchTap={() => this.onCloseDrawer()}>
                            Network
                        </MenuItem>
                    </a>
                    <a href="#/contact">
                        <MenuItem onTouchTap={() => this.onCloseDrawer()}>
                            Contact
                        </MenuItem>
                    </a>
                    <a href="#/documentation">
                        <MenuItem onTouchTap={() => this.onCloseDrawer()}>
                            Documentation
                        </MenuItem>
                    </a>
                    <a href="#/about">
                        <MenuItem onTouchTap={() => this.onCloseDrawer()}>
                            About
                        </MenuItem>
                    </a>
                </Drawer>

                {React.cloneElement(this.props.children, {
                    projects: this.state.projects
                })}
            </main>
        );
    }

}

render((
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Network} />
                
                <Route path="about" component={About} />
                <Route path="network" component={Network} />
                <Route path="contact" component={Contact} />
                
                <Route path="documentation" component={DocumentationList} />
                <Route
                    path="documentation/:project/:doc"
                    component={DocumentationView}
                />
            </Route>
        </Router>
    </MuiThemeProvider>
), document.querySelector("#content"));