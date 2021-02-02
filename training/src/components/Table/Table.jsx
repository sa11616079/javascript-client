import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import hoc from '../HOC/index';

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
      id, columns, classes, order, orderBy, onSort, onSelect,
      actions, data, count, rowsPerPage, page, onChangePage, onChangeRowsPerPage,
    } = this.props;
    console.log('Data', data);
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
              <TableRow className={classes.tableRow} key={item[id]}>
                {
                  columns && columns.length && columns.map(({ align, field, format }) => (
                    <TableCell onClick={(event) => onSelect(event, item.name)} align={align} component="th" scope="row" order={order} ordery={orderBy}>
                      {format ? format(item[field]) : item[field]}
                    </TableCell>
                  ))
                }
                {actions && actions.length && actions.map(({ icon, handler }) => (
                  <IconButton onClick={() => handler(item)}>
                    {icon}
                  </IconButton>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[]}
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
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func,
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func.isRequired,
};
TableComponent.defaultProps = {
  order: '',
  orderBy: '',
  onSort: () => {},
  onChangePage: () => {},
  rowsPerPage: 10,
  count: 0,
  page: 1,
  actions: [],
};
TableComponent.defaultProps = {
  order: 'asc',
  orderBy: '',
};
export default withStyles(useStyles)(hoc(TableComponent));
