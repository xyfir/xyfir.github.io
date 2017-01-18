import React from "react";

// MUI Components
import { Tabs, Tab } from "material-ui/Tabs";

export default class DocumentationList extends React.Component {

    constructor(props) {
        super(props);
    }

    renderDocs(projects) {
        return Object.keys(projects).map(p => {
            const pO = projects[p];

            return (
                <li className="project">
                    {pO.name}
                    <ul>{Object.keys(pO.documentation).length == 1 ? (
                        <li>No documentation</li>
                    ) : Object.keys(pO.documentation).map(d => {
                        if (d == "legal") return <span />;
                        
                        const dO = pO.documentation[d];

                        return (
                            <li className="documentation-item">
                                <a href={`#/documentation/${p}/${d}`}>{
                                    dO.name
                                }</a>
                                <span className="description">{
                                    dO.description
                                }</span>
                            </li>
                        );
                    })}</ul>
                </li>
            );
        });
    }

    renderLegalDocs(projects) {
        return Object.keys(projects).map(p => {
            const pO = projects[p];

            return (
                <li className="project">
                    {pO.name}
                    <ul>{Object.keys(pO.documentation.legal).map(d => {
                        const dO = pO.documentation.legal[d];

                        return (
                            <li className="documentation-item">
                                <a href={`#/documentation/${p}/${d}`}>{
                                    dO.name
                                }</a>
                            </li>
                        );
                    })}</ul>
                </li>
            );
        });
    }

    render() {
        return (
            <section className="documentation-list">
                <Tabs className="tabs">
                    <Tab label="Documentation">
                        <ul className="projects">{
                            this.renderDocs(this.props.projects)
                        }</ul>
                    </Tab>

                    <Tab label="Legal Docs">
                        <ul className="projects">{
                            this.renderLegalDocs(this.props.projects)
                        }</ul>
                    </Tab>
                </Tabs>
            </section>
        );
    }

}