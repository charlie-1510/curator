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
  publicArt,
  sort /* search queries*/
) => {
  console.log("in API het AIC");
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
      //console.log("hello api", response.data);
      return response.data.data;
    })
    .catch((error) => {
      console.error(error, "error");
      return error;
    });
};

export const getMMArt = (searchQ, sort /* search queries*/) => {
  console.log("in API get MM", searchQ);
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
        //console.log("hello api", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error, "error");
        return error;
      });
  }
};

export const getMMArtByID = (id /* search queries*/) => {
  console.log("in API get MM ID");
  return mmAPI
    .get(`/objects/${id}`, {
      params: {},
    })
    .then((response) => {
      //console.log("hello api", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error, "error");
      return error;
    });
};

export const getAICArtByID = (id /* search queries*/) => {
  console.log("in API get AIC ID");
  return aicAPI
    .get(`/${id}`, {
      params: {},
    })
    .then((response) => {
      //console.log("hello api", response.data);
      return response.data.data;
    })
    .catch((error) => {
      console.error(error, "error");
      return error;
    });
};
