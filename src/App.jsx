  import React, { useState } from 'react';
  import NewBoardForm from './components/NewBoardForm';
  import './App.css';
  
  const App = () => {
      const [boards, setBoards] = useState([]);
  
      const handleAddBoard = (newBoard) => {
          const boardWithId = { ...newBoard, id: boards.length + 1 };
          setBoards([...boards, boardWithId]);
      };
  
      return (
          <div className="App">
              <h1>Inspiration Board</h1>
              {/* New Board Form */}
              <NewBoardForm onAddBoard={handleAddBoard} />
  
              {/* Display Added Boards */}
              <div className="boards-list">
                  <h2>Boards</h2>
                  <ul>
                      {boards.map((board) => (
                          <li key={board.id}>
                              <strong>{board.title}</strong> by {board.owner}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      );
  };
  
  export default App;