import { getAICArt, getMMArt, getMMArtByID } from "../components/API";
let mMArtLibFull = {
  objectIDs: Array.from({ length: 494607 }, (_, i) => i + 1),
};
let mMartSearchTerm;

export const getCombinedArtLibrary = (searchQ) => {
  const aICArtLib = getAICArt(searchQ).then((data) => {
    return data;
  });
  const mMArtLib = getMMArt(searchQ).then((data) => {
    mMArtLibFull = data;
    mMartSearchTerm = searchQ;
    const ids = data.objectIDs.slice(0, 10);
    const idsWithData = ids.map((element) => {
      return getMMArtByID(element);
    });
    const firstIDsWithData = Promise.all(idsWithData);
    return firstIDsWithData;
  });

  const mMArtLibStart = () => {
    const ids = mMArtLibFull.objectIDs.slice(0, 10);
    const idsWithData = ids.map((element) => {
      return getMMArtByID(element);
    });
    const firstIDsWithData = Promise.all(idsWithData);
    return firstIDsWithData;
  };

  return Promise.all([
    aICArtLib,
    searchQ !== mMartSearchTerm ? mMArtLib : mMArtLibStart(),
  ]).then(([aICArtdata, mMArtdata]) => {
    const aICArtLibFormat = aICArtIDFormat(aICArtdata);
    const mMArtLibFormat = mMArtIDFormat(mMArtdata);
    return [...aICArtLibFormat, ...mMArtLibFormat];
  });
};

export const aICArtIDFormat = (aICArtLib) => {
  const aICArtIDs = [];
  aICArtLib.forEach((element) => {
    aICArtIDs.push({
      id: "IC" + element.id,
      artist: element.artist_title,
      title: element.title,
      img_url:
        "https://www.artic.edu/iiif/2/" +
        element.image_id +
        "/full/843,/0/default.jpg",
    });
  });
  return aICArtIDs;
};
export const mMArtIDFormat = (mMArtLib) => {
  const mMArtIDs = [];
  mMArtLib.forEach((element) => {
    mMArtIDs.push({
      id: "MM" + element.objectID,
      artist: element.artistDisplayName,
      title: element.title,
      img_url: element.primaryImage ? element.primaryImage : null,
    });
  });
  return mMArtIDs;
};

