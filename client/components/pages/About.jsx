import React from 'react';

export default class About extends React.Component {

  constructor(props) {
    super(props);

    this.props.App.meta = {
      title: 'About',
      description: `About Xyfir, LLC.`
    };
  }

  render() {
    return (
      <section className='about'>
        <h2>About</h2>
        <p>
          The Xyfir Network is operated by Xyfir, LLC. This website is a work in progress.
        </p>
      </section>
    );
  }

}