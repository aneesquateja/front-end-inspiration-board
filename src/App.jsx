import { useState, useEffect } from "react";
import axios from "axios";
import BoardList from "./components/Board";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import Cards from "./components/Cards";
import "./App.css";

const App = () => {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isBoardFormVisible, setIsBoardFormVisible] = useState(false);
  const [cardsData, setCardsData] = useState([]);

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

  // Fetch cards for the selected board
  useEffect(() => {
    if (selectedBoard) {
      axios.get(`http://127.0.0.1:5000/boards/${selectedBoard.id}/cards`)
        .then((response) => {
          setCardsData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cards:", error);
        });
    }
  }, [selectedBoard]);

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

  // Handle adding a new card
  const addNewCard = (newCard) => {
    axios.post(`http://127.0.0.1:5000/boards/${selectedBoard.id}/cards`, newCard)
      .then((response) => {
        setCardsData((prevCards) => [...prevCards, response.data]);
      })
      .catch((error) => {
        console.error("Error adding card:", error);
      });
  };

  // Handle deleting a card
  const deleteCard = (cardId) => {
    axios.delete(`http://127.0.0.1:5000/cards/${cardId}`)
      .then(() => {
        setCardsData((prevCards) => prevCards.filter((card) => card.id !== cardId));
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  };

  // Handle liking a card
  const likeCard = (cardId) => {
    axios.patch(`http://127.0.0.1:5000/cards/${cardId}/like`)
      .then((response) => {
        setCardsData((prevCards) =>
          prevCards.map((card) =>
            card.id === cardId ? { ...card, likes: response.data.likes } : card
          )
        );
      })
      .catch((error) => {
        console.error("Error liking card:", error);
      });
  };

  return (
    <div>
      <h1>Inspirational Board</h1>

      <div>
        <h2>Boards</h2>
        <BoardList boards={boardsData} onBoardSelect={setSelectedBoard} />
        {isBoardFormVisible && <NewBoardForm onAddBoard={addNewBoard} />}
        <button onClick={() => setIsBoardFormVisible(!isBoardFormVisible)}>
          {isBoardFormVisible ? "Hide Board Form" : "Add New Board"}
        </button>
      </div>
      
      {selectedBoard && (
        <div>
          <h2>Selected Board: {selectedBoard.title}</h2>
          <p>Owner: {selectedBoard.owner}</p>
          <NewCardForm onAddCard={addNewCard} />
          <div>
            <Cards cards={cardsData} onDeleteCard={deleteCard} onLikeCard={likeCard} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

