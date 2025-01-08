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
//     <div>
//       <h1 className="inspirational-board-title">Inspirational Board</h1>
//       <div className="left-side-container">
//         <h2>Boards</h2>
//         <BoardList boards={boardsData} onBoardSelect={setSelectedBoard} />
//         </div>
//         <div className="right-side-container">
//         {isBoardFormVisible && <NewBoardForm onAddBoard={addNewBoard} />}
//         <button onClick={() => setIsBoardFormVisible(!isBoardFormVisible)}>
//           {isBoardFormVisible ? "Hide New Board Form" : "Show New Board Form"}
//         </button>
//       </div>

//       <div className="delete-all-container">
//         <p>This is a demo! Please be gentle! <span onClick={deleteAllBoards} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Click here</span> to delete all boards and cards!</p>
//       </div>
      
//       {selectedBoard && (
//         <div className="selected-board-container">
//           <h2>Selected Board: {selectedBoard.title}</h2>
//           <p>Owner: {selectedBoard.owner}</p>
//           <NewCardForm onAddCard={addNewCard} />
//           <div>
//             <Cards cards={cardsData} onDeleteCard={deleteCard} onLikeCard={likeCard} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

<div className="container">
  <h1 className="inspirational-board-title">Inspirational Board</h1>

  <div className="board-card-container">
    <div className="left-side-container">
      <h2>Boards</h2>
      <BoardList boards={boardsData} onBoardSelect={setSelectedBoard} />
    </div>

    {selectedBoard && (
      <div className="selected-board-container">
        <h2>Selected Board: {selectedBoard.title}</h2>
        <p>Owner: {selectedBoard.owner}</p>
        <NewCardForm onAddCard={addNewCard} />
        <Cards cards={cardsData} onDeleteCard={deleteCard} onLikeCard={likeCard} />
      </div>
    )}

    <div className="right-side-container">
      {isBoardFormVisible && <NewBoardForm onAddBoard={addNewBoard} />}
      <button onClick={() => setIsBoardFormVisible(!isBoardFormVisible)}>
        {isBoardFormVisible ? "Hide New Board Form" : "Show New Board Form"}
      </button>
    </div>
  </div>

  <div className="delete-all-container">
    <p>This is a demo! Please be gentle! <span onClick={deleteAllBoards} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Click here</span> to delete all boards and cards!</p>
  </div>
</div>
 );
 };
 
 export default App;


