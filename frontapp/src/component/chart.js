import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
}));

const CustomizedTables = withRouter((props) => {
    const classes = useStyles();

    const user = [];
    const [userList, updateUserList] = useState(user);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = () => {
        console.log("props : ", props)
        axios.get("http://localhost:5000/users")
            .then((res) => {
                updateUserList(res.data.user);
            })
            .catch((error) => {
                alert(error)
                return error
            })
    }

    const routeToProfile = (user) => {
        props.history.push({
            pathname: `/Profile/${user._id}`
        })
    }


    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Role</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Id</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        userList.map((user, i) => (
                            <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row" onClick={() => routeToProfile(user)}>{user.firstName}</StyledTableCell>
                                <StyledTableCell align="right">{user.role}</StyledTableCell>
                                <StyledTableCell align="right">{user.userEmail}</StyledTableCell>
                                <StyledTableCell align="right">{user._id}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
        </Paper >
    );
});

export default CustomizedTables;