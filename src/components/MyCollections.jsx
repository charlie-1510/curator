import { CollectionCard } from "./CollectionCard";
import { useState } from "react";
import {
  saveCollections,
  loadCollections,
  saveCollectionID,
} from "../utils/CollectionsFunctions";

export const MyCollections = ({
  collection,
  setCollection,
  collections,
  setCollections,
  selectCollection,
}) => {
  const [nameInput, setNameInput] = useState("");

  const handleChange = ({ target: { value } }) => {
    setNameInput(value);
  };

  const handleNewCollectionSubmit = (event) => {
    event.preventDefault();
    if (event.target[0].value !== "") {
      saveCollections([
        ...collections,
        {
          id: collections[collections.length - 1].id + 1,
          name: event.target[0].value,
          collection: [],
        },
      ]);
      setCollections([
        ...collections,
        {
          id: collections[collections.length - 1].id + 1,
          name: event.target[0].value,
          collection: [],
        },
      ]);
    }
    setNameInput("");
  };

  const deleteCollection = (id) => {
    const tempCollections = loadCollections().filter((collection) => {
      return collection.id !== id;
    });
    console.log("temp", tempCollections);
    saveCollections(tempCollections);
    setCollections(tempCollections);
  };

  return (
    <div className="">
      <h2>My Collections</h2>
      <section className="collection-container">
        {console.log("before error", collections)}
        {collections.map((x, index) => {
          return (
            <CollectionCard
              key={index}
              collectionCard={x}
              selectCollection={selectCollection}
              deleteCollection={deleteCollection}
              collection={collection}
            />
          );
        })}
      </section>
      <section>
        <form onSubmit={handleNewCollectionSubmit}>
          {/* <label htmlFor="addNewCollection">Search here: </label> */}
          <input
            id="addNewCollection"
            type="text"
            placeholder="Collection Name ..."
            onChange={handleChange}
            value={nameInput}
          ></input>
          <button type="submit">Start New Collection</button>
        </form>
      </section>
    </div>
  );
};
