import React from "react";

export default class About extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="about">
                <h2>About</h2>
                <hr />
                <p>
                    The Xyfir Network is operated by Xyfir, LLC. This website is a work in progress.
                </p>
            </section>
        );
    }

}