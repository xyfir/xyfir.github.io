import React from "react";

// react-md
import SelectField from "react-md/lib/SelectFields";
import TextField from "react-md/lib/TextFields";
import Snackbar from "react-md/lib/Snackbars";
import Button from "react-md/lib/Buttons/Button";

// Constants
import { RECAPTCHA_KEY } from "constants/config";

// Modules
import request from "lib/request";

export default class Contact extends React.Component {

    constructor(props) {
        super(props);

        this.state = { message: "", toasts: [] };

        // Load reCAPTCHA lib
        const element = document.createElement("script");
        element.src = "https://www.google.com/recaptcha/api.js";
        element.type = "text/javascript";
        document.body.appendChild(element);
    }

    onSetValue(prop, val) {
        this.setState({ [prop]: val });
    }

    onSend(e) {
        e && e.preventDefault();

        const data = {
            regarding: this.state.regarding,
            recaptcha: grecaptcha.getResponse(),
            message: this.refs.message.getField().value,
            email: this.refs.email.getField().value,
            tag: this.state.tag
        };

        if (!data.recaptcha) {
            this.setState({ toasts: [{
                text: "You must complete the captcha"
            }]});
        }
        else {
            request({
                url: "api/contact", method: "POST", data
            }, (res) => {
                if (res.error) {
                    this.setState({ toasts: [{
                        text: "Could not send message"
                    }]});
                }
                else {
                    this.setState({ toasts: [{
                        text: "You should receive a reply within a day"
                    }]});
                }
            });
        }
    }

    render() {
        const projects = this.props.projects;

        return (
            <section className="contact-us">
                <h2>Contact Us</h2>
                <p>
                    Enter in your message below and we'll do our best to reply within a day.
                </p>

                <form onSubmit={(e) => this.onSend(e)}>
                    <SelectField
                        required
                        id="select-regarding"
                        label="Regarding Project"
                        value={this.state.regarding}
                        menuItems={
                            ["N/A"].concat(
                                Object.keys(projects).map(p => projects[p].name)
                            )
                        }
                        onChange={v => this.onSetValue("regarding", v)}
                        className="md-cell"
                        placeholder="N/A"
                    />

                    <br />

                    <SelectField
                        required
                        id="select-tag"
                        label="Tag"
                        value={this.state.tag}
                        menuItems={[
                            "Other", "Support", "Feedback", "Bug Report",
                            "Business Inquiry"
                        ]}
                        onChange={v => this.onSetValue("tag", v)}
                        className="md-cell"
                    />

                    <br />

                    <TextField
                        required
                        id="text-email"
                        ref="email"
                        type="email"
                        label="Email"
                        className="md-cell"
                    />

                    <br />

                    <TextField
                        required
                        id="text-message"
                        ref="message"
                        rows={7}
                        type="text"
                        label="Message"
                        className="md-cell"
                    />

                    <div className="recaptcha-wrapper">
                        <div
                            className="g-recaptcha"
                            data-sitekey={RECAPTCHA_KEY}
                        />
                    </div>

                    <Button
                        raised primary
                        onClick={() => this.onSend()}
                        label="Send Message"
                    />
                </form>

                <Snackbar
                    toasts={this.state.toasts}
                    onDismiss={() => this.setState({ toasts: [] })}
                />
            </section>
        );
    }

}