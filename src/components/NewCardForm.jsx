import { useState } from "react";
import PropTypes from 'prop-types';

const NewCardForm = ({ onAddCard }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddCard({ message });
        setMessage("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="message">Message:</label>
                <input
                    type="text"
                    id="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button type="submit">Add Card</button>
            </form>
            <p>Preview: {message}</p>
        </div>
    );
};
NewCardForm.propTypes = {
    onAddCard: PropTypes.func.isRequired,
};

export default NewCardForm;

