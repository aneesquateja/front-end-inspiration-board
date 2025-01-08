import PropTypes from "prop-types";
import "./Board.css";

const Board = ({ boards, onBoardSelect }) => {
  return (
    <div className="board-container">
      <div className="board-header">
        <h2>Boards</h2>
      </div>
      <div className="board-list-container">
        <ul className="board-list">
          {boards.map((board) => (
            <li
              key={board.id}
              onClick={() => onBoardSelect(board)}
              className="board-item"
            >
              {board.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Board.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBoardSelect: PropTypes.func.isRequired,
};

export default Board;
