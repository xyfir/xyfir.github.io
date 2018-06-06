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

  render() {
    return (
      <section className="network">
        <header>
          <h1>The Xyfir Network</h1>
          <p>
            Xyfir has built and maintains a large amount of applications, sites,
            and services. Here are a few of our actively-developed projects:
          </p>
        </header>

        <ul className="projects">
          {Object.keys(projects)
            .sort(() => Math.round(Math.random()))
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
