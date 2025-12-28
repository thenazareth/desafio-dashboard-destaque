import "./button.css";

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
    return(
        <button className="search-button" onClick={onClick}>
            Buscar
        </button>
    );
}
export default Button;