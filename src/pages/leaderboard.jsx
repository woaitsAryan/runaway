import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './end.css';

const columns = [
  { id: 'name_runaway', label: 'username', minWidth: 100 },
  { id: 'score_runaway', label: 'score', minWidth: 50 },
  {
    id: 'name_asteroids',
    label: 'username',
    minWidth: 100,
  },
  {
    id: 'score_asteroids',
    label: 'score',
    minWidth: 50,
  },
  {
    id: 'name_corsairs',
    label: 'username',
    minWidth: 100,
  },
  {
    id: 'score_corsairs',
    label: 'score',
    minWidth: 50,
  },
  {
    id: 'name_fishy',
    label: 'username',
    minWidth: 100,
  },
  {
    id: 'score_fishy',
    label: 'score',
    minWidth: 50,
  },
  {
    id: 'name_tetris',
    label: 'username',
    minWidth: 100,
  },
  {
    id: 'score_tetris',
    label: 'score',
    minWidth: 50,
  },
];


const rows = [
  { name_runaway: 'John', score_runaway: 100, name_asteroids: 'John', score_asteroids: 100, name_corsairs: 'John', score_corsairs: 100, name_fishy: 'John', score_fishy: 100, name_tetris: 'John', score_tetris: 100 },
  { name_runaway: 'Aryan', score_runaway: 100, name_asteroids: 'Aryan', score_asteroids: 100, name_corsairs: 'Aryan', score_corsairs: 100, name_fishy: 'Aryan', score_fishy: 100, name_tetris: 'Aryan', score_tetris: 100 },
  { name_runaway : 'Manas', score_runaway: 100, name_asteroids: 'Manas', score_asteroids: 100, name_corsairs: 'Manas', score_corsairs: 100, name_fishy: 'Manas', score_fishy: 100, name_tetris: 'Manas', score_tetris: 100 },
  
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }} >
        <Table stickyHeader aria-label="sticky table" class="row">
          <TableHead >
            <TableRow >
              <TableCell align="center" colSpan={2}>
                Runaway
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Asteroids
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Corsairs 
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Fishy 
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Tetris 
              </TableCell>
            </TableRow>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth,
                            
                   }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}