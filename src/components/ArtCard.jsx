import { Link } from "react-router-dom";

export const ArtCard = ({
  art_info,
  addToCollection,
  removeFromCollection,
  collection_id,
  collection,
}) => {
  return (
    <div className="art-card">
      <Link className="link" to={`/library/${art_info.id}`}>
        <div className="art-card-content">
          <div className="">
            {art_info.img_url ? (
              <div className="art-card-image-container">
                <img className="art-card-image" src={art_info.img_url}></img>
              </div>
            ) : (
              "No Image Provided"
            )}
            <h4 className="art-card-title">
              {art_info.title ? art_info.title : "No Title Provided"}
            </h4>
            <p className="art-card-title">
              {art_info.artist ? art_info.artist : "No Artist Provided"}
            </p>
          </div>
        </div>
      </Link>
      <div className="add_button_container">
        {collection ? (
          collection.collection
            .map((artwork) => {
              return artwork.id === art_info.id;
            })
            .includes(true) ? (
            <button
              onClick={() => {
                removeFromCollection(art_info.id, collection.id);
              }}
            >
              Remove from collection
            </button>
          ) : (
            <button
              onClick={() => {
                addToCollection(art_info);
              }}
            >
              Add to collection
            </button>
          )
        ) : (
          <button
            onClick={() => {
              removeFromCollection(art_info.id, collection_id);
            }}
          >
            Remove from collection
          </button>
        )}
      </div>
    </div>
  );
};
