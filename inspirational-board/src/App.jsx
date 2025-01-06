
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
