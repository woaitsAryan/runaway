import React from 'react';
/*import CustomGroupingTable from './leaderboard.jsx';*/
import './end.css';
import { useNavigate } from 'react-router-dom';



function EndPage({ gameData, score }) {
  const navigate =  useNavigate();
  
  const redirect = () => {
    navigate('/');
  }

  return (
    <div className="container">
       <button type="submit" onClick={redirect} className="Replay">
            <img src="replay.webp" alt="replay" className="replaybtn"/>
        </button>
      <h3 className="scoreText">Your score is {score} in {gameData.theme}</h3>
      {/*<div className="ScoreContainer">
      <CustomGroupingTable />
        </div>*/}
    </div>
  );
}

export default EndPage;
