import PropTypes from "prop-types";
import "./Board.css";

const BoardList = ({ boards, onBoardSelect }) => {
  return (
    <div className="board-container">
      <h2>Boards</h2>
      <ol className="board-list">
        {boards.map((board) => (
          <li
            key={board.id}
            onClick={() => onBoardSelect(board)}
            style={{ cursor: "pointer", margin: "5px 0" }}
          >
            {board.title}
          </li>
        ))}
      </ol>
    </div>
  );
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBoardSelect: PropTypes.func.isRequired,
};

export default BoardList;
