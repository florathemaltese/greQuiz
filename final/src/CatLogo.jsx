// Import essential components.
import './CatLogo.css';

const Cat = () => {
    return (
        <div className="cat__container">
            <div className="cat__ear cat__ear-left"></div>
            <div className="cat__ear cat__ear-right"></div>
            <div className="cat__eye cat__eye-left"></div>
            <div className="cat__eye cat__eye-right"></div>
            <div className="cat__tongue"></div>
        </div>
    );
}

export default Cat;
