import request from 'superagent';
import marked from 'marked';
import React from 'react';

export default class ViewDocumentation extends React.Component {

  constructor(props) {
    super(props);

    const p = this.props.projects[this.props.project];

    // Validate that project and documentation file exist
    if (p === undefined) {
      location.replace('/documentation');
    }
    else {
      const d = p.documentation[this.props.doc] ||
        p.documentation.legal[this.props.doc];

      if (d === undefined)
        location.replace('/documentation');
      else
        this.state = { project: p, documentation: d, file: '' };
    }
  }

  componentDidMount() {
    request
      .get(
        'https://raw.githubusercontent.com/Xyfir/Documentation/master/' +
        this.state.documentation.location + '.md'
      )
      .end((err, res) => this.setState({ file: res.text }));
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

        <div
          className='documentation markdown-body'
          dangerouslySetInnerHTML={{__html:
            marked(this.state.file, { santize: true })
          }}
        />
      </section>
    );
  }

}