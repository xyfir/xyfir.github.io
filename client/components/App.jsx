import React from "react";
import { render } from "react-dom";

// Modules
import request from "lib/request/";
import onHashChange from "lib/url/on-change";

// Constants
import { URL, XACC } from "constants/config";

// Components
import About from "components/pages/About";
import Contact from "components/pages/Contact";
import Network from "components/pages/Network";
import Documentation from "components/documentation/";

class App extends React.Component {

    constructor(props) {
        super(props);

        // Set state based on location.hash
        this.state = onHashChange();
        window.onhashchange = () => {
            this.setState(onHashChange());
        };
    }

    render() {
        let view;

        switch (this.state.view.split('/')[0]) {
            case "ABOUT":
                view = <About {...this.state} />; break;
            case "CONTACT":
                view = <Contact {...this.state} />; break;
            case "NETWORK":
                view = <Network {...this.state} />; break;
            case "DOCUMENTATION":
                view = <Documentation {...this.state} />;
        }

        return (
            <div className="app">
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

                {view}
            </div>
        );
    }

}

render(<App />, document.querySelector("#content"));