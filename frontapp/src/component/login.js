import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';


const useStyles = makeStyles(theme => ({

  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }

}));

export default function SignIn(props) {
  const classes = useStyles();
  const [userPassword, updateUserPassword] = useState('');
  const [userEmail, updateUserEmail] = useState('');

  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const handleEmailChange = (event) => {
    updateUserEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    updateUserPassword(event.target.value)
  }

  const login = (e) => {
    e.preventDefault();

    let params = {
      userEmail: userEmail,
      userPassword: userPassword
    }

    if (!emailRegex.test(userEmail)) {
      alert("Invalid email");
      return;
    }

    axios.post("http://localhost:5000/login", params) 
      .then((res) => {
        if (res.data.statusCode == 1) {
          localStorage.setItem("Token",res.data.token);
          localStorage.setItem("role",res.data.role);
          if (res.data.role == "admin") {
            props.history.push('/Dashboard')
          } else {
            props.history.push({
              pathname:`/Profile/${res.data._id}`,
              id:res.data._id
            })
          }
        } else {
          alert(res.data.error)
        }
      })
      .catch((error) => {
        alert(error)
        return error
      })
  }

  const route = () => {
    props.history.push('/Signup')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={login}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userEmail"
            label="Email Address"
            name="userEmail"
            autoComplete="userEmail"
            autoFocus
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="userPassword"
            label="Password"
            type="password"
            id="userPassword"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>


          <Grid container>
            <Grid item>
              <Link onClick={route}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}