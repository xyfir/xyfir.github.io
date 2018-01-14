import { Paper } from 'react-md';
import React from 'react';

export default ({projects}) => (
  <section className='network'>
    <h2>Network</h2>

    <div className='projects'>{
      Object.keys(projects).map(p =>
        <Paper zDepth={1} className='project section' key={p}>
          <h3 className='name'>
            <a href={projects[p].link} target='_blank'>{projects[p].name}</a>
          </h3>
          <span className='description'>{projects[p].description}</span>
        </Paper>
      )
    }</div>
  </section>
)