import React from "react";

// Constants
import projects from "constants/projects";

export default class Network extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="network">
                <h2>Network</h2>
                <div className="projects">{
                    Object.keys(projects).map(p => {
                        return (
                            <div className="project">
                                <h2 className="name">
                                    <a href={projects[p].link} target="_blank">{
                                        projects[p].name
                                    }</a>
                                </h2>
                                <span className="description">{
                                    projects[p].description
                                }</span>
                            </div>
                        );
                    })
                }</div>
            </section>
        );
    }

}