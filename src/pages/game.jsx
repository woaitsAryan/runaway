import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import './game.css';
import song from './canttouchthis.ogg';
sessionStorage.setItem('song', song);
  const Game = ({gameData, onEnd}) => {
    const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 350 });
    const [enemies, setEnemies] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const navigate =  useNavigate();
    const lastxRef = useRef(playerPosition.x);
    const lastyRef = useRef(playerPosition.y);
    const playerPositionRef = useRef(playerPosition);
    const xshift = 0;
    const yshift = 0;
    const playingAreaRef = useRef(null);
    useEffect(() => {
      const handleMouseMove = (event) => {
        let { clientX, clientY } = event;
        if (playingAreaRef.current) {
          const rect = playingAreaRef.current.getBoundingClientRect();
          const offsetX = rect.left + window.scrollX;
          const offsetY = rect.top + window.scrollY;
          clientX -= offsetX;
          clientY -= offsetY;
        }
        if(clientX > 800 + xshift){
          clientX = 800 + xshift;
        }
        if(clientX < 0 + xshift){
          clientX = 0  + xshift;
        }
        if(clientY > 600 + yshift){
          clientY = 600 + yshift;
        }
        if(clientY < 0 + yshift){
          clientY = 0 + yshift;
        }
        setPlayerPosition({ x: clientX, y: clientY });
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        //clearInterval(movePlayerInterval);
        window.removeEventListener("mousemove", handleMouseMove);
      };
  
    }, []);
  
    useEffect(() => {
      const movelevel2andlevel1 = () => {
        setEnemies(prevEnemies => {
          return prevEnemies.map(enemy => {
            if (enemy.type === "level1") {
              const updatedEnemy = { ...enemy };
              updatedEnemy.x = updatedEnemy.x + updatedEnemy.speed;
              if (updatedEnemy.x > 800 + xshift || updatedEnemy.x < 0 + xshift) {
                updatedEnemy.speed = -updatedEnemy.speed;
              }
              return updatedEnemy;
            }
            if (enemy.type === "level2") {
              const updatedEnemy = { ...enemy };
              if (enemy.y > playerPosition.y) {
                updatedEnemy.y = enemy.y - enemy.speed;
              } else {
                updatedEnemy.y = enemy.y + enemy.speed;
              }
              if (enemy.x > playerPosition.x) {
                updatedEnemy.x = enemy.x - enemy.speed;
              } else {
                updatedEnemy.x = enemy.x + enemy.speed;
              }
              return updatedEnemy;
            }
            return enemy;
          });
        });
      };
    
      const spawnInterval = setInterval(movelevel2andlevel1, 0.0001);
    
      return () => {
        clearInterval(spawnInterval);
      };
    }, [enemies, playerPosition]);


    useEffect(() => {
      playerPositionRef.current = playerPosition;
    }, [playerPosition]);
    
    useEffect(() => {
      const movelevel3 = () => {
        setEnemies((prevEnemies) =>
          prevEnemies.map((enemy) => {
            if (enemy.type === "level3") {
              const updatedEnemy = { ...enemy };
              const directionX = lastxRef.current - updatedEnemy.x;
              const directionY = lastyRef.current - updatedEnemy.y;
              const distance = Math.sqrt(directionX ** 2 + directionY ** 2);
        
              const velocityX = (directionX / distance) * updatedEnemy.speed;
              const velocityY = (directionY / distance) * updatedEnemy.speed;
        
              updatedEnemy.x = updatedEnemy.x + velocityX;
              updatedEnemy.y = updatedEnemy.y + velocityY;
              return updatedEnemy;
            }
            return enemy;
          })
        );
      };

      const loopinglevel3 = () => {
        lastxRef.current = playerPositionRef.current.x;
        lastyRef.current = playerPositionRef.current.y;

        let moveit = setInterval(movelevel3, 0.1);

        setTimeout(() => {
          clearInterval(moveit);
        }, 5000);
      }
      const spawnInterval = setInterval(loopinglevel3, 8000);

      return () => {
        clearInterval(spawnInterval);
      };
    }, []);

    useEffect(() => {
      const delayedinterval = (callback, delay) => {
        const intervalid = setInterval(callback, delay);
        return intervalid;
        
      }
      const spawnEnemylevel1 = () => {
        const enemy = { type: "level1", x: Math.random() * 500 + xshift, y: Math.random() * 500 + yshift, speed:0.8 };
              
        setEnemies((prevEnemies) => [...prevEnemies, enemy]);
        return enemy;
      };
      const spawnEnemylevel2 = () => {

        const enemy = {type : "level2", x: Math.random() * 500 + xshift, y: Math.random() * 500 + yshift, speed:0.5 }

        setEnemies((prevEnemies) => [...prevEnemies, enemy]);
        return enemy;
      }
      const spawnEnemylevel3 = () => {
          
          const enemy = {type : "level3", x: Math.random() * 500 + xshift, y: Math.random() * 500 + yshift, speed:1.5 }
    
          setEnemies((prevEnemies) => [...prevEnemies, enemy]);
          return enemy;
      }

      const spawnInterval = setInterval(spawnEnemylevel1, 4000);
      const delayedinterval1 = delayedinterval(spawnEnemylevel2, 5400);
      const delayedinterval2 = delayedinterval(spawnEnemylevel3, 13000);
      return () => {
        clearInterval(spawnInterval);
        clearInterval(delayedinterval1);
        clearInterval(delayedinterval2);
      };
    }, []);

    useEffect(() => {
      const checkCollision = () => {
        for (const enemy of enemies) {
          if (
            playerPosition.x + 12 > enemy.x && playerPosition.x - 12 < enemy.x &&
            playerPosition.y + 12 > enemy.y && playerPosition.y - 12 < enemy.y
          ) {
            setGameOver(true);
            break;
          }
        }
      };
      checkCollision();
    }, [playerPosition, enemies]);

    useEffect(() => {
      const scoreInterval = setInterval(() => {
        setScore((prevScore) => prevScore + 1);
      }, 100);

      return () => {
        clearInterval(scoreInterval);
      };
    }, []);
    const getEnemyBackground = (type) => {
      if (type === "level1") {
      return `${gameData.theme}/level1.webp`;
      } else if (type === "level3") {
        return `${gameData.theme}/level3.webp`;
      } else if (type === "level2") {
        return `${gameData.theme}/level2.webp`;
      };
    };
    if(gameOver){
      onEnd(score);
      navigate('/end');
    }
    else{
      return (
        
        <div style = {{cursor:'none'}}>
         {gameData.novolume ? null : (
            <audio autoPlay loop style={{ display: 'none' }}>
              <source src={sessionStorage.getItem('song')} type="audio/ogg" />
            </audio>
          )}
          {
            <h2 className="Score">Score: {score}</h2>
          }
          <div
          className = "playingarea" ref={playingAreaRef}
          >
            <img
              src = {`${gameData.theme}/main.webp`}
              alt = "mainplayer"
              className = "mainplayer"
              style={{
                  top: playerPosition.y - 15,
                  left: playerPosition.x - 15,
              }}
            />
            {enemies.map((enemy, index) => (
              <img
                alt = "enemy"
                src = {getEnemyBackground(enemy.type)}
                key={index}
                style={{
                  position: "absolute",
                  top: enemy.y - 15,
                  left: enemy.x -15,
                  width: "30px",
                  height: "30px"
                }}
              />
            ))}
          </div>
        </div>
      );
    };
  };

export default Game;