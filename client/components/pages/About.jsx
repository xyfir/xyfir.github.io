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
                    Planning for Xyfir and its network began in late 2014. xyfir.com was purchased in March of 2015 and Xyfir, LLC was formed in August 2015. By October 2015 work had begun on various portions of the network. A year after the company was created, small portions of the network began being made available to the public. Development and planning continues with ambitious goals for the future.
                </p>
            </section>
        );
    }

}