import React from 'react';

export default ({projects}) => (
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