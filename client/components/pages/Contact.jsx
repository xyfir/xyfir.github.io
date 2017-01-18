import React from "react";
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

    onSend() {
        const data = {
            regarding: this.refs.regarding.value,
            recaptcha: grecaptcha.getResponse(),
            message: this.refs.message.value,
            email: this.refs.email.value,
            tag: this.refs.tag.value
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
                    <br />
                    Please do not send the same message multiple times if you're not receiving a reply.
                </p>

                <form className="contact" onSubmit={() => this.onSend()}>
                    <label>Regarding</label>
                    <select ref="regarding" defaultValue="—">
                        <option value="-">-</option>
                        {Object.keys(projects).map(p => {
                            const t = projects[p].name;
                            return <option value={t}>{t}</option>;
                        })}
                    </select>

                    <label>Tag</label>
                    <select ref="tag" defaultValue="—">
                        <option value="-">-</option>
                        <option value="Support">Support</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Bug Report">Bug Report</option>
                        <option value="Business Inquiry">Business Inquiry</option>
                    </select>

                    <label>Email</label>
                    <span className="input-description">
                        The email that we'll send replies to.
                    </span>
                    <input type="text" ref="email" />

                    <label>Message</label>
                    <textarea ref="message" />

                    <div className="recaptcha-wrapper">
                        <div
                            className="g-recaptcha"
                            data-sitekey={RECAPTCHA_KEY}
                        />
                    </div>
                </form>
                
                <button onClick={() => this.onSend()} className="btn-primary">
                    Send Message
                </button>

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