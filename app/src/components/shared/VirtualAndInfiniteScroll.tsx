import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  List,
  WindowScroller,
} from "react-virtualized";

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
  return (
    <CellMeasurer key={key} cache={cache.current} parent={parent} rowIndex={index} columnIndex={0}>
      {({ measure, registerChild }) =>
        renderRow({ item: list[index], style, measure, registerChild })
      }
    </CellMeasurer>
  );
};

export default function VirtualAndInfiniteScroll({
  renderRow,
  loaderComponent,
  totalCount,
  fetchHandler,
  list,
  className = "",
  isNextPageLoading,
}: {
  renderRow: ({ item, style }) => ReactElement<React.FC>;
  loaderComponent: ReactElement<React.FC>;
  totalCount: number;
  fetchHandler: (page: number) => Promise<unknown>;
  list: Array<unknown>;
  className?: string;
}) {
  const cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 700,
      fixedWidth: true,
    })
  );

  function isRowLoaded({ index }) {
    return !!list[index];
  }

  const handleNewPageLoad = async () => {
    let pageCount = Math.floor(list.length / 7) + 1;

    if (isNextPageLoading) {
      return;
    }
    await fetchHandler(pageCount);
  };

  let [listRef, setListRef] = useState(null);

  const reset = () => {
    // Recompute row heights and offsets
    listRef?.recomputeRowHeights();
    // Reset cached measurements for all cells.
    cache.current.clearAll();
  };

  useEffect(() => {
    reset();

    window.addEventListener("resize", reset);

    return () => window.removeEventListener("resize", reset);
  }, [list]);

  console.log('wt')
  if (!isNextPageLoading && !list.length) {
    return null;
  }
  console.log('wtf')
  return (
    <div className={`mt-4 ${className} h-full`}>
      <AutoSizer disableHeight={true}>
        {({ width }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={handleNewPageLoad}
                rowCount={totalCount}
                threshold={8}
              >
                {({ onRowsRendered, registerChild }) => (
                  <List
                    style={{ overflowY: "auto" }}
                    deferredMeasurementCache={cache.current}
                    autoHeight
                    onRowsRendered={onRowsRendered}
                    ref={(el) => {
                      setListRef(el);
                      registerChild(el);
                    }}
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    rowCount={list.length}
                    rowHeight={cache.current.rowHeight}
                    rowRenderer={(rowData) => rowRenderer({ cache, list, renderRow, rowData })}
                    scrollTop={scrollTop}
                    width={width}
                  />
                )}
              </InfiniteLoader>
            )}
          </WindowScroller>
        )}
      </AutoSizer>
      {/* <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={handleNewPageLoad}
        rowCount={totalCount}
        ref={(ref) => setInfiniteLoaderRef(ref)}
      >
        {({ onRowsRendered, registerChild }) => (
          <div className="h-full " style={{ flex: '1 1 auto' }}>
            <AutoSizer>
              {({ width, height }) => {
                
                return (
                  <List
                    rowCount={list.length}
                    width={width}
                    height={height}
                    rowHeight={cache.current.rowHeight}
                    rowRenderer={(rowData) =>
                      rowRenderer({ cache, list, renderRow, rowData, height })
                    }
                    deferredMeasurementCache={cache.current.cellMeasurerCache}
                    overscanRowCount={0}
                    onRowsRendered={onRowsRendered}
                    ref={(el) => {
                      setListRef(el);
                      registerChild(el);
                    }}
                  />
                );
              }}
            </AutoSizer>
          </div>
        )}
      </InfiniteLoader> */}
      {isNextPageLoading && loaderComponent}
    </div>
  );
}
