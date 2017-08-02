import request from 'superagent';
import marked from 'marked';
import React from 'react';

import DynamicIframe from 'components/misc/DynamicIframe';

export default class ViewDocumentation extends React.Component {

  constructor(props) {
    super(props);

    const p = this.props.projects[this.props.params.project];

    // Validate that project and documentation file exist
    if (p === undefined) {
      location.hash = '#/documentation';
    }
    else {
      const d = p.documentation[this.props.params.doc] ||
        p.documentation.legal[this.props.params.doc];

      if (d === undefined)
        location.hash = '#/documentation';
      else
        this.state = { project: p, documentation: d };
    }
  }

  componentDidMount() {
    request
      .get(
        'https://raw.githubusercontent.com/Xyfir/Documentation/master/' +
        this.state.documentation.location + '.md'
      )
      .end((err, res) => {
        // Add CSS files
        this.refs.frame.refs.frame.contentDocument.head.innerHTML = `
          <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' rel='stylesheet' type='text/css'>
          <link rel='stylesheet' href='static/css/style.css'>
        `;

        // Convert markdown to html
        this.refs.frame.refs.frame.contentDocument.body.innerHTML =
          `<div class='markdown-body'>${marked(res.text, { santize: true })}</div>`;
      });
  }

  render() {
    return (
      <section className='view-documentation'>
        <h2 className='title'>
          {this.state.project.name}: {this.state.documentation.name}
        </h2>
        <span className='description'>{
          this.state.documentation.description
        }</span>

        <DynamicIframe ref='frame' className='documentation' />
      </section>
    );
  }

}