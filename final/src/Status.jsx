// Import essential components.
import { MESSAGES } from './constants';

function Status({ error }) {
    // Get error message from MESSAGES object based on error code, or use default message if error code is not found in MESSAGES.
    const message = MESSAGES[error] || MESSAGES.default;
    // Render a status component with the error message.
    return (
        <div className="status">
            <p className="status__error">{message}</p>
        </div>
    );
}

export default Status;
