import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/start';
import Game from './pages/game';
import EndPage from './pages/end';
import { initializeApp } from "firebase/app";
import { getDatabase, ref as sRef, push, get, update } from "firebase/database";
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const leaderboardRef = sRef(database, '/leaderboard');

function writeToLeaderboard(name, score) {
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
            update(leaderboardRef,{
              [`${existingEntryKey}/score`]: score
            })
              .then(() => {
                console.log(`Updated score ${score} for ${name}`);
              })
              .catch((error) => {
                console.error(`Error updating score for ${name}:`, error);
              });
          } else {
            console.log(`Score ${score} is not higher than the existing score for ${name}`);
          }
        } else {
          push(leaderboardRef, {
            name: name,
            score: score
          })
            .then(() => {
              console.log(`Added new entry for ${name} with score ${score}`);
            })
            .catch((error) => {
              console.error(`Error adding new entry for ${name}:`, error);
            });
        }
      } else {
        console.log("No data available in the leaderboard");
      }
    })
    .catch((error) => {
      console.error("Error fetching leaderboard data:", error);
    });
}
function App() {
  const [gameData, setGameData] = useState(null);
  const [score, setScore] = useState(0);

  const handleStart = (data) => {
    setGameData(data);
  };

  const handleEnd = (data) => {
    
    setScore(data);
    writeToLeaderboard("test", score);
    
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<StartPage onStart={handleStart} />}
        />
        <Route
          path="/game"
          element={<Game gameData={gameData} onEnd={handleEnd} />}
        />
        <Route
          path="/end"
          element={<EndPage gameData={gameData} score = {score}/>}
        />
      </Routes>
    </Router>
  )
}

export default App;
