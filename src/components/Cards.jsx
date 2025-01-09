import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Cards.css';

const kbaseURL = 'https://back-end-inspiration-board-wy36.onrender.com';

const Cards = ({ cards = [], onDeleteCard, onLikeCard }) => {
    const [cardLikes, setCardLikes] = useState({});

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const promises = cards.map(card => 
                    axios.get(`${kbaseURL}/cards/${card.id}`)
                );
                const responses = await Promise.all(promises);
                const likes = {};
                responses.forEach(response => {
                    likes[response.data.id] = response.data.likes;
                });
                setCardLikes(likes);
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };

        if (cards.length > 0) {
            fetchLikes();
        }
    }, [cards]);

    const handleLike = async (cardId) => {
        await onLikeCard(cardId);
        try {
            const response = await axios.get(`${kbaseURL}/cards/${cardId}`);
            setCardLikes(prev => ({
                ...prev,
                [cardId]: response.data.likes
            }));
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };

    if (!cards || cards.length === 0) {
        return <div className="no-cards">No cards available</div>;
    }

    return (
        <div className="cards-container">
            {cards.map((card) => (
                <div key={card.id} className="card">
                    <p className="card-message">{card.message}</p>
                    <div className="card-actions">
                        <button className="delete-btn" onClick={() => onDeleteCard(card.id)}>
                        </button>
                        
                        <button className="like-btn" onClick={() => handleLike(card.id)}>
                            <span className="like-count">
                                {cardLikes[card.id] || card.likes || 0}
                            </span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

Cards.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            likes_count: PropTypes.number
        })
    ),
    onDeleteCard: PropTypes.func.isRequired,
    onLikeCard: PropTypes.func.isRequired
};

export default Cards;
