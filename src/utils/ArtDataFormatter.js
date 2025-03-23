export const formatArtData = (data, [artMuseum, art_ID]) => {
  const formattedArtData = {
    Title: "No Information Provided",
    Artist: "No Information Provided",
    Date: "No Information Provided",
    Origin: "No Information Provided",
    Description: "No Information Provided",
    more: data,
  };

  if (artMuseum === "IC") {
    formattedArtData.Title =
      (data.title === "") | (data.title === null)
        ? "No Information Provided"
        : data.title;
    formattedArtData.Artist =
      (data.artist_display === "") | (data.artist_display === null)
        ? "No Information Provided"
        : data.artist_display;
    formattedArtData.Date =
      (data.date_start === "") | (data.date_start === null)
        ? "No Information Provided"
        : data.date_start;
    formattedArtData.Description =
      (data.description === "") | (data.description === null)
        ? "No Information Provided"
        : data.description;
    formattedArtData.Origin =
      (data.place_of_origin === "") | (data.place_of_origin === null)
        ? "No Information Provided"
        : data.place_of_origin;
  }
  if (artMuseum === "MM") {
    formattedArtData.Title =
      data.title === "" ? "No Information Provided" : data.title;
    formattedArtData.Artist =
      data.artistDisplayName === ""
        ? "No Information Provided"
        : data.artistDisplayName;
    if (data.objectDate && data.objectDate != "") {
      formattedArtData.Date = data.objectDate;
    } else {
      formattedArtData.Date = data.objectBeginDate;
    }
    formattedArtData.Origin =
      data.country === ""
        ? data.culture === ""
          ? "No Information Provided"
          : data.culture
        : data.country;
  }
  return formattedArtData;
  //title,artist,description*,date,origin,everything
};

/* 

IC

found: object with keys {id, api_model, api_link, is_boosted, title, alt_titles, thumbnail, main_reference_number, has_not_been_viewed_much, boost_rank, date_start, date_end, date_display, date_qualifier_title, date_qualifier_id, artist_display, place_of_origin, description, short_description, dimensions, dimensions_detail, medium_display, inscriptions, credit_line, catalogue_display, publication_history, exhibition_history, provenance_text, edition, publishing_verification_level, internal_department_id, fiscal_year, fiscal_year_deaccession, is_public_domain, is_zoomable, max_zoom_window_size, copyright_notice, has_multimedia_resources, has_educational_resources, has_advanced_imaging, colorfulness, color, latitude, longitude, latlon, is_on_view, on_loan_display, gallery_title, gallery_id, nomisma_id, artwork_type_title, artwork_type_id, department_title, department_id, artist_id, artist_title, alt_artist_ids, artist_ids, artist_titles, category_ids, category_titles, term_titles, style_id, style_title, alt_style_ids, style_ids, style_titles, classification_id, classification_title, alt_classification_ids, classification_ids, classification_titles, subject_id, alt_subject_ids, subject_ids, subject_titles, material_id, alt_material_ids, material_ids, material_titles, technique_id, alt_technique_ids, technique_ids, technique_titles, theme_titles, image_id, alt_image_ids, document_ids, sound_ids, video_ids, text_ids, section_ids, section_titles, site_ids, suggest_autocomplete_boosted, suggest_autocomplete_all, source_updated_at, updated_at, timestamp}). If you meant to render a collection of children, use an array instead.
*/

/*

MM

found: object with keys {objectID, isHighlight, accessionNumber, accessionYear, isPublicDomain, primaryImage, primaryImageSmall, additionalImages, constituents, department, objectName, title, culture, period, dynasty, reign, portfolio, artistRole, artistPrefix, artistDisplayName, artistDisplayBio, artistSuffix, artistAlphaSort, artistNationality, artistBeginDate, artistEndDate, artistGender, artistWikidata_URL, artistULAN_URL, objectDate, objectBeginDate, objectEndDate, medium, dimensions, measurements, creditLine, geographyType, city, state, county, country, region, subregion, locale, locus, excavation, river, classification, rightsAndReproduction, linkResource, metadataDate, repository, objectURL, tags, objectWikidata_URL, isTimelineWork, GalleryNumber}). If you meant to render a collection of children, use an array instead.
*/
