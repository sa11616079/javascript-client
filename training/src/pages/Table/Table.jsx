import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = (theme) => ({
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
  tableRow: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[100],
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
  },
});

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      columns, classes, order, orderBy, onSort, onSelect,
      actions, data, count, rowsPerPage, page, onChangePage, onChangeRowsPerPage,
    } = this.props;
    return (
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                columns.length && columns.map(({
                  align, field, lable,
                }) => (
                  <TableCell
                    align={align}
                    className={classes.tableHeader}
                  >
                    <TableSortLabel
                      active={orderBy === field}
                      direction={orderBy === field ? order : 'asc'}
                      onClick={onSort(field)}
                    >
                      {lable}
                    </TableSortLabel>
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((item) => (
              <TableRow hover className={classes.tableRow}>
                {
                  columns && columns.length && columns.map(({ align, field, format }) => (
                    <TableCell onClick={(event) => onSelect(event, item.name)} align={align} component="th" scope="row" order={order} ordery={orderBy}>
                      {format ? format(item[field]) : item[field]}
                    </TableCell>
                  ))
                }
                {actions && actions.length && actions.map(({ icon, handler }) => (
                  <TableRow>
                    <Button onClick={() => handler()}>
                      {icon}
                    </Button>
                  </TableRow>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={0}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
    );
  }
}
TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
TableComponent.defaultProps = {
  order: 'asc',
  orderBy: '',
};
export default withStyles(useStyles)(TableComponent);
