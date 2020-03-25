import React from "react";

import SearchResultContainer from "../components/SearchResultContainer";

function SearchResult(props) {
  return (
    <div className="searchresult-page">
      <SearchResultContainer keyword={props.match.params.keyword} />
    </div>
  );
}

export default SearchResult;
