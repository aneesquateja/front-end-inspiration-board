import PropTypes from 'prop-types';
import './SelectedBoard.css';

const SelectedBoard = ({ board }) => {
    if (!board) {
        return <div className="selected-board">No board selected</div>;
    }

    return (
        <div className="selected-board">
            <span> Selected Board</span>
            <div className="board-header">
                <h2>{board.title}</h2>
                <p className="owner">Created by: {board.owner}</p>
            </div>
        </div>
    );
};

SelectedBoard.propTypes = {
    board: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired
    })
};

export default SelectedBoard;