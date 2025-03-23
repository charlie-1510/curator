import { useState, useEffect } from "react";
import { Library } from "./Library";
import { Search } from "./Search";
import { getCombinedArtLibrary } from "../utils/LibraryCombinor";

export const Content = ({
  addToCollection,
  removeFromCollection,
  collection,
}) => {
  const [library, setLibrary] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    console.log("in ue content");
    setLibrary([]);
    getInitialArt();
  }, [searchTerm]);

  const getInitialArt = () => {
    getCombinedArtLibrary(searchTerm).then((data) => {
      setLibrary(data);
      setPage(1);
    });
  };

  return (
    <div className="content">
      <section className="search-container">
        <Search
          setLibrary={setLibrary}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </section>
      <section className="library-container">
        <Library
          library={library}
          setLibrary={setLibrary}
          page={page}
          setPage={setPage}
          searchTerm={searchTerm}
          addToCollection={addToCollection}
          removeFromCollection={removeFromCollection}
          collection={collection}
        />
      </section>
    </div>
  );
};
