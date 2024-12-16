import React, { useState } from 'react';
import './App.css';

function App() {
  const [teamCount, setTeamCount] = useState(5);
  const [scores, setScores] = useState([]);
  const [showScoreboard, setShowScoreboard] = useState(false);

  const startGame = () => {
    const count = Math.max(2, Math.min(10, Number(teamCount)));
    setScores(Array(count).fill(0));
    setShowScoreboard(true);
  };

  const addPoint = (index) => {
    const newScores = [...scores];
    newScores[index]++;
    setScores(newScores);
  };

  return (
    <div className="App">
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
          <button onClick={startGame}>Начать игру</button>
        </div>
      ) : (
        <div>
          <h1>Счетчик очков команд</h1>
          <div className="teams">
            {scores.map((score, index) => (
              <div className="team" key={index}>
                <h2>Команда {index + 1}: <span className="score">{score}</span></h2>
                <button onClick={() => addPoint(index)}>Добавить очко Команда {index + 1}</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
