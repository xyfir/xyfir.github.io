import React from "react";

// Constants
import { RECAPTCHA_KEY } from "constants/config";
import projects from "constants/projects";

// Modules
import request from "lib/request";

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
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
            swal("Error", "You must complete the captcha", "error");
        }
        else {
            request({
                url: "api/contact", method: "POST", data, success: (res) => {
                    if (res.error) {
                        swal("Error", "Could not send message", "error");
                    }
                    else {
                        swal(
                            "Message Sent",
                            "You should receive a reply within a day",
                            "success"
                        );
                    }
                }
            });
        }
    }

    render() {
        return (
            <section className="contact-us">
                <h2>Contact Us</h2>
                <p>
                    Enter in your message below and we'll do our best to reply within a day.
                    <br />
                    Please do not send the same message multiple times if you're not receiving a reply.
                </p>

                <hr />

                <form className="contact" onSubmit={() => this.onSend()}>
                    <label>Regarding</label>
                    <select ref="regarding" defaultValue="—">
                        <option value="—">—</option>
                        {Object.keys(projects).map(p => {
                            const t = projects[p].name;
                            return <option value={t}>{t}</option>;
                        })}
                    </select>

                    <label>Tag</label>
                    <select ref="tag" defaultValue="—">
                        <option value="—">—</option>
                        <option value="Support">Support</option>
                        <option value="Question">Question</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Business Inquiry">Business Inquiry</option>
                    </select>

                    <label>Email</label>
                    <span className="input-description">
                        The email that we'll send replies to.
                    </span>
                    <input type="text" ref="email" placeholder="user@email.com" />

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
            </section>
        );
    }

}