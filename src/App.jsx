import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';

function App() {
  const [teamCount, setTeamCount] = useState(5);
  const [scores, setScores] = useState([]);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [teamNames, setTeamNames] = useState([]);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setTeamNames(Array(Number(teamCount)).fill(''));
  }, [teamCount]);

  const handleTeamNameChange = (index, event) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = event.target.value;
    setTeamNames(newTeamNames);
  };

  const startGame = () => {
    const count = Math.max(2, Math.min(10, Number(teamCount)));
    setScores(Array(count).fill(0));
    setShowScoreboard(true);
    setWinner(null);
    setShowConfetti(false);
    setCelebrationActive(false);
  };

  const addPoint = (index) => {
    const newScores = [...scores];
    newScores[index]++;
    setScores(newScores);
  };

  const playCelebrationSound = () => {
    const audio = new Audio('/celebration.mp3'); // Add an MP3 file to your public folder
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const declareWinner = () => {
  const maxScore = Math.max(...scores);
  const winnerIndex = scores.indexOf(maxScore);
  setWinner(winnerIndex);
  setShowConfetti(true);
  setCelebrationActive(true);
  playCelebrationSound();

    // timeout
    setTimeout(() => {
      if (!celebrationActive) {
        setShowConfetti(false);
      }
    }, 8000);

    // конец через 8сек
    setTimeout(() => {
      setCelebrationActive(false);
      setShowConfetti(false);
    }, 8000);
  };

  return (
    <div className="App">
      
{showConfetti && (
  <Confetti
    width={windowSize.width}
    height={windowSize.height}
    numberOfPieces={300}
    recycle={true}
    colors={['#FFD700', '#FFA500', '#FF69B4', '#00FF00', '#4169E1']}
    gravity={0.3}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 2000,
      pointerEvents: 'none'
    }}
  />
)}

{celebrationActive && (
  <div className="celebration-overlay" style={{ zIndex: 1000 }}>
    <div className="celebration-content">
      <div className="trophy">🏆</div>
      <h1 className="celebration-title">
        ПОБЕДИТЕЛИ!!!
      </h1>
      <h2 className="winning-team">
        {teamNames[winner] || `Команда ${winner + 1}`}
      </h2>
      <div className="final-score">
        Финальный счет: {scores[winner]}
      </div>
      <div className="celebration-emojis">
        🎉 ⭐️ 🎈 🎊 🌟
      </div>
      <button
        className="continue-btn"
        onClick={() => setCelebrationActive(false)}
      >
        Продолжить
      </button>
    </div>
  </div>
)}

      {!showScoreboard ? (
        
        <div className="dialog">
          <h2>Выберите количество команд</h2>
          <input
            type="number"
            min="2"
            max="10"
            value={teamCount}
            onChange={(e) => setTeamCount(e.target.value)}
          />
          <br />
          {teamNames.map((name, index) => (
            <div key={index}>
              <label htmlFor={`team-name-${index}`}>Название команды {index + 1}:</label>
              <input
                type="text"
                id={`team-name-${index}`}
                value={name}
                onChange={(e) => handleTeamNameChange(index, e)}
              />
            </div>
          ))}
          <br />
          <button onClick={startGame}>Начать игру</button>
        </div>
      ) : (
        
        <div>
          <h1>Игра "Английский турнир"</h1>
          <div className="teams">
            {scores.map((score, index) => (
              <div className="team" key={index}>
                <h2>{teamNames[index] || `Команда ${index + 1}`}: <span className="score">{score}</span></h2>
                <button onClick={() => addPoint(index)}>Добавить очко {teamNames[index] || `Команда ${index + 1}`}</button>
              </div>
            ))}
          </div>
          {!winner && (
            <button 
              className="declare-winner-btn"
              onClick={declareWinner}
            >
              Объявить победителя
            </button>
          )}
          {winner && !celebrationActive && (
            <button 
              className="new-game-btn"
              onClick={() => {
                setShowScoreboard(false);
                setWinner(null);
                setShowConfetti(false);
              }}
            >
              Новая игра
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;