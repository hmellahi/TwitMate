import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  AutoSizer,
  InfiniteLoader,
  List,
  WindowScroller,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";
// import "./styles.css";

// const REPOSITORIES_PER_PAGE = 100;
// const BASE_GITHUB_API_URL = "https://api.github.com";
// const GITHUB_API_SEARCH_QUERY = `/search/repositories?q=language:javascript&sort=stars&per_page=${REPOSITORIES_PER_PAGE}`;

// const handleRedirectToRepository = (repositoryUrl) => {
//   window.open(repositoryUrl, "_blank");
// };

// const fetchRepositories = async (page) => {
//   try {
//     const { data } = await axios.get(
//       `${BASE_GITHUB_API_URL}${GITHUB_API_SEARCH_QUERY}&page=${page}`
//     );

//     return data.items;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error while fetching repositories from the GitHub API!");
//   }
// };

// Generate a random string of 200 characters
// function generateRandomString() {
//   let result = "";
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   let l = Math.floor(Math.random() * 1000);
//   for (let i = 0; i < l; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//     if (i % 4 == 0) {
//       result += " ";
//     }
//   }
//   result += "END";

//   return result;
// }

// const Row = ({ style, repository }) => (
//   <div className="bg-white bg-red-200 p-4" style={style}>
//     <p>{repository.full_name}</p>
//   </div>
// );

const rowRenderer = ({
  cache,
  list,
  renderRow,
  rowData: {
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
    parent,
  },
}) => {
  const RowComponent = renderRow({ item: list[index], style });
  return (
    <CellMeasurer
      key={key}
      cache={cache.current}
      parent={parent}
      rowIndex={index}
      columnIndex={0}
    >
      <RowComponent />
    </CellMeasurer>
  );
};

export default function VirtualAndInfiniteScroll({
  renderRow,
  loaderComponent,
  totalCount,
  fetchHandler,
}: {
  renderRow: () => ReactElement<React.FC>;
  loaderComponent: ReactElement<React.FC>;
  totalCount: number;
  fetchHandler: (page: number) => Promise<unknown>;
}) {
  const [pageCount, setPageCount] = useState(1);
  const [list, setList] = useState([]);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 400,
    })
  );

  useEffect(() => {
    (async () => {
      let list = await fetchHandler(1);
      console.log({list})
      setList(list);
      setPageCount((pageCount) => pageCount + 1);
    })();
  }, []);

  function isRowLoaded({ index }) {
    return !!list[index];
  }

  const handleNewPageLoad = async () => {
    setIsNextPageLoading(true);
    const nextPageList = await fetchHandler(pageCount); // TODO change this to use the fetch method prop
    setPageCount((pageCount) => pageCount + 1);
    setList((currentList) => [...currentList, ...nextPageList]);
    setIsNextPageLoading(false);
    return;
  };

  const loadMoreRows = isNextPageLoading ? () => {} : handleNewPageLoad;

  if (!list.length) return loaderComponent; // TODO loader component

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
                  rowCount={totalCount}
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
                      rowCount={list.length}
                      rowHeight={cache.current.rowHeight}
                      rowRenderer={(rowData) =>
                        rowRenderer({ cache, list, renderRow, rowData })
                      }
                      scrollTop={scrollTop}
                      width={width}
                    />
                  )}
                </InfiniteLoader>
              )}
            </WindowScroller>
          )}
        </AutoSizer>
        {isNextPageLoading && loaderComponent}
        {/* TODO ADD LOADER HERE */}
      </div>
    </div>
  );
}
