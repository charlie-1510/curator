export const loadCollections = () => {
  return JSON.parse(localStorage.getItem("collections"));
};

export const loadCollectionID = () => {
  return JSON.parse(localStorage.getItem("collectionID"));
};

export const saveCollections = (collections) => {
  localStorage.setItem("collections", JSON.stringify(collections));
};

export const saveCollectionID = (collectionID) => {
  localStorage.setItem("collectionID", JSON.stringify(collectionID));
};
