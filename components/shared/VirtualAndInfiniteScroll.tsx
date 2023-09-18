import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  AutoSizer,
  InfiniteLoader,
  List,
  WindowScroller,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";
// import "./styles.css";

/*
  Row Component
  loader component
  Fetch Action
  Total Count
*/

const REPOSITORIES_PER_PAGE = 100;
const BASE_GITHUB_API_URL = "https://api.github.com";
const GITHUB_API_SEARCH_QUERY = `/search/repositories?q=language:javascript&sort=stars&per_page=${REPOSITORIES_PER_PAGE}`;

const handleRedirectToRepository = (repositoryUrl) => {
  window.open(repositoryUrl, "_blank");
};

const fetchRepositories = async (page) => {
  try {
    const { data } = await axios.get(
      `${BASE_GITHUB_API_URL}${GITHUB_API_SEARCH_QUERY}&page=${page}`
    );

    return data.items;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching repositories from the GitHub API!");
  }
};

// Generate a random string of 200 characters
function generateRandomString() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let l = Math.floor(Math.random() * 1000);
  for (let i = 0; i < l; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    if (i % 4 == 0) {
      result += " ";
    }
  }
  result += "END";

  return result;
}

const Row = ({ style, repository }) => (
  <div
    className="bg-white bg-red-200 p-4"
    style={style}
    onClick={() => handleRedirectToRepository(repository.html_url)}
  >
    <p>{repository.full_name}</p>
  </div>
);

export default function VirtualAndInfiniteScroll() {
  const [pageCount, setPageCount] = useState(1);
  const [repositories, setRepositories] = useState([]);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 400,
    })
  );

  useEffect(() => {
    (async () => {
      let repositories = await fetchRepositories(1);

      repositories = repositories.map((repo) => {
        repo.full_name = generateRandomString();
        return repo;
      });

      setRepositories(repositories);
      setPageCount((pageCount) => pageCount + 1);
    })();
  }, []);

  const rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
    parent,
  }) => {
    return (
      <CellMeasurer
        key={key}
        cache={cache.current}
        parent={parent}
        rowIndex={index}
        columnIndex={0}
      >
        <Row style={style} repository={repositories[index]} />
      </CellMeasurer>
    );
  };

  function isRowLoaded({ index }) {
    return !!repositories[index];
  }

  const handleNewPageLoad = async () => {
    setIsNextPageLoading(true);
    const repositories = await fetchRepositories(pageCount);

    setPageCount((pageCount) => pageCount + 1);
    setRepositories((currentRepositories) => [
      ...currentRepositories,
      ...repositories,
    ]);
    setIsNextPageLoading(false);
    return;
  };

  const loadMoreRows = isNextPageLoading ? () => {} : handleNewPageLoad;

  if (!repositories.length) return <span>Loading initial repositories</span>; // TODO loader component

  return (
    <div className="container text-black">
      <div className="repositoriesWrapper">
        <AutoSizer disableHeight={true}>
          {({ width }) => (
            <WindowScroller>
              {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <InfiniteLoader
                  isRowLoaded={isRowLoaded}
                  loadMoreRows={loadMoreRows}
                  rowCount={200}
                >
                  {({ onRowsRendered, registerChild }) => (
                    <List
                      deferredMeasurementCache={cache.current}
                      autoHeight
                      onRowsRendered={onRowsRendered}
                      ref={registerChild}
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      rowCount={repositories.length}
                      rowHeight={cache.current.rowHeight}
                      rowRenderer={rowRenderer}
                      scrollTop={scrollTop}
                      width={width}
                    />
                  )}
                </InfiniteLoader>
              )}
            </WindowScroller>
          )}
        </AutoSizer>
        {isNextPageLoading && <span>loading more repositories..</span>}
        {/* TODO ADD LOADER HERE */}
      </div>
    </div>
  );
}
