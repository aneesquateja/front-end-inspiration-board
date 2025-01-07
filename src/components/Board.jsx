import PropTypes from "prop-types";

const BoardList = ({ boards, onBoardSelect }) => {
  return (
    <div>
      <h2>Boards</h2>
      <ul>
        {boards.map((board) => (
          <li
            key={board.id}
            onClick={() => onBoardSelect(board)}
            style={{ cursor: "pointer", margin: "5px 0" }}
          >
            {board.title}
          </li>
        ))}
      </ul>
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
