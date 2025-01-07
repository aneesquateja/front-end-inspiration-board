
import { useState, useEffect } from "react";
import axios from "axios";
import BoardList from "./components/Board";
import NewBoardForm from "./components/NewBoardForm";

const App = () => {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isBoardFormVisible, setIsBoardFormVisible] = useState(false);

  // Fetch boards from the backend
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/boards")
      .then((response) => {
        setBoardsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching boards:", error);
      });
  }, []);

  // Handle adding a new board
  const addNewBoard = (newBoard) => {
    axios.post("http://127.0.0.1:5000/boards", newBoard)
      .then((response) => {
        setBoardsData((prevBoards) => [...prevBoards, response.data]);
      })
      .catch((error) => {
        console.error("Error adding board:", error);
      });
  };

  // Handle selecting a board
  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
  };

  return (
    <div>
      <h1>Inspirational Board</h1>
      {isBoardFormVisible && (
        <NewBoardForm onAddBoard={addNewBoard} />
      )}
      <button onClick={() => setIsBoardFormVisible(!isBoardFormVisible)}>
        {isBoardFormVisible ? "Hide Form" : "Show Form"}
      </button>
      <BoardList boards={boardsData} onBoardSelect={handleBoardSelect} />
      {selectedBoard && (
        <div>
          <h2>Selected Board: {selectedBoard.title}</h2>
          <p>Owner: {selectedBoard.owner}</p>
        </div>
      )}
    </div>
  );
};

export default App;