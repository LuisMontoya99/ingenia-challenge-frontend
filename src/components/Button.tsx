import { Link } from "react-router-dom";

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "outline";
  ariaLabel?: string;
}

const Button = ({
  to,
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  variant = "primary",
  ariaLabel,
}: ButtonProps) => {
  const baseStyles = `inline-block px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${
    variant === "primary"
      ? "bg-primary hover:bg-secondary text-white"
      : "bg-transparent border-2 border-primary text-primary hover:bg-primary/10"
  }`;

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseStyles} ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
