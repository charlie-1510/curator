import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="">
      <div className="">
        <h1>Error 404 - Page Not Found</h1>
        <Link to="/" className="link">
          Please click here to return to Homepage
        </Link>
      </div>
    </div>
  );
};
