import React, {useEffect} from 'react';
import CustomGroupingTable from './leaderboard.jsx';
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
      <h3 className="scoreText">{gameData.username}'s score is {score} in {gameData.theme}</h3>
      <div className="ScoreContainer">
          <CustomGroupingTable propVariable= {score} usernameprop = {gameData.username}/>
        </div>
    </div>
  );
}

export default EndPage;
