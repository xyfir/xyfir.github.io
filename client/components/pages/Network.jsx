import React from 'react';

// Constants
import projects from 'constants/projects.json';

export default class Network extends React.Component {
  constructor(props) {
    super(props);

    this.props.App.meta = {
      title: 'Network',
      description: `The Xyfir Network is home to many sites, services, and applications.`
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <section className="network">
        <header>
          <h1>The Xyfir Network</h1>
          <p>Xyfir has a lot of projects. Here are a few:</p>
        </header>

        <ul className="projects">
          {Object.keys(projects)
            .sort(() => Math.round(Math.random()))
            .filter(p => projects[p].promote)
            .map(p => (
              <li className="project" key={p}>
                <img src={projects[p].icon} />
                <div className="info">
                  <h2 className="name">
                    <a href={projects[p].link} target="_blank">
                      {projects[p].name}
                    </a>
                  </h2>
                  <p className="description">{projects[p].description}</p>
                </div>
              </li>
            ))}
        </ul>
      </section>
    );
  }
}
