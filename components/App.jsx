import { render } from 'react-dom';
import * as React from 'react';
import 'typeface-roboto';
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
  withStyles,
  Typography,
  Divider
} from '@material-ui/core';

const App = withStyles(theme => ({
  divider: {
    marginBottom: '1.5em'
  },
  root: {
    padding: '2em'
  },
  h1: {
    marginBottom: '0.2em',
    fontWeight: 'bold',
    fontSize: '250%',
    color: theme.palette.primary.main
  },
  h2: {
    marginBottom: '0.2em',
    fontWeight: 'bold',
    fontSize: '200%',
    color: theme.palette.secondary.main
  },
  p: {
    fontSize: '110%',
    lineHeight: '125%',
    marginBottom: '1.5em'
  },
  a: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
}))(({ classes }) => (
  <main className={classes.root}>
    <Typography variant="h1" className={classes.h1}>
      Xyfir
    </Typography>
    <Typography className={classes.p}>
      For comments, questions, or business inquiries, send us an email at{' '}
      <a href="mailto:contact@xyfir.com" className={classes.a}>
        contact@xyfir.com
      </a>
      .
    </Typography>

    <Divider className={classes.divider} />

    <Typography variant="h2" className={classes.h2}>
      Ptorx
    </Typography>
    <Typography className={classes.p}>
      <a href="https://ptorx.com" className={classes.a}>
        ptorx.com
      </a>{' '}
      — Protect your privacy, strengthen your security, and take control of your
      emails.
    </Typography>

    <Divider className={classes.divider} />

    <Typography variant="h2" className={classes.h2}>
      xyAnnotations
    </Typography>
    <Typography className={classes.p}>
      <a href="https://annotations.xyfir.com" className={classes.a}>
        annotations.xyfir.com
      </a>{' '}
      — We're annotating the world's books, one book at a time.
    </Typography>

    <Divider className={classes.divider} />

    <Typography variant="h2" className={classes.h2}>
      Open Source
    </Typography>
    <Typography className={classes.p}>
      <a href="https://github.com/Xyfir" className={classes.a}>
        github.com
      </a>{' '}
      — Open source libraries and applications for all to use.
    </Typography>
  </main>
));

const theme = createMuiTheme({
  palette: {
    type: localStorage.theme,
    primary: { main: '#2196f3' },
    secondary: { main: '#607d8b' }
  }
});
const Theme = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>
);

render(<Theme />, document.querySelector('#content'));
