import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update, push, get } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAmWPlGidQIb1EyQIdJ6uUXPIQ-NwraXn0",
  authDomain: "runaway-2bfc1.firebaseapp.com",
  databaseURL: "https://runaway-2bfc1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "runaway-2bfc1",
  storageBucket: "runaway-2bfc1.appspot.com",
  messagingSenderId: "51732170222",
  appId: "1:51732170222:web:f2e3e62df857ba8caefaff",
  measurementId: "G-20ZYK4H6SF"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const leaderboardRef = ref(database, '/leaderboard');

function writeToLeaderboard(name, score) {
  return new Promise((resolve, reject) => {
    get(leaderboardRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const leaderboardData = snapshot.val();

          let existingEntryKey = null;
          for (const key in leaderboardData) {
            if (leaderboardData[key].name === name) {
              existingEntryKey = key;
              break;
            }
          }

          if (existingEntryKey) {
            const existingScore = leaderboardData[existingEntryKey].score;

            if (score > existingScore) {
              update(leaderboardRef, {
                [`${existingEntryKey}/score`]: score,
              })
                .then(() => {
                  resolve();
                })
                .catch((error) => {
                  reject(error);
                });
            } else {
              resolve();
            }
          } else {
            push(leaderboardRef, {
              name: name,
              score: score,
            })
              .then(() => {
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          }
        } else {
          resolve();
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const columns = [
  { id: 'name', label: 'username', minWidth: 170 },
  { id: 'score', label: 'score', minWidth: 100 },
];

export default function StickyHeadTable(props) {
  let count = 0;
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    count = count + 1;
    if(count === 1){
    writeToLeaderboard('david', props.propVariable)
      .then(() => {
        get(leaderboardRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const leaderboardData = snapshot.val();
              const updatedRows = Object.entries(leaderboardData)
                .map(([key, value]) => ({
                  name: value.name.toLowerCase(),
                  score: value.score,
                }))
                .sort((a, b) => b.score - a.score);

              setRows(updatedRows);
            } else {
            }
          })
          
      })
      }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
