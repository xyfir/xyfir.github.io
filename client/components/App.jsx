import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

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

// react-md
import ListItem from "react-md/lib/Lists/ListItem";
import Toolbar from "react-md/lib/Toolbars";
import Drawer from "react-md/lib/Drawers";
import Button from "react-md/lib/Buttons/Button";


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
                <Toolbar
                    colored
                    className="toolbar"
                    title="Xyfir"
                    nav={
                        <Button
                            icon
                            onClick={() =>
                                this.setState({ drawer: true })
                            }
                        >menu</Button>
                    }
                />

                <Drawer
                    onVisibilityToggle={
                        v => this.setState({ drawer: v })
                    }
                    className="toolbar"
                    autoclose={true}
                    navItems={[
                        <a href="#/network">
                            <ListItem primaryText="Network" />
                        </a>,
                        <a href="#/contact">
                            <ListItem primaryText="Contact" />
                        </a>,
                        <a href="#/about">
                            <ListItem primaryText="About Us" />
                        </a>,
                        <a href="#/documentation">
                            <ListItem primaryText="Documentation" />
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
                                    onClick={() =>
                                        this.setState({ drawer: false })
                                    }
                                >arrow_back</Button>
                            }
                        />
                    }
                    type={Drawer.DrawerTypes.TEMPORARY}
                />

                {React.cloneElement(this.props.children, {
                    projects: this.state.projects
                })}
            </main>
        );
    }

}

render((
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
), document.querySelector("#content"));