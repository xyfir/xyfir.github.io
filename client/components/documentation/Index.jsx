import React from "react";

// Constants
import { LIST_DOCS, VIEW_DOC } from "constants/views";

// Components
import List from "./List";
import View from "./View";

export default class Documentation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.view) {
            case LIST_DOCS:
                return <List />;
            case VIEW_DOC:
                return <View {...this.props} />;
        }
    }

}