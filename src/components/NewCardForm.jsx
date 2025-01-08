import { useState } from "react";
import PropTypes from 'prop-types';
import './NewCardForm.css';

const NewCardForm = ({ onAddCard }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddCard({ message });
        setMessage("");
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="new-card-form">
                <label htmlFor="message">Write your inspiration:</label>
                <input
                    type="text"
                    id="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Type your message here..."
                />
                <button type="submit">Add Sticky Note</button>
            </form>
            {message && <p className="preview">Preview: {message}</p>}
        </div>
    );
};
NewCardForm.propTypes = {
    onAddCard: PropTypes.func.isRequired,
};

export default NewCardForm;

