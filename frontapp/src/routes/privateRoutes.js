import React, { Component } from 'react';
import { Redirect, Route  } from 'react-router-dom';


export const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            localStorage.getItem('Token') ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{
                        pathname: '/',
                        state: { from: props.location }
                    }}
                    />
                )
        }
    />
)

export const PublicRoute = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            localStorage.getItem('Token') ? (
                <Redirect to={{
                    pathname: '/Profile/No-data',
                    state: { from: props.location }
                }}
                />
            ) : <Component {...props}/>
        }
    />
)

export default PrivateRoute;