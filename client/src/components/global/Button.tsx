import LoadingSpinner from "./LoadingSpinner";

type ButtonProps = {
  title: string;
  space: string;
  isDisabled: boolean;
};

const Button = ({ title, space, isDisabled }: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      className={`bg-black flex justify-center items-center text-white rounded-md text-sm font-medium py-2 w-full ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${space}`}
    >
      {isDisabled ? <LoadingSpinner/> : title}
    </button>
  );
};

export default Button;
