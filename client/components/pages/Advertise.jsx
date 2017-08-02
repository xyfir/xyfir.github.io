import request from 'superagent';
import React from 'react';

// react-md
import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';
import Paper from 'react-md/lib/Papers';

// Constants
import { RECAPTCHA_KEY } from 'constants/config';

export default class Advertise extends React.Component {

  constructor(props) {
    super(props);

    // Load reCAPTCHA lib
    const element = document.createElement('script');
    element.src = 'https://www.google.com/recaptcha/api.js';
    document.body.appendChild(element);
  }

  onSubmit() {
    const data = {};
    
    for (let ref in this.refs)
      data[ref] = this.refs[ref].getField().value;

    data.recaptcha = grecaptcha.getResponse();

    if (!data.recaptcha)
      return this.props.alert('You must complete the captcha');

    request
      .post('api/advertise')
      .send(data)
      .end((err, res) => {
        if (err || res.body.error)
          this.props.alert('Could not send message');
        else
          this.props.alert('You should receive a reply within a day');
      });
  }

  render() {
    return (
      <div className='advertise'>
        <h2>Advertise</h2>
        <p>
          Use this form for requesting an ad slot. For more information, see <a href='https://github.com/Xyfir/Ads'>Xyfir Ads</a>.
        </p>

        <Paper
          zDepth={1}
          component='section'
          className='advertise-form section flex'
        >
          <h3>Contact</h3>

          <TextField
            id='email--private-email'
            ref='prvEmail'
            type='email'
            label='Private Email'
            helpText='This is where we will respond to your request'
            className='md-cell'
          />

          <TextField
            id='email--public-email'
            ref='pubEmail'
            type='email'
            label='Public Email'
            helpText={
              'This will be posted publicly as the ad creator within the ' +
              'public ads repository'
            }
            className='md-cell'
          />

          <TextField
            id='textarea--notes'
            ref='notes'
            rows={2}
            type='text'
            label='Notes'
            helpText='Optional message to be sent along with your request'
            className='md-cell'
          />

          <h3>General Ad Info</h3>

          <TextField
            id='textarea--keywords'
            ref='keywords'
            rows={2}
            type='text'
            label='Keywords'
            helpText='A comma delimited list of keywords describing your ad'
            className='md-cell'
          />

          <TextField
            id='text--link'
            ref='link'
            type='text'
            label='Link'
            helpText={'A link to whatever you\'re advertising'}
            className='md-cell'
          />

          <h3>Normal Text Ad</h3>

          <TextField
            id='text--normal-title'
            ref='normalTitle'
            type='text'
            label='Normal Title'
            helpText='Limit 75 characters'
            className='md-cell'
          />

          <TextField
            id='text--normal-description'
            ref='normalDescription'
            type='text'
            label='Normal Description'
            helpText='Limit 250 characters'
            className='md-cell'
          />

          <h3>Short Text Ad</h3>

          <TextField
            id='text--short-title'
            ref='shortTitle'
            type='text'
            label='Short Title'
            helpText='Limit 25 characters'
            className='md-cell'
          />

          <TextField
            id='text--short-description'
            ref='shortDescription'
            type='text'
            label='Short Description'
            helpText='Limit 100 characters'
            className='md-cell'
          />

          <div className='recaptcha-wrapper'>
            <div
              className='g-recaptcha'
              data-sitekey={RECAPTCHA_KEY}
            />
          </div>

          <Button
            raised primary
            onClick={() => this.onSubmit()}
            label='Submit'
          >send</Button>
        </Paper>
      </div>
    );
  }

}