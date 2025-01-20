import { useState } from 'react';
import './Feedback.css'

function FeedbackForm() {
    const [formData, setFormData] = useState({
        improvement: '',
        suggestions: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission logic, like sending the data to an API
        console.log('Feedback Submitted:', formData);
        setIsSubmitted(true); // Set submission status to true

        // Reset form data after submission
        setFormData({ improvement: '', suggestions: '' });
    };

    return (
        <div className="feedback-form-container">
            {isSubmitted ? (
                // Display the thank you message after submission
                <div className="thank-you-message">
                    <h2>Thank You for Your Feedback!</h2>
                    <p>Your input is valuable, and we appreciate your suggestions to help us improve.</p>
                </div>
            ) : (
                // Display the feedback form if not submitted
                <>
                    <h2>We Value Your Feedback</h2>
                    <p>Please let us know what we can improve and how to make it better for you.</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="improvement">What should we improve?</label>
                        <textarea
                            id="improvement"
                            name="improvement"
                            rows="4"
                            value={formData.improvement}
                            onChange={handleChange}
                            placeholder="Describe the areas we can improve"
                            required
                        ></textarea>

                        <label htmlFor="suggestions">How do you suggest we improve it?</label>
                        <textarea
                            id="suggestions"
                            name="suggestions"
                            rows="4"
                            value={formData.suggestions}
                            onChange={handleChange}
                            placeholder="Provide your suggestions or ideas for improvement"
                            required
                        ></textarea>

                        <button type="submit">Submit Feedback</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default FeedbackForm;
