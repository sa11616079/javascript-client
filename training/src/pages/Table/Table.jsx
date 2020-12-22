import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = () => ({
  tableContainer: {
    marginLeft: 20,
    width: '97%',
  },
  table: {
    minWidth: 650,
  },
  tableHeader: {
    color: 'grey',
  },
});

function TableComponent(props) {
  const { classes } = props;
  const {
    columns, data,
  } = props;

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {
              columns.length && columns.map(({ align, lable, field }) => (
                <TableCell align={align} field={field} className={classes.tableHeader}>
                  {lable}
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data && data.length && data.map(({ id, name, email }) => (
              <TableRow key={id}>
                <TableCell align="center">
                  {name}
                </TableCell>
                <TableCell>
                  {email}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(TableComponent);
