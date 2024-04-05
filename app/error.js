"use client";
const Error = ({ error }) => {
  return (
    <main className="error">
      <h1>Oops! An error occurred.</h1>
      <p>{error.message}</p>
      <p>
        Please try again later
        <span role="img" aria-label="sad face">
          😞
        </span>
      </p>
    </main>
  );
};

export default Error;
