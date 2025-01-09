import { useState, useEffect } from "react";
import axios from "axios";
import Board from "./components/Board";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import Cards from "./components/Cards";
import SelectedBoard from "./components/SelectedBoard";
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

  const deleteAllBoards = () => {
    axios.delete('http://127.0.0.1:5000/boards')
      .then((response) => {
        console.log(response.data.details);
        // Optionally, update the state to reflect the changes in the UI
        setBoardsData([]);
        setSelectedBoard(null);
      })
      .catch((error) => {
        console.error("Error deleting all boards:", error);
      });
  };

  // Add deleteBoard function
  const deleteBoard = (boardId) => {
    axios.delete(`http://127.0.0.1:5000/boards/${boardId}`)
      .then(() => {
        setBoardsData((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
        setSelectedBoard(null);
        setCardsData([]);
      })
      .catch((error) => {
        console.error("Error deleting board:", error);
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
        console.log(response.data);
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
    <div className="container">
        <h1 className="inspirational-board-title">Dream Crafters Inspirational Board</h1>
        
        <section className="left-side-container">
            <Board 
                boards={boardsData} 
                onBoardSelect={setSelectedBoard} 
            />
            <div className="board-actions">
                
                {boardsData.length > 0 && (
                    <button 
                        className="toggle-form-btn"
                        onClick={deleteAllBoards}
                        aria-label="Delete all boards"
                    >
                        Delete All Boards
                    </button>
                )}
            </div>
        </section>

        <section className="center-container" aria-label="Selected Board">
            <SelectedBoard 
                board={selectedBoard} 
                onDeleteBoard={deleteBoard}
            />
        </section>

        <section className="right-side-container">
            {isBoardFormVisible && (
                <NewBoardForm 
                    onAddBoard={addNewBoard} 
                    onToggleForm={() => setIsBoardFormVisible(false)}
                />
            )}
            <div className="board-actions">
                {!isBoardFormVisible && (
                    <button 
                        className="toggle-form-btn"
                        onClick={() => setIsBoardFormVisible(true)}
                    >
                        Add New Board
                    </button>
                )}
                </div>
        </section>

        {selectedBoard && (
            <section className="cards-section" aria-label="Board Cards">
                <NewCardForm onAddCard={addNewCard} />
                <Cards 
                    cards={cardsData} 
                    onDeleteCard={deleteCard} 
                    onLikeCard={likeCard} 
                />
            </section>
        )}
    </div>
);
};
export default App;


