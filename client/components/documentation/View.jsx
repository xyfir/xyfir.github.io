import marked from "marked";
import React from "react";

// Constants
import projects from "constants/projects";

// Modules
import request from "lib/request";

export default class ViewDocumentation extends React.Component {

    constructor(props) {
        super(props);

        const p = projects[this.props.hash.params.site];

        // Validate that project and documentation file exist
        if (p === undefined) {
            location.hash = "/documentation";
        }
        else {
            const d = p.documentation[this.props.hash.params.file];

            if (d === undefined)
                location.hash = "/documentation";
            else
                this.state = { project: p, documentation: d };
        }
    }

    componentDidMount() {
        const url = "https://api.github.com/repos/Xyfir/Documentation/contents/"
            + this.state.documentation.location + ".md";

        request({url, success: (res) => {
            this.refs.frame.contentDocument.body.innerHTML = marked(
                window.atob(res.content), { santize: true }
            );
        }});
    }

    render() {
        return (
            <section className="view-documentation">
                <h2 className="title">
                    {this.state.project.name} | {this.state.documentation.name}
                </h2>
                <span className="description">{
                    this.state.documentation.description
                }</span>

                <iframe src="" ref="frame" className="documentation" />
            </section>
        );
    }

}