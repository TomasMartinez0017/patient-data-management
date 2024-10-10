import "./styles.css";

interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50 }) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${size * 0.1}px`, // Adjusting border thickness based on size
  };

  return <div className="spinner" style={spinnerStyle}></div>;
};

export { Spinner };
