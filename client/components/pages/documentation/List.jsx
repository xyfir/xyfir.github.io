import { List, ListItem, Subheader } from 'react-md';
import React from 'react';

// Constants
import projects from 'constants/projects.json';

export default class DocumentationList extends React.Component {
  constructor(props) {
    super(props);

    this.props.App.meta = {
      title: 'Documentation',
      description: `Find documentation for all of the projects in the Xyfir Network.`
    };
  }

  render() {
    return (
      <List className="documentation md-paper md-paper--1 section">
        <Subheader primary primaryText="Documentation" />
        {Object.keys(projects)
          .filter(p => Object.keys(projects[p].documentation).length > 1)
          .map(p => (
            <ListItem
              key={p}
              primaryText={projects[p].name}
              nestedItems={Object.keys(projects[p].documentation)
                .filter(d => d != 'legal')
                .map(d => (
                  <a key={d} href={`/documentation/${p}/${d}`}>
                    <ListItem
                      primaryText={projects[p].documentation[d].name}
                      secondaryText={projects[p].documentation[d].description}
                    />
                  </a>
                ))}
            />
          ))}

        <Subheader primary primaryText="Legal Docs" />
        {Object.keys(projects)
          .filter(p => Object.keys(projects[p].documentation.legal).length)
          .map(p => (
            <ListItem
              key={p}
              primaryText={projects[p].name}
              nestedItems={Object.keys(projects[p].documentation.legal).map(
                d => (
                  <a key={d} href={`/documentation/${p}/${d}`}>
                    <ListItem
                      primaryText={projects[p].documentation.legal[d].name}
                    />
                  </a>
                )
              )}
            />
          ))}
      </List>
    );
  }
}
