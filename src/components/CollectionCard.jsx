import { Link } from "react-router-dom";

export const CollectionCard = ({
  collectionCard,
  collection,
  selectCollection,
  deleteCollection,
}) => {
  return (
    <div className="collection-card">
      <Link className="link" to={`/mycollections/${collectionCard.id}`}>
        <div>
          <div className="collection-card-content">
            <h1>
              {collectionCard.name} ({collectionCard.collection.length})
            </h1>
          </div>
        </div>
      </Link>
      {collectionCard.id === collection.id ? null : (
        <div>
          <button
            onClick={() => {
              selectCollection(collectionCard.id);
            }}
          >
            Select Collection
          </button>
          <button
            onClick={() => {
              deleteCollection(collectionCard.id);
            }}
          >
            Delete Collection
          </button>
        </div>
      )}
    </div>
  );
};
