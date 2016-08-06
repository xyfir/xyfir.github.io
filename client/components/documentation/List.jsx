import React from "react";

// Constants
import projects from "constants/projects";

export default class DocumentationList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="documentation-list">
                <h2>Documentation List</h2>
                <ul className="projects">{Object.keys(projects).map(p => {
                    pO = projects[p];

                    return (
                        <li className="project">
                            {pO.name}
                            <ul>{!Object.keys(pO.documentation).length ? (
                                <li>No documentation</li>
                            ) : Object.keys(pO.documentation).map(d => {
                                dO = pO.documentation[d];

                                return (
                                    <li className="documentation-item">
                                        <a href={`#/documentation/${p}/${d}`}>{
                                            dO.name
                                        }</a>
                                        <span className="description">{
                                            dO.description
                                        }</a>
                                    </li>
                                );
                            })}</ul>
                        </li>
                    );
                })}</ul>
            </section>
        );
    }

}