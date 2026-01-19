interface Props {
  onClearError?: () => void;
}

export const ErrorPage = ({ onClearError }: Props) => {
  const handleBackHome = () => {
    onClearError?.();
    window.location.href = "/";
  };

  return (
    <div className="container">
      <h2 className="title-m">Something is not right!</h2>
      <button
        type="button"
        className="button button-m"
        onClick={handleBackHome}
      >
        Go Back Home
      </button>
    </div>
  );
};
