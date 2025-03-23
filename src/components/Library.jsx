import { getPageLib } from "../utils/LibraryCombinor";
import { ArtCard } from "./ArtCard";

export const Library = ({
  library,
  setLibrary,
  page,
  setPage,
  searchTerm,
  addToCollection,
  removeFromCollection,
  collection,
}) => {
  console.log("libr", library);

  const handleNextPage = () => {
    setLibrary([]);
    getPageLib(searchTerm, page + 1, null).then((data) => {
      console.log("Next", data);
      setLibrary(data);
    });
    setPage(page + 1);
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setLibrary([]);
      getPageLib(searchTerm, page - 1, null).then((data) => {
        console.log("Previous", data);
        setLibrary(data);
      });
      setPage(page - 1);
    }
  };
  return (
    <div className="library">
      <section className="page_section">
        {
          <button onClick={handlePreviousPage} className="">
            Previous Page
          </button>
        }
        <p>Current Page: {page}</p>
        <button onClick={handleNextPage} className="">
          Next Page
        </button>
      </section>
      <section className="art-card-container">
        {library[0] ? (
          library.map((art, index) => {
            return art.artist || art.title || art.img_url ? (
              <ArtCard
                key={index}
                art_info={art}
                addToCollection={addToCollection}
                removeFromCollection={removeFromCollection}
                collection={collection}
              />
            ) : null;
          })
        ) : (
          <span className="loader"></span>
        )}
      </section>
    </div>
  );
};
