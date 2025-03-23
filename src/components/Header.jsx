import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

export const Header = ({ collection }) => {
  return (
    <div className="header">
      <div className="header-title">
        <h1>
          <Link to="/" className="link">
            The Curator App
          </Link>
        </h1>
      </div>
      <div className="header-collections">
        <h2>
          <Link to="/mycollections" className="link">
            My Collections
          </Link>
        </h2>
        <p>
          <Link className="link" to={`/mycollections/${collection.id}`}>
            {collection.name}
          </Link>
        </p>
      </div>
    </div>
  );
};
