import { useState } from "react";
import PropTypes from "prop-types";

const NewCardForm = (props) => {
    const { addCard } = props;

    // State to handle the form inputs
    const [formData, setFormData] = useState({
        message: "",
    });

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Only proceed if message and owner are not empty
        if (formData.message.trim()) {
            addCard(formData);

            // Clear the form fields
            setFormData({
                message: "",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="new-card-form">
            <h2>Add a New Card</h2>
            <h2>Preview: </h2>
            <div>
                <label htmlFor="message">message:</label>
                <input
                    id="message"
                    name="message"
                    type="text"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter card message"
                    required
                />
            </div>
            <button type="submit">Add Card</button>
        </form>
    );
};

// PropTypes validation
NewCardForm.propTypes = {
    addCard: PropTypes.func.isRequired, // Function to add a new card
};

export default NewCardForm;
