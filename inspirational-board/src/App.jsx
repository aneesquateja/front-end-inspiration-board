import React, { useState } from 'react';
import NewBoardForm from './components/NewBoardForm';
import './App.css';

const App = () => {
    const [boards, setBoards] = useState([]);

    const handleAddBoard = (newBoard) => {
        const boardWithId = { ...newBoard, id: boards.length + 1 };
        setBoards([...boards, boardWithId]);
    };
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './components/Board'

const kbaseURL = '';   // I can Replace with your deployed API URL if needed

const convertFromApi = (apiBoard) => {
  const newBoard = {
    id: apiBoard.id,
    title: apiBoard.title,
    ownerName: apiBoard.owner,
  };
  return newBoard;
};



function App() {
   // State to manage the list of boards
  const [boards, setBoards] = useState([]);

  // Function to fetch the list of boards from the API
  useEffect(() => {
    axios.get(kbaseURL)
  const handleAddBoard = (newBoard) => {
    // Add your board handling logic here
    console.log('New board:', newBoard);
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
  return (
    <>
      < h3>Create a New Board</h3>
      <main>
        <br />
        <div>
          <Board handleAddBoard={handleAddBoard} />
          </div>
      </main>
    </>
  )
}

export default App;
