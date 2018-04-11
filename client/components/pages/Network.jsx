import React from 'react';

export default class Network extends React.Component {

  constructor(props) {
    super(props);

    this.props.App.meta = {
      title: 'Network',
      description: `The Xyfir Network is home to many sites, services, and applications.`
    };
  }

  render() {
    const {projects} = this.props.App.state;

    return (
      <section className='network'>
        <h2>Network</h2>

        <ul className='projects'>{
          Object.keys(projects).map(p =>
            <li className='project' key={p}>
              <img src={projects[p].icon} />
              <div className='info'>
                <h3 className='name'>
                  <a href={projects[p].link} target='_blank'>{projects[p].name}</a>
                </h3>
                <p className='description'>{projects[p].description}</p>
              </div>
            </li>
          )
        }</ul>
      </section>
    )
  }

}