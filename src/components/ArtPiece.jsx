import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAICArtByID, getMMArtByID } from "./API";
import { formatArtData } from "../utils/ArtDataFormatter";
import parse from "html-react-parser";
import { aICArtIDFormat, mMArtIDFormat } from "../utils/LibraryCombinor";

export const ArtPiece = ({
  addToCollection,
  removeFromCollection,
  collection,
}) => {
  const { art_id } = useParams();
  const [artInfo, setArtInfo] = useState({ more: "" });
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const idBreakdown = (art_id) => {
    const artMuseum = art_id.slice(0, 2);
    const art_ID = art_id.slice(2);
    return [artMuseum, art_ID];
  };

  const getArtInfo = () => {
    if (idBreakdown(art_id)[0] === "IC") {
      getAICArtByID(idBreakdown(art_id)[1]).then((data) => {
        setArtInfo(formatArtData(data, idBreakdown(art_id)));
        setIsLoading(false);
      });
    }
    if (idBreakdown(art_id)[0] === "MM") {
      getMMArtByID(idBreakdown(art_id)[1]).then((data) => {
        setArtInfo(formatArtData(data, idBreakdown(art_id)));
        setIsLoading(false);
      });
    }
  };

  const getImageUrl = (artInfo) => {
    if (idBreakdown(art_id)[0] === "IC") {
      return `https://www.artic.edu/iiif/2/${artInfo.more.image_id}/full/843,/0/default.jpg`;
    }
    if (idBreakdown(art_id)[0] === "MM") {
      return artInfo.more.primaryImage;
    }
  };

  const getFormattedArtInfo = () => {
    if (idBreakdown(art_id)[0] === "IC") {
      return aICArtIDFormat([artInfo.more])[0];
    }
    if (idBreakdown(art_id)[0] === "MM") {
      return mMArtIDFormat([artInfo.more])[0];
    }
  };

  useEffect(() => {
    getArtInfo();
  }, []);

  return (
    <div className="">
      {isLoading === true ? (
        <span className="loader"></span>
      ) : (
        <div>
          <div className="">
            <h1>{artInfo.Title} </h1> <p> </p>
            <h5>
              <i> ({artInfo.Artist})</i>
            </h5>
          </div>
          <div className="art-piece-container">
            <div className="art-piece-image-container">
              {getImageUrl(artInfo) !== "" ? (
                <img
                  className="art-piece-image"
                  src={getImageUrl(artInfo)}
                ></img>
              ) : (
                <h1>No Image Provided</h1>
              )}
            </div>

            <div className="art-piece-button-container">
              {collection.collection ? (
                collection.collection
                  .map((artwork) => {
                    return artwork.id === art_id;
                  })
                  .includes(true) ? (
                  <button
                    onClick={() => {
                      removeFromCollection(art_id, collection.id);
                    }}
                  >
                    Remove from collection
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addToCollection(getFormattedArtInfo());
                    }}
                  >
                    Add to collection
                  </button>
                )
              ) : null}
            </div>

            <div className="art-piece-info-container">
              <ul className="art-piece-info">
                {Object.keys(artInfo).map((detail, i) => {
                  return detail != "more" ? (
                    typeof artInfo[detail] === "string" ? (
                      <li key={i}>
                        <b>{detail}:</b> {parse(artInfo[detail])}
                      </li>
                    ) : (
                      <li key={i}>
                        <b>{detail}:</b> {artInfo[detail]}
                      </li>
                    )
                  ) : null;
                })}

                {showAll === true
                  ? Object.keys(artInfo.more).map((detail, i) => {
                      return typeof artInfo.more[detail] !== "object" ? (
                        typeof artInfo.more[detail] === "string" ? (
                          <li key={i}>
                            <b>{detail}:</b> {parse(artInfo.more[detail])}
                          </li>
                        ) : (
                          <li key={i}>
                            <b>{detail}:</b> {artInfo.more[detail]}
                          </li>
                        )
                      ) : null;
                    })
                  : null}

                {showAll === false ? (
                  <button
                    onClick={() => {
                      setShowAll(true);
                    }}
                  >
                    View All Information
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowAll(false);
                    }}
                  >
                    Hide Extra Information
                  </button>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
