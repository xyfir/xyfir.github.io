import { Tabs, Tab, TabsContainer } from 'react-md';
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

    this.state = { tab: 0 };
  }

  _renderDocs() {
    return Object.keys(projects).map(p => {
      const pO = projects[p];

      return (
        <li className="project">
          {pO.name}
          <ul>
            {Object.keys(pO.documentation).length == 1 ? (
              <li>No documentation</li>
            ) : (
              Object.keys(pO.documentation).map(d => {
                if (d == 'legal') return <span />;

                const dO = pO.documentation[d];

                return (
                  <li className="documentation-item">
                    <a href={`/documentation/${p}/${d}`}>{dO.name}</a>
                    <span className="description">{dO.description}</span>
                  </li>
                );
              })
            )}
          </ul>
        </li>
      );
    });
  }

  _renderLegalDocs() {
    return Object.keys(projects).map(p => {
      const pO = projects[p];

      return (
        <li className="project">
          {pO.name}
          <ul>
            {Object.keys(pO.documentation.legal).map(d => {
              const dO = pO.documentation.legal[d];

              return (
                <li className="documentation-item">
                  <a href={`/documentation/${p}/${d}`}>{dO.name}</a>
                </li>
              );
            })}
          </ul>
        </li>
      );
    });
  }

  render() {
    return (
      <section className="documentation-list">
        <TabsContainer
          colored
          onTabChange={tab => this.setState({ tab })}
          panelClassName="md-grid"
          activeTabIndex={this.state.tab}
        >
          <Tabs tabId="tab" className="tabs">
            <Tab label="Documentation">
              <ul className="projects">{this._enderDocs()}</ul>
            </Tab>

            <Tab label="Legal Docs">
              <ul className="projects">{this._enderLegalDocs()}</ul>
            </Tab>
          </Tabs>
        </TabsContainer>
      </section>
    );
  }
}
