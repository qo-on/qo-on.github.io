import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [teamCount, setTeamCount] = useState(5);
  const [scores, setScores] = useState([]);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [teamNames, setTeamNames] = useState([]);

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
        </div>
      )}
    </div>
  );
}

export default App;
