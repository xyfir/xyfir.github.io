import React from 'react';

// Components
import List from 'components/pages/documentation/List';
import View from 'components/pages/documentation/View';

export default class Documentation extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const match = location.pathname.match(/^\/documentation\/(.+)\/(.+)$/);

    if (!match)
      return <List {...this.props} />
    else
      return <View {...this.props} project={match[1]} doc={match[2]} />
  }

}