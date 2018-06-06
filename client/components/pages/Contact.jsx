import { SelectField, TextField, Button, Paper } from 'react-md';
import request from 'superagent';
import React from 'react';

// Constants
import { RECAPTCHA_KEY } from 'constants/config';
import projects from 'constants/projects.json';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.props.App.meta = {
      title: 'Contact Us',
      description: `Send us a message. Support, feedback, business inquiries, etc.`
    };

    // Load reCAPTCHA lib
    const element = document.createElement('script');
    element.src = 'https://www.google.com/recaptcha/api.js';
    document.body.appendChild(element);
  }

  onSend() {
    const { App } = this.props;
    const data = {
      regarding: this.refs.regarding.state.value,
      recaptcha: grecaptcha.getResponse(),
      message: this.refs.message.value,
      email: this.refs.email.value,
      tag: this.refs.tag.state.value
    };

    if (!data.recaptcha) return App._alert('You must complete the captcha');

    request
      .post('/api/contact')
      .send(data)
      .end((err, res) => {
        if (err) return App._alert('Could not send message');

        App._alert('You should receive a reply within a day');
      });
  }

  render() {
    return (
      <section className="contact-us">
        <header>
          <h1>Contact Us</h1>
          <p>
            Enter in your message below and we'll do our best to reply within a
            day.
          </p>
        </header>

        <Paper
          zDepth={1}
          component="section"
          className="contact-form section flex"
        >
          <SelectField
            id="select-regarding"
            ref="regarding"
            label="Project"
            menuItems={['N/A'].concat(
              Object.keys(projects).map(p => projects[p].name)
            )}
            placeholder="N/A"
          />

          <SelectField
            id="select-tag"
            ref="tag"
            label="Tag"
            menuItems={[
              'Other',
              'Support',
              'Feedback',
              'Bug Report',
              'Business Inquiry'
            ]}
          />

          <TextField id="text-email" ref="email" type="email" label="Email" />

          <TextField
            id="text-message"
            ref="message"
            rows={10}
            type="text"
            label="Message"
            lineDirection="right"
          />

          <div className="recaptcha-wrapper">
            <div className="g-recaptcha" data-sitekey={RECAPTCHA_KEY} />
          </div>

          <Button
            raised
            primary
            iconChildren="send"
            onClick={() => this.onSend()}
          >
            Send
          </Button>
        </Paper>
      </section>
    );
  }
}
