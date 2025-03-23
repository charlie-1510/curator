import axios from "axios";

const aicAPI = axios.create({
  baseURL: "https://api.artic.edu/api/v1/artworks",
});

const mmAPI = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
});

export const getAICArt = (
  searchQ,
  page = 1,
  publicArt
  //sort
) => {
  return aicAPI
    .get("/search/", {
      params: {
        q: searchQ,
        page: page,
        fields: "id,title,artist_title,image_id",
        "query[term][is_public_domain]": publicArt /* ,sort*/,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error, "error");
      return error;
    });
};

export const getMMArt = (searchQ, sort /* search queries*/) => {
  if (searchQ) {
    return mmAPI
      .get("/search", {
        params: { q: searchQ /*sort*/ },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error, "error");
        return error;
      });
  } else {
    return mmAPI
      .get("/objects", {
        params: { q: searchQ /*sort*/ },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error, "error");
        return error;
      });
  }
};

export const getMMArtByID = (id) => {
  return mmAPI
    .get(`/objects/${id}`, {
      params: {},
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error, "error");
      return error;
    });
};

export const getAICArtByID = (id) => {
  return aicAPI
    .get(`/${id}`, {
      params: {},
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error, "error");
      return error;
    });
};
