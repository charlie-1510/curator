import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArtCard } from "./ArtCard";
import { loadCollections } from "../utils/CollectionsFunctions";

export const Collection = ({ collections, removeFromCollection }) => {
  const { collection_id } = useParams();
  const [collection, setCollection] = useState({});
  useEffect(() => {
    const tempCollections = loadCollections();
    setCollection(
      tempCollections.filter((collection) => {
        return collection.id === +collection_id;
      })[0]
    );
  }, [collections]);
  return (
    <div className="">
      <div className="">
        <h1>{collection.name}</h1>
      </div>
      {collection ? (
        "collection" in collection ? (
          collection.collection.length >= 1 ? (
            <section className="art-card-container">
              {collection.collection.map((x, index) => {
                return x.artist || x.title || x.img_url ? (
                  <ArtCard
                    key={index}
                    art_info={x}
                    collection_id={collection_id}
                    removeFromCollection={removeFromCollection}
                  />
                ) : null;
              })}
            </section>
          ) : null
        ) : null
      ) : null}
    </div>
  );
};
