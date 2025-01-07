import { useState } from 'react';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';
import './App.css';

const App = () => {
  const [boards, setBoards] = useState([]);
  const [cards, setCards] = useState([]);

  // Function to add a new board
  const handleAddBoard = (newBoard) => {
    const boardWithId = { ...newBoard, id: boards.length + 1 };
    setBoards([...boards, boardWithId]);
  };

  // Function to add a new card
  const addCard = (newCard) => {
    setCards([...cards, newCard]);
  }

  return (
    <div className="App">
      <h1>Inspiration Board</h1>
      {/* New Board Form */}
      <NewBoardForm onAddBoard={handleAddBoard} />
      <NewCardForm addCard={addCard} />

      <h3>Preview:</h3>
      <ul>
        {cards.map((card) => (
          <li key={card.id || card.message}>{`Preview: ${card.message}`}</li>
        ))}
      </ul>

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