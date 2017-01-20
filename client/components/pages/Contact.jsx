import React from "react";

// MUI Components
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import Snackbar from "material-ui/Snackbar";

// Constants
import { RECAPTCHA_KEY } from "constants/config";

// Modules
import request from "lib/request";

export default class Contact extends React.Component {

    constructor(props) {
        super(props);

        this.state = { message: "" };

        // Load reCAPTCHA lib
        const element = document.createElement("script");
        element.src = "https://www.google.com/recaptcha/api.js";
        element.type = "text/javascript";
        document.body.appendChild(element);
    }

    onSetValue(prop, val) {
        this.setState({ [prop]: val });
    }

    onSend() {
        const data = {
            regarding: this.state.regarding,
            recaptcha: grecaptcha.getResponse(),
            message: this.refs.message.getValue(),
            email: this.refs.email.getValue(),
            tag: this.state.tag
        };

        if (!data.recaptcha) {
            this.setState({ message: "You must complete the captcha" });
        }
        else {
            request({
                url: "api/contact", method: "POST", data
            }, (res) => {
                if (res.error) {
                    this.setState({ message: "Could not send message" });
                }
                else {
                    this.setState({
                        message: "You should receive a reply within a day"
                    });
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

                <SelectField
                    value={this.state.regarding}
                    onChange={(e, i, v) => this.onSetValue("regarding", v)}
                    className="select"
                    floatingLabelText="Regarding Project"
                >
                    <MenuItem value="N/A" primaryText="N/A" />
                    {Object.keys(projects).map(p => {
                        const t = projects[p].name;
                        return <MenuItem value={t} primaryText={t} />;
                    })}
                </SelectField>

                <br />

                <SelectField
                    value={this.state.tag}
                    onChange={(e, i, v) => this.onSetValue("tag", v)}
                    className="select"
                    floatingLabelText="Tag"
                >
                    <MenuItem value="Other" primaryText="Other" />
                    <MenuItem value="Support" primaryText="Support" />
                    <MenuItem value="Feedback" primaryText="Feedback" />
                    <MenuItem value="Bug Report" primaryText="Bug Report" />
                    <MenuItem
                        value="Business Inquiry"
                        primaryText="Business Inquiry"
                    />
                </SelectField>

                <br />

                <TextField
                    ref="email"
                    type="email"
                    floatingLabelText="Email"
                /><br />

                <TextField
                    floatingLabelText="Message"
                    multiLine={true}
                    rowsMax={7}
                    rows={7}
                    ref="message"
                />

                <div className="recaptcha-wrapper">
                    <div
                        className="g-recaptcha"
                        data-sitekey={RECAPTCHA_KEY}
                    />
                </div>

                <RaisedButton
                    label="Send Message"
                    primary={true}
                    className="button raised primary"
                    onTouchTap={() => this.onSend()}
                />

                <Snackbar
                    open={!!this.state.message}
                    message={this.state.message}
                    autoHideDuration={5000}
                    onRequestClose={() => this.setState({ message: "" })}
                />
            </section>
        );
    }

}