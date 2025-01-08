import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const NewBoardForm = ({ onAddBoard }) => {
    const [title, setTitle] = useState('');
    const [owner, setOwner] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title.trim() === '' || owner.trim() === '') return;

        const newBoard = { title, owner }; // Simulated board object
        onAddBoard(newBoard); // Pass the new board to the parent
        setTitle(''); // Clear the title input
        setOwner(''); // Clear the owner input
    };

    return (
        <div className="new-board-form-container">
        <form onSubmit={handleSubmit}>
            <h3>Create a New Board</h3>
            <div>
                <label htmlFor="board-title">Title</label>
                <input
                    id="board-title"
                    type="text"
                    placeholder="Enter board title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="board-owner">Owner</label>
                <input
                    id="board-owner"
                    type="text"
                    placeholder="Enter owner name"
                    value={owner}
                    onChange={(event) => setOwner(event.target.value)}
                />
            </div>
            {/* </div> */}
        {/* </form> */}
        <p>Preview: {title} - {owner}</p>
        <button type="submit">Add Board</button>
    </form>
    </div>
        
    );
};

NewBoardForm.propTypes = {
    onAddBoard: PropTypes.func.isRequired,
};  

export default NewBoardForm;

