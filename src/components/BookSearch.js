import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 800,
    borderRadius:50,
    margin:'100px auto -20px',
    boxShadow: '5px 5px 5px 5px DarkCyan'
  },
  input: {
    marginLeft: 8,
    flex: 1,
    height:'70px',
    borderRadius:'100px',
    width:'300px',
  },
});

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="Menu">
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Book ...."
        inputProps={{ 'aria-label': '' }}
      />
      <IconButton className={classes.iconButton} aria-label="Search">
      </IconButton>
    </Paper>
  );
}
