import React from "react";

interface IButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (value: any) => void;
  children?: React.ReactNode;
  disableBtt?: boolean;
}

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  disableBtt,
  ...props
}: IButtonProps) => {
  return (
    <button
      className="block cursor-pointe border-cyan-700 transition-all p-4 text-white font-medium border rounded-xl w-[100px] bg-cyan-700 disabled:opacity-75 disabled:cursor-not-allowed "
      type={type}
      onClick={onClick}
      disabled={disableBtt}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
