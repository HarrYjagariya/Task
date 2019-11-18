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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },


}));



export default function SignUp(props) {
  const classes = useStyles();
  const [firstName, updatefirstName] = useState('');
  const [lastName, updatelastName] = useState('');
  const [userPassword, updateUserPassword] = useState('');
  const [userEmail, updateUserEmail] = useState('');
  const [role, updateRole] = useState('');


  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const passRegex = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );


  const handleRoleChange = (event) => {
    updateRole(event.target.value)
  }

  const handlefirstName = (event) => {
    updatefirstName(event.target.value)
  }

  const handlelastName = (event) => {
    updatelastName(event.target.value)
  }

  const handleEmailChange = (event) => {
    updateUserEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    updateUserPassword(event.target.value)
  }

  const signup = (e) => {
    e.preventDefault();


    if (role.toLowerCase().trim() == "admin") {
      updateRole("Admin")
    } else if (role.toLowerCase().trim() == "user") {
      updateRole("User")
    }else{
      updateRole("User")
    }

  
    
    if (!emailRegex.test(userEmail)) {
      alert("Invalid email");
      return;
    }

    if (!passRegex.test(userPassword)) {
      alert("Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
      return;
    }

    let params = {
      firstName: firstName,
      lastName: lastName,
      userEmail: userEmail,
      userPassword: userPassword,
      role: role
    }

    axios.post("http://localhost:5000/Signup", params)
      .then((res) => {
        if (res.data.statusCode == 1) {
           props.history.push('/')
        } else {
          alert(res.data.message)
        }
      })
      .catch((error) => {
        alert(error)
        return error
      })
  }

  const route = () => {
    props.history.push('/')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={signup}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handlefirstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handlelastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="userEmail"
                autoComplete="email"
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="userPassword"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="role"
                label="Role - admin/user"
                type="Role"
                id="Role"
                autoComplete="Role"
                onChange={handleRoleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={route} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}