export const getPageLib = (searchQ, page, publicArt) => {
  const aICArtLib = getAICArt(searchQ, page, publicArt).then((data) => {
    return data;
  });

  const ids = mMArtLibFull.objectIDs.slice(page * 10 - 10, page * 10);
  const idsWithData = ids.map((element) => {
    return getMMArtByID(element);
  });
  const idsWithDataCompleted = Promise.all(idsWithData).then((data) => {
    return data;
  });

  return Promise.all([aICArtLib, idsWithDataCompleted]).then(
    ([aICArtdata, mMArtdata]) => {
      const aICArtLibFormat = aICArtIDFormat(aICArtdata);
      const mMArtLibFormat = mMArtIDFormat(mMArtdata);
      return [...aICArtLibFormat, ...mMArtLibFormat];
    }
  );
};
/* 
[

    {
        "_score": 1491.9911,
        "id": 27992,
        "api_model": "artworks",
        "api_link": "https://api.artic.edu/api/v1/artworks/27992",
        "is_boosted": true,
        "title": "A Sunday on La Grande Jatte — 1884",
        "thumbnail": {
            "lqip": "data:image/gif;base64,R0lGODlhCAAFAPUAAE1WUFVTU1NWUFZYVllbVlpaW1tcWF1cXVxiWl1jWl9mX2NmVWVnXF9eZlxdaGZkYmpmZWRtYGZuY2htZGpsanBsZXVwZXB5Znp+ZXJwaYSAaYiBaYqIbIeAdI2DcYqFcI+FcoiCd5iRcouJgIyKhoyNi4mMjo2RkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAIAAUAAAYlwBLmMmEkCAHTaRTqfB4QEmgj8mgaGY6lsohIHAXKwQBQIAaCIAA7",
            "width": 9310,
            "height": 6237,
            "alt_text": "Large painting of people in a crowded park, brushstrokes are dots."
        },
        "timestamp": "2025-03-04T23:26:34-06:00"
    },
    {
        "_score": 696.2625,
        "id": 75644,
        "api_model": "artworks",
        "api_link": "https://api.artic.edu/api/v1/artworks/75644",
        "is_boosted": true,
        "title": "Coronation Stone of Motecuhzoma II (Stone of the Five Suns)",
        "thumbnail": {
            "lqip": "data:image/gif;base64,R0lGODlhBAAFAPQAACgiHzIrJDMvLDw1L01IQFZUTmZjWm5nXWVpaHFvaH54boF8bYeBcouEdoKEgYGFhIOMj52UhaOdjrSunwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAEAAUAAAUR4BAAwhE1hDJJRsIsBfQ4SAgAOw==",
            "width": 1743,
            "height": 2250,
            "alt_text": "Large plaque of stone carved with animal and geometric hieroglyphs."
        },
        "timestamp": "2025-03-04T23:22:47-06:00"
    },
    {
        "objectID": 5,
        "isHighlight": false,
        "accessionNumber": "67.265.11",
        "accessionYear": "1967",
        "isPublicDomain": false,
        "primaryImage": "",
        "primaryImageSmall": "",
        "additionalImages": [],
        "constituents": null,
        "department": "The American Wing",
        "objectName": "Coin",
        "title": "Two-and-a-Half Dollar Coin",
        "culture": "",
        "period": "",
        "dynasty": "",
        "reign": "",
        "portfolio": "",
        "artistRole": "",
        "artistPrefix": "",
        "artistDisplayName": "",
        "artistDisplayBio": "",
        "artistSuffix": "",
        "artistAlphaSort": "",
        "artistNationality": "",
        "artistBeginDate": "",
        "artistEndDate": "",
        "artistGender": "",
        "artistWikidata_URL": "",
        "artistULAN_URL": "",
        "objectDate": "1909–27",
        "objectBeginDate": 1909,
        "objectEndDate": 1927,
        "medium": "Gold",
        "dimensions": "Diam. 11/16 in. (1.7 cm)",
        "measurements": [
            {
                "elementName": "Other",
                "elementDescription": "Object diameter",
                "elementMeasurements": {
                    "Diameter": 1.7463
                }
            }
        ],
        "creditLine": "Gift of C. Ruxton Love Jr., 1967",
        "geographyType": "",
        "city": "",
        "state": "",
        "county": "",
        "country": "",
        "region": "",
        "subregion": "",
        "locale": "",
        "locus": "",
        "excavation": "",
        "river": "",
        "classification": "",
        "rightsAndReproduction": "",
        "linkResource": "",
        "metadataDate": "2024-01-10T04:57:19.843Z",
        "repository": "Metropolitan Museum of Art, New York, NY",
        "objectURL": "https://www.metmuseum.org/art/collection/search/5",
        "tags": null,
        "objectWikidata_URL": "",
        "isTimelineWork": false,
        "GalleryNumber": ""
    },
    {
        "objectID": 6,
        "isHighlight": false,
        "accessionNumber": "67.265.12",
        "accessionYear": "1967",
        "isPublicDomain": false,
        "primaryImage": "",
        "primaryImageSmall": "",
        "additionalImages": [],
        "constituents": null,
        "department": "The American Wing",
        "objectName": "Coin",
        "title": "Two-and-a-Half Dollar Coin",
        "culture": "",
        "period": "",
        "dynasty": "",
        "reign": "",
        "portfolio": "",
        "artistRole": "",
        "artistPrefix": "",
        "artistDisplayName": "",
        "artistDisplayBio": "",
        "artistSuffix": "",
        "artistAlphaSort": "",
        "artistNationality": "",
        "artistBeginDate": "",
        "artistEndDate": "",
        "artistGender": "",
        "artistWikidata_URL": "",
        "artistULAN_URL": "",
        "objectDate": "1909–27",
        "objectBeginDate": 1909,
        "objectEndDate": 1927,
        "medium": "Gold",
        "dimensions": "Diam. 11/16 in. (1.7 cm)",
        "measurements": [
            {
                "elementName": "Other",
                "elementDescription": "Object diameter",
                "elementMeasurements": {
                    "Diameter": 1.7463
                }
            }
        ],
        "creditLine": "Gift of C. Ruxton Love Jr., 1967",
        "geographyType": "",
        "city": "",
        "state": "",
        "county": "",
        "country": "",
        "region": "",
        "subregion": "",
        "locale": "",
        "locus": "",
        "excavation": "",
        "river": "",
        "classification": "",
        "rightsAndReproduction": "",
        "linkResource": "",
        "metadataDate": "2024-01-10T04:57:19.843Z",
        "repository": "Metropolitan Museum of Art, New York, NY",
        "objectURL": "https://www.metmuseum.org/art/collection/search/6",
        "tags": null,
        "objectWikidata_URL": "",
        "isTimelineWork": false,
        "GalleryNumber": ""
    },

    {
  "data": {
    "id": 129884,
    "api_model": "artworks",
    "api_link": "https://api.artic.edu/api/v1/artworks/129884",
    "is_boosted": true,
    "title": "Starry Night and the Astronauts",
    "alt_titles": null,
    "thumbnail": {
      "lqip": "data:image/gif;base64,R0lGODlhBAAFAPQAABw/Zhg/aBRBaBZBahRCaxxBahxEahNIchZJcR9LdB9OdiZIZSBEbShLbjxRZyBPeipRcSpReUpWaitXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAEAAUAAAURoMJIDhJAywAcAlEkxhNNTQgAOw==",
      "width": 5376,
      "height": 6112,
      "alt_text": "Abstract painting composed of small vertical dabs of multiple shades of blue with a small area of similar strokes of red, orange, and yellow in the upper right."
    },
    "main_reference_number": "1994.36",
    "has_not_been_viewed_much": false,
    "boost_rank": 1,
    "date_start": 1972,
    "date_end": 1972,
    "date_display": "1972",
    "date_qualifier_title": "",
    "date_qualifier_id": null,
    "artist_display": "Alma Thomas\nAmerican, 1891–1978",
    "place_of_origin": "United States",
    "description": "\u003Cp\u003EAfter decades as a representational painter, in her seventies Alma Thomas turned to abstraction, creating shimmering, mosaic-like fields of color with rhythmic dabs of paint that were often inspired by forms from nature. The artist had been fascinated with space exploration since the late 1960s, and her later paintings often referenced America’s manned Apollo missions to the moon. Although she had never flown, Thomas began to paint as if she were in an airplane, capturing what she described as shifting patterns of light and streaks of color. “You look down on things,” she explained. “You streak through the clouds so fast. . . . You see only streaks of color.”\u003C/p\u003E\n\u003Cp\u003E\u003Cem\u003EStarry Night and the Astronauts\u003C/em\u003E evokes the open expanse and celestial patterns of a night sky, but despite its narrative title, the work could also be read as an aerial view of a watery surface, playing with our sense of immersion within an otherwise flat picture plane. The viewer is immersed not only in the sense of organic expanse that this painting achieves, however, but also in an encounter with Thomas’s process: the surface here is clearly constructed stroke by stroke. Meanwhile, the glimpses of raw canvas between each primary-colored mark seem as vivid as the applied paint itself—almost as if the composition were backlit. Thomas relied on the enlivening properties of color throughout her late-blooming career. “Color is life,” she once proclaimed, “and light is the mother of color.” This painting was created in 1972, when the artist was eighty. In the same year, she became the first African American woman to receive a solo exhibition at a major art museum, the Whitney Museum of American Art in New York City.\u003C/p\u003E\n",
    "short_description": "Alma Thomas was enthralled by astronauts and outer space. This painting, made when she was 81, showcases that fascination through her signature style of short, rhythmic strokes of paint. “Color is life, and light is the mother of color,” she once proclaimed. In 1972, she became the first African American woman to have a solo exhibition at the Whitney Museum of American Art in New York.",
    "dimensions": "152.4 × 134.6 cm (60 × 53 in.)",
    "dimensions_detail": [
      {
        "depth": null,
        "width": 134,
        "height": 152,
        "diameter": null,
        "clarification": null
      }
    ],
    "medium_display": "Acrylic on canvas",
    "inscriptions": null,
    "credit_line": "Purchased with funds provided by Mary P. Hines in memory of her mother, Frances W. Pick",
    "catalogue_display": null,
    "publication_history": "Alma Thomas, alma w. thomas, exh. cat. (New York: Whitney Museum of American Art, 1972), n.p., cat. 19. \n\nGene Baro, David C. Driskell, and Jacob Kainen, Alma W. Thomas, exh. cat. (Washington D.C.: Corcoran Gallery of Art, 1972), n.p., cat. 35.\n\nJan Keene Muhlert, Color and Image: Six Artists from Washington, exh. cat. (Iowa City: University of Iowa, 1975), n.p., cat. 80.\n\nAnderson Gallery, Selected Works from the Gallery Collection, exh. checklist (Buffalo: Anderson Gallery), n.p., cat. 23. \n\nAndrea D. Barnwell, “Portfolio,” Art Institute of Chicago Museum Studies 24, 2 (1999), 213, no. 24.\n\nAndrea D. Barnwell and Kirsten P. Buick, “A Portfolio of Works by African American Artists Continuing the Dialogue: A Work in Progress,” Art Institute of Chicago Museum Studies 24, 2 (1999), 187.\n\nIan Berry and Lauren Haynes, Alma Thomas, exh. cat. (Studio Museum in Harlem/Frances Young Tang Teaching Museum and Art Gallery at Skidmore College/DelMonico Books, 2015), 107, 142, 143 (color ill.), 150, 151 (color ill.), 234 (ill.), 246, 250.\n\nRichard Kalina, \"Through Color,\" Art in America, 104, 5 (May 2016), 124 (color ill.), 125.\n\nKen Johnson, \"'Alma Thomas,' and Incandescent Painter\" The New York Times (online), Aug. 4, 2016, https://www.nytimes.com/2016/08/05/arts/design/alma-thomas-an-incandescent-pioneer.html \n\nSeth Feman and Jonathan Frederick Walz, eds. Alma W. Thomas: Everything Is Beautiful, exh. cat. (Columbus, GA: The Columbus Museum, 2021), 295, cat. 143 (color ill.).\n\nNeil Steinberg, “Art can take you to a particular place,” Chicago Tribune, Dec. 20, 2023, 2 (color ill.).",
    "exhibition_history": "New York, Whitney Museum of American Art, Alma W. Thomas Retrospective, Apr. 25–May 28, 1972, cat. 19.\n\nWashington D.C., Corcoran Gallery of Art, Alma W. Thomas Retrospective Exhibition, Sept. 8–Oct. 15, 1972, cat. 35.\n\nNew York, Martha Jackson Gallery, Alma Thomas, Oct. 10–Nov. 3, 1973, not in cat.\n\nNew York, Women’s International Art Center, Ten Black Women, May 1–23, 1975, no cat.\n\nIowa City, University of Iowa, Color and Image: Six Artists from Washington, Sept. 5–Nov. 18, 1975, cat. 80.\n\nBuffalo, Anderson Gallery, Selected Works from the Gallery Collection, Oct. 5–Nov. 16, 1991, cat. 23, exhibition checklist. \n\nSaratoga, Frances Young Tang Teaching Museum and Art Gallery at Skidmore College, Alma Thomas, Feb. 6–June 5, no cat. no.; New York, Studio Museum in Harlem, July 14–Oct. 30, 2016.\n\nNorfolk, VA, Chrysler Museum of Art, Alma W. Thomas: Everything is Beautiful, July 9, 2021-Oct. 3, 2021, cat. 143; Washington D.C., The Phillips Collection, Oct. 30, 2021-Jan. 23, 2022; Nashville, Frist Center for the Visual Arts, Feb. 25, 2022-June 5, 2022; Columbus, GA, Columbus Museum July 1, 2022- Sept. 25, 2022.",
    "provenance_text": "The artist; sold to Martha Jackson Gallery [later Anderson Gallery, Buffalo, NY], New York, Oct. 9, 1973 [invoice; copy in curatorial object file]; sold to the Art Institute of Chicago, Mar. 14, 1994.",
    "edition": null,
    "publishing_verification_level": "Web Cataloged",
    "internal_department_id": 246,
    "fiscal_year": 1994,
    "fiscal_year_deaccession": null,
    "is_public_domain": false,
    "is_zoomable": true,
    "max_zoom_window_size": 1280,
    "copyright_notice": "© Estate of Alma Thomas (Courtesy of the Hart Family) / Artists Rights Society (ARS), New York",
    "has_multimedia_resources": false,
    "has_educational_resources": false,
    "has_advanced_imaging": false,
    "colorfulness": 53.6375,
    "color": {
      "h": 45,
      "l": 49,
      "s": 94,
      "percentage": 0.0035946655163737,
      "population": 29
    },
    "latitude": 41.8805769576144,
    "longitude": -87.6218733015747,
    "latlon": "41.880576957614,41.880576957614",
    "is_on_view": true,
    "on_loan_display": null,
    "gallery_title": "Regenstein Hall",
    "gallery_id": 2147475902,
    "nomisma_id": null,
    "artwork_type_title": "Painting",
    "artwork_type_id": 1,
    "department_title": "Contemporary Art",
    "department_id": "PC-8",
    "artist_id": 44708,
    "artist_title": "Alma Thomas",
    "alt_artist_ids": [],
    "artist_ids": [44708],
    "artist_titles": [
      "Alma Thomas"
    ],
    "category_ids": [
      "PC-8",
      "PC-142",
      "PC-825",
      "PC-830"
    ],
    "category_titles": [
      "Contemporary Art",
      "African American artists",
      "Women artists",
      "African Diaspora"
    ],
    "term_titles": [
      "painting",
      "painting (image making)",
      "acrylic paint",
      "patterns",
      "contemporary",
      "canvas",
      "blue (color)",
      "red (color)",
      "orange (color)",
      "yellow (color)",
      "modern and contemporary art"
    ],
    "style_id": "TM-12062",
    "style_title": "contemporary",
    "alt_style_ids": [],
    "style_ids": [
      "TM-12062"
    ],
    "style_titles": [
      "contemporary"
    ],
    "classification_id": "TM-9",
    "classification_title": "painting",
    "alt_classification_ids": [
      "TM-155"
    ],
    "classification_ids": [
      "TM-9",
      "TM-155"
    ],
    "classification_titles": [
      "painting",
      "modern and contemporary art"
    ],
    "subject_id": "TM-12793",
    "alt_subject_ids": [
      "TM-11843",
      "TM-11851",
      "TM-11905",
      "TM-11842"
    ],
    "subject_ids": [
      "TM-12793",
      "TM-11843",
      "TM-11851",
      "TM-11905",
      "TM-11842"
    ],
    "subject_titles": [
      "patterns",
      "blue (color)",
      "red (color)",
      "orange (color)",
      "yellow (color)"
    ],
    "material_id": "TM-2407",
    "alt_material_ids": [
      "TM-3124"
    ],
    "material_ids": [
      "TM-2407",
      "TM-3124"
    ],
    "material_titles": [
      "acrylic paint",
      "canvas"
    ],
    "technique_id": "TM-3891",
    "alt_technique_ids": [],
    "technique_ids": [
      "TM-3891"
    ],
    "technique_titles": [
      "painting (image making)"
    ],
    "theme_titles": [
      "African American artists",
      "Women artists",
      "African Diaspora"
    ],
    "image_id": "e966799b-97ee-1cc6-bd2f-a94b4b8bb8f9",
    "alt_image_ids": [],
    "document_ids": [],
    "sound_ids": [],
    "video_ids": [],
    "text_ids": [],
    "section_ids": [],
    "section_titles": [],
    "site_ids": [],
    "suggest_autocomplete_boosted": "Starry Night and the Astronauts",
    "suggest_autocomplete_all": [
      {
        "input": [
          "1994.36"
        ],
        "contexts": {
          "groupings": [
            "accession"
          ]
        }
      },
      {
        "input": [
          "Starry Night and the Astronauts"
        ],
        "weight": 35074,
        "contexts": {
          "groupings": [
            "title"
          ]
        }
      }
    ],
    "source_updated_at": "2025-01-22T15:55:48-06:00",
    "updated_at": "2025-03-04T23:20:08-06:00",
    "timestamp": "2025-03-05T16:24:49-06:00"
  },
  "info": {
    "license_text": "The `description` field in this response is licensed under a Creative Commons Attribution 4.0 Generic License (CC-By) and the Terms and Conditions of artic.edu. All other data in this response is licensed under a Creative Commons Zero (CC0) 1.0 designation and the Terms and Conditions of artic.edu.",
    "license_links": [
      "https://creativecommons.org/publicdomain/zero/1.0/",
      "https://www.artic.edu/terms"
    ],
    "version": "1.13"
  },
  "config": {
    "iiif_url": "https://www.artic.edu/iiif/2",
    "website_url": "http://www.artic.edu"
  }
}

] */
