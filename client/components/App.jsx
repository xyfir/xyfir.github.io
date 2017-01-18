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

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = { projects: {} };
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

    render() {
        if (!Object.keys(this.state.projects).length) return <div />;

        return (
            <main className="app">
                <nav className="nav-bar">
                    <div className="left">
                        <a href="#/about">About</a>
                        <a href="#/contact">Contact</a>
                    </div>
                    
                    <span className="title">Xyfir</span>
                    
                    <div className="right">
                        <a href="#/network">Network</a>
                        <a href="#/documentation">Documentation</a>
                    </div>
                </nav>

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