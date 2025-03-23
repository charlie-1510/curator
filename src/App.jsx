import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { ArtPiece } from "./components/ArtPiece";
import { MyCollections } from "./components/MyCollections";
import { Collection } from "./components/Collection";
import { Error } from "./components/Error";
import {
  saveCollections,
  loadCollections,
  loadCollectionID,
  saveCollectionID,
} from "./utils/CollectionsFunctions";

function App() {
  const [collection, setCollection] = useState({});
  const [collections, setCollections] = useState([
    { id: 0, name: "My First Collection", collection: [] },
  ]);

  const addToCollection = (art) => {
    const tempCol = loadCollections();
    console.log(collections, "main collections");
    console.log(collection, "collection in add");
    console.log(tempCol, "temp");
    console.log("art", art);
    console.log("temp col");

    if (
      tempCol[
        tempCol.findIndex((col) => {
          return col.id === collection.id;
        })
      ].collection
        .map((artwork) => {
          return artwork.id === art.id;
        })
        .includes(true)
    ) {
      console.log("includes it");
    } else {
      tempCol[
        tempCol.findIndex((col) => {
          return col.id === collection.id;
        })
      ].collection.push(art);
    }
    console.log("new main", tempCol);
    saveCollections(tempCol);
    setCollections(tempCol);
    selectCollection(loadCollectionID());
  };
  const removeFromCollection = (artID, collection_id) => {
    const tempCol = loadCollections();
    const collectionIndex = tempCol.findIndex((col) => {
      return col.id === +collection_id;
    });
    console.log("finding", collectionIndex);
    const amendedCollection = tempCol[
      tempCol.findIndex((col) => {
        return col.id === +collection_id;
      })
    ].collection.filter((art) => {
      return art.id !== artID;
    });
    console.log(amendedCollection, "amended collection");
    tempCol[collectionIndex].collection = amendedCollection;
    console.log("temp col", tempCol);
    saveCollections(tempCol);
    setCollections(tempCol);
    selectCollection(loadCollectionID());
  };

  const selectCollection = (id) => {
    saveCollectionID(id);
    setCollection(
      loadCollections().filter((collection) => {
        return collection.id === id;
      })[0]
    );
  };

  useEffect(() => {
    console.log("first try", loadCollections()[0]);

    if (loadCollections()[0].collection) {
      setCollections(loadCollections());
      selectCollection(loadCollectionID());
    } else {
      saveCollections([{ id: 0, name: "My First Collection", collection: [] }]);
      setCollections([{ id: 0, name: "My First Collection", collection: [] }]);
      selectCollection(0);
    }
    console.log("uE", collections);
  }, []);

  return (
    <>
      <div className="app">
        <Header collection={collection} />

        <Routes>
          <Route
            path="/"
            element={
              <Content
                addToCollection={addToCollection}
                removeFromCollection={removeFromCollection}
                collection={collection}
              />
            }
          />
          <Route
            path="/library/:art_id"
            element={
              <ArtPiece
                addToCollection={addToCollection}
                removeFromCollection={removeFromCollection}
                collection={collection}
              />
            }
          />
          <Route
            path="/mycollections"
            element={
              <MyCollections
                collection={collection}
                setCollection={setCollection}
                collections={collections}
                setCollections={setCollections}
                selectCollection={selectCollection}
              />
            }
          />
          <Route
            path="/mycollections/:collection_id"
            element={
              <Collection
                collections={collections}
                removeFromCollection={removeFromCollection}
              />
            }
          />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
