import { TextField, FontIcon, Button } from 'react-md';
import { render } from 'react-dom';
import request from 'superagent';
import React from 'react';

// Constants
import { URL, RECAPTCHA_KEY } from 'constants/config';

class XSS extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: false, sent: false, licenseHover: false };

    // Load reCAPTCHA lib
    const element = document.createElement('script');
    element.src = 'https://www.google.com/recaptcha/api.js';
    document.body.appendChild(element);
  }

  onSubmit() {
    request
      .post('/api/contact')
      .send({
        tag: 'Business Inquiry',
        email: this._email.value,
        message: this._message.value,
        recaptcha: grecaptcha.getResponse(),
        regarding: 'Xyfir Software Solutions'
      })
      .end((err, res) => {
        if (err) this.setState({ error: true });
        else this.setState({ error: false, sent: true });
      });
  }

  render() {
    return (
      <div className="xyfir-software-solutions">
        <header>
          <h1>
            Xyfir Software Solutions <span className="xss">(XSS)</span>
          </h1>
          <p>
            <strong>We build software</strong>: web, mobile, desktop apps;
            command line tools; bots, web scrapers, automation; and much more.
            We're more than just your average development shop, because we've
            built and maintain an
            <a href="/network"> entire network </a>
            of sites, applications, and tools for our own company. We know what
            project creators truly want. So, what can we build for
            <em> your</em> company?
          </p>
        </header>

        <main>
          <section className="web-apps">
            <h2>
              <img src="/static/images/web.svg" />
              Websites and Web Applications
            </h2>
            <p>
              Xyfir Software Solutions is no stranger to building web
              applications, top to bottom, entirely from scratch. In fact, they
              make up the bulk of our network. From
              <a href="https://books.xyfir.com"> ebook readers</a>, to
              <a href="https://ptorx.com"> email clients</a>, to note-taking
              apps and more, we've built it all.
            </p>
            <p>
              <a href="https://reactjs.org">React</a>,
              <a href="https://nodejs.org/en/"> Node.js</a>,
              <a href="https://sass-lang.com"> SASS</a>,
              <a href="https://mariadb.org"> MariaDB</a>, and
              <a href="https://www.nginx.com"> Nginx </a>
              are our preferred web technologies to work with, but we have a
              wide range of experience with other languages, frameworks,
              libraries, and servers.
            </p>
          </section>

          <section className="mobile-apps">
            <h2>
              <img src="/static/images/mobile.svg" />
              Mobile Apps
            </h2>
            <p>
              Looking for an iOS, Android, or Windows Phone app? No problem,
              we've built and maintain a handful of them for our own projects
              and can do the same for you. With technologies like
              <a href="https://cordova.apache.org"> Cordova</a> and
              <a href="https://phonegap.com"> PhoneGap</a> we're able to bring
              our previously mentioned web applications to mobile devices while
              being able to utilize the native device features.
            </p>
          </section>

          <section className="bots">
            <h2>
              <img src="/static/images/robot.svg" />
              Bots, Web Scrapers, and Automation
            </h2>
            <p>
              When it comes to automation, we've truly done it all, having
              worked with almost every automation tool, language, and framework
              to have been created or popular within the past seven years. Bots
              are an extremely valuable asset that are consistently overlooked.
              From web scraping for content, data mining, testing, public
              relations, marketing, and advances in publicly available
              artificial intelligence tools, the possibility for automation is
              endless. Xyfir itself maintains an entire network of bots that
              handle everything from marketing, to testing, and beyond. Simply
              put:
              <strong> we know bots</strong>.
            </p>
          </section>

          <section className="servers">
            <h2>
              <img src="/static/images/server.svg" />
              Server Setup and Maintenance
            </h2>
            <p>
              Xyfir is not a hosting company, but we
              <em> do</em> have a lot of experience working with servers. If you
              want your own website or application, having at least one server
              is most likely an unavoidable fact of life. Xyfir can recommend
              quality hosting solutions that meet your needs, and it can also
              setup, manage, secure, and update your servers for you.
            </p>
          </section>

          <section className="functionality">
            <h2>
              <img src="/static/images/code.svg" />
              Functionality Over Aesthetics
            </h2>
            <p>
              We prefer simplicity in the interfaces we build over pretty
              gimmicks that slow down the end user. An added benefit of this is
              decreasing code complexity and thus the costs to our clients. Take
              a look at the clean, user-friendly interfaces we've built for our
              some of our own sites, like
              <a href="https://annotations.xyfir.com"> xyAnnotations</a> and
              <a href="https://ptorx.com"> Ptorx</a>.
            </p>
            <p>
              We're big fans of Google's
              <a href="https://material.io/design/"> Material Design</a> and try
              to implement it wherever possible. If you're not a fan of it
              however, we can use other designs as you wish.
            </p>
          </section>

          <section className="contact">
            <h2>
              <img src="/static/images/at.svg" />
              Contact Us
            </h2>
            <p>
              Interested in our services? Send us a message. At XSS, all
              correspondence is made over email so that everything is written
              down in a single, searchable location. It makes everything easier.
            </p>

            {this.state.error ? (
              <p className="message error">
                Something went wrong while sending the message. Maybe try{' '}
                <a href="mailto:contact@xyfir.com">contacting us directly</a>?
              </p>
            ) : this.state.sent ? (
              <p className="message sent">
                Your message was sent! You should receive a response within a
                day or two.
              </p>
            ) : null}

            <form className={this.state.sent ? 'hide' : ''}>
              <TextField
                required
                id="email"
                ref={i => (this._email = i)}
                type="email"
                leftIcon={<FontIcon>email</FontIcon>}
                helpText="Make sure this is valid or we won't be able to respond!"
                maxLength={64}
                placeholder="Your Email Address"
              />
              <TextField
                required
                id="message"
                ref={i => (this._message = i)}
                rows={2}
                type="text"
                leftIcon={<FontIcon>edit</FontIcon>}
                maxLength={10000}
                placeholder="Tell us what you're looking for and we'll let you know if and
                when we can do it. Whatever it is, we've probably done it
                before."
              />

              <div className="recaptcha-wrapper">
                <div className="g-recaptcha" data-sitekey={RECAPTCHA_KEY} />
              </div>

              <Button
                raised
                primary
                onClick={() => this.onSubmit()}
                iconChildren="send"
              >
                Submit
              </Button>
            </form>
          </section>
        </main>

        <footer>
          <p className="made-in-california">
            Designed & Built in California by
            <a href="https://www.xyfir.com"> Xyfir</a>.
          </p>

          {this.state.licenseHover ? (
            <p
              className="license hover"
              onMouseOut={() => this.setState({ licenseHover: false })}
            >
              Icons made by Yannick, Linh Pham, SimpleIcon, Dave Gandy, Google,
              & Vaadin on FlatIcon.com, and are licensed by CC BY 3.0.
            </p>
          ) : (
            <p
              className="license default"
              onMouseOver={() => this.setState({ licenseHover: true })}
            >
              Icons from FlatIcon.com
            </p>
          )}
        </footer>
      </div>
    );
  }
}

render(<XSS />, document.querySelector('#content'));
