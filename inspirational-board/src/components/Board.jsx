import react from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Board = () => {
    const [board, setBoard] = useState([]);

    const handleAddBoard = () => {
        setBoard([
            ...board,
            {
                id: board.length + 1,
                title: `Board ${board.length + 1}`,
                ownerName: '',
            },
        ]);
    }
    
    return (
        <form onSubmit={handleAddBoard}>
            <label htmlFor="board-title">Title</label><br/>
            <input type="text" id="board-title" name= "name title" value={Board} onChange={handleAddBoard}/>
            <div>
            <label htmlFor="board-owner">Owner&apos;s Name</label><br/>
            <input type="text" id="board-owner" name="owner" value={Board} onChange={handleAddBoard}/>
            </div>
            <br/>
            Preview:-
            <br/>
            <div>
                <input type="submit" value="Submit"/>
            </div>
        </form>      
    );
    };

Board.propTypes = {
    board_id: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Board;