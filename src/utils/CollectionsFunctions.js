export const loadCollections = () => {
  console.log("in load", JSON.parse(localStorage.getItem("collections")));
  return JSON.parse(localStorage.getItem("collections"));
};

export const loadCollectionID = () => {
  console.log(
    "coll ID in load",
    JSON.parse(localStorage.getItem("collectionID"))
  );
  return JSON.parse(localStorage.getItem("collectionID"));
};

export const saveCollections = (collections) => {
  localStorage.setItem("collections", JSON.stringify(collections));
  console.log(collections, "in save");
};

export const saveCollectionID = (collectionID) => {
  localStorage.setItem("collectionID", JSON.stringify(collectionID));
  console.log(collectionID, "coll ID in save");
};
