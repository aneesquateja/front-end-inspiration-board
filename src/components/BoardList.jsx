import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";


const BoardList = ({ boards }) => {
    return (
        <div>
            <h1>Boards</h1>
            <ul>
                {boards.map((board) => (
                    <li key={board.id}>{board.title}</li>
                ))} 
            </ul>
        </div>
    );
};

BoardList.propTypes = {
    boards: PropTypes.array.isRequired,
};

export default BoardList;