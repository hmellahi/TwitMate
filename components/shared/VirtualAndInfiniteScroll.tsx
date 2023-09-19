import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  AutoSizer,
  InfiniteLoader,
  List,
  WindowScroller,
  CellMeasurerCache,
  CellMeasurer,
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
  const RowComponent = renderRow({ item: list[index], style });
  return (
    <CellMeasurer
      key={key}
      cache={cache.current}
      parent={parent}
      rowIndex={index}
      columnIndex={0}
    >
      {RowComponent}
    </CellMeasurer>
  );
};

export default function VirtualAndInfiniteScroll({
  renderRow,
  loaderComponent,
  totalCount,
  fetchHandler,
  initialList,
  className,
}: {
  renderRow: ({ item, style }) => ReactElement<React.FC>;
  loaderComponent: ReactElement<React.FC>;
  totalCount: number;
  fetchHandler: (page: number) => Promise<unknown>;
  initialList: Array<unknown>;
  className?: string;
}) {
  const [pageCount, setPageCount] = useState(1);
  const [list, setList] = useState(initialList);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 400,
    })
  );

  function isRowLoaded({ index }) {
    return !!list[index];
  }

  const handleNewPageLoad = async () => {
    setIsNextPageLoading(true);
    const nextPageList = await fetchHandler(pageCount);
    setPageCount((pageCount) => pageCount + 1);
    setList((currentList) => [...currentList, ...nextPageList]);
    setIsNextPageLoading(false);
    return;
  };

  const loadMoreRows = isNextPageLoading ? () => {} : handleNewPageLoad;

  const filterdList = list.filter((item) => item.isDeleted !== true);

  if (!filterdList.length) return loaderComponent;

  return (
    <div className={`${className}`}>
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
                    rowCount={filterdList.length}
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
    </div>
  );
}
