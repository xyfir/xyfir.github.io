import { TextField, FontIcon, Button } from 'react-md';
import { render } from 'react-dom';
import request from 'superagent';
import React from 'react';

// Constants
import { URL, RECAPTCHA_KEY } from 'constants/config';

class XSS extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sent: false,
      error: false,
      darkTheme: !!localStorage.darkTheme,
      licenseHover: false
    };

    // Load reCAPTCHA lib
    const element = document.createElement('script');
    element.src = 'https://www.google.com/recaptcha/api.js';
    document.body.appendChild(element);
  }

  onToggleTheme() {
    const darkTheme = !this.state.darkTheme;

    if (darkTheme) localStorage.darkTheme = true;
    else delete localStorage.darkTheme;

    this.setState({ darkTheme });
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
    const { sent, error, licenseHover, darkTheme } = this.state;

    return (
      <div
        className={
          'xyfir-software-solutions ' +
          (this.state.darkTheme ? 'dark-theme' : 'light-theme')
        }
      >
        <Button
          floating
          primary
          fixed
          mini
          tooltipPosition="left"
          fixedPosition="tr"
          iconChildren={`brightness_${darkTheme ? 7 : 3}`}
          tooltipLabel="Toggle light/dark theme"
          onClick={() => this.onToggleTheme()}
        />

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
              Another great feature of web applications is the ease of which web
              applications are ported from the web to native mobile and desktop
              applications. This allows you to expand the platforms your app
              supports while not breaking the bank developing multiple separate
              apps.
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

          <section className="mobile-and-desktop-apps">
            <h2>
              <img src="/static/images/mobile.svg" />
              Mobile and Desktop Apps
            </h2>
            <p>
              Looking for an iOS, Android, or Windows Phone app? No problem,
              we've built and maintain a handful of them for our own projects
              and can do the same for you. With technologies like
              <a href="https://cordova.apache.org"> Cordova</a> and
              <a href="https://phonegap.com"> PhoneGap</a> we're able to bring
              our previously built web applications to mobile devices while
              utilizing native device features.
            </p>
            <p>
              Want a Windows, MacOS, or even Linux application as well? Our
              experience with <a href="https://electronjs.org/">Electron </a>
              means we can do that too.
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
              to have been created or popular within the past eight plus years.
              Bots are an extremely valuable asset that are consistently
              overlooked. From web scraping for content, data mining, testing,
              public relations, marketing, and advances in publicly available
              artificial intelligence tools, the possibilities for automation
              are endless. Xyfir itself hosts an entire network of bots that
              handle everything from marketing, testing, content generation and
              beyond. Simply put:
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
              <em> do</em> have a lot of experience working with servers, mainly
              <a href="https://www.ubuntu.com/server"> Ubuntu Server</a>. If you
              want your own website or application, having at least one server
              is most likely an unavoidable fact of life. Xyfir can recommend
              quality hosting solutions that meet your needs, and it can also
              setup, manage, secure, and update those servers for you.
            </p>
          </section>

          <section className="aesthetics">
            <h2>
              <img src="/static/images/paint.svg" />
              Simple Aesthetics
            </h2>
            <p>
              We prefer simplicity in the interfaces we build over pretty
              gimmicks that slow down the end user. An added benefit of this
              model is decreasing code complexity and thus the costs to our
              clients. Take a look at the clean, user-friendly interfaces we've
              built for our some of our own sites, like
              <a href="https://annotations.xyfir.com"> xyAnnotations</a> and
              <a href="https://ptorx.com"> Ptorx</a>.
            </p>
            <p>
              We're also big fans of Google's
              <a href="https://material.io/design/"> Material Design</a> and try
              to implement it wherever possible. If you're not a fan of it
              however, we can use other designs as you wish.
            </p>
          </section>

          <section className="experience">
            <h2>
              <img src="/static/images/code.svg" />
              Almost a Decade of Development Experience
            </h2>
            <p>
              It's safe to say we've been doing this for a while. Our experience
              is old, but our ideas, technologies, and coding conventions are
              fresh. We learn the best and newest tech and then choose the most
              reliable foundation to build upon so as to ensure a successful
              future for everything we build.
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

            {error ? (
              <p className="message error">
                Something went wrong while sending the message. Maybe try{' '}
                <a href="mailto:contact@xyfir.com">contacting us directly</a>?
              </p>
            ) : sent ? (
              <p className="message sent">
                Your message was sent! You should receive a response within a
                day or two.
              </p>
            ) : null}

            <form className={sent ? 'hide' : ''}>
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
                placeholder="Tell us about your project"
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

          {licenseHover ? (
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
