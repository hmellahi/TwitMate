import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  AutoSizer,
  InfiniteLoader,
  List,
  WindowScroller,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";

const Row = ({ ref, style, repository }) => (
  <div ref={ref} className=" py-52" style={style}>
    Hello
  </div>
);

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
  // const RowComponent = renderRow({ item: list[index], style });
  return (
    <CellMeasurer
      key={key}
      cache={cache.current}
      parent={parent}
      rowIndex={index}
      columnIndex={0}
    >
      {/* <Row ref={registerChild} style={style} repository={list[index]} /> */}

      {/* {RowComponent} */}
      {({ measure, registerChild }) =>
        renderRow({ item: list[index], style, measure, registerChild })
      }
      {/* {({ measure, registerChild }) => (
        // 'style' attribute required to position cell (within parent List)
        {({registerChild}) => (
          <div
            style={{
              ...style,
              height: 35,
              whiteSpace: 'nowrap'
            }}
          >
            wtf
          </div>
        )}
      )} */}
      {/* {({registerChild}) => (
        <div
          style={{
            ...style,
            height: 35,
            whiteSpace: 'nowrap'
          }}
          className=" bg-red-100 !text-black"
        >
          wtf
        </div>
      )} */}
    </CellMeasurer>
  );
};

export default function VirtualAndInfiniteScroll({
  renderRow,
  loaderComponent,
  totalCount,
  fetchHandler,
  list,
  className,
}: {
  renderRow: ({ item, style }) => ReactElement<React.FC>;
  loaderComponent: ReactElement<React.FC>;
  totalCount: number;
  fetchHandler: (page: number) => Promise<unknown>;
  list: Array<unknown>;
  className?: string;
}) {
  const [pageCount, setPageCount] = useState(2);
  console.log({ list, totalCount });

  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 1000,
      fixedWidth: true,
    })
  );

  function isRowLoaded({ index }) {
    return !!list[index];
  }

  const handleNewPageLoad = async () => {
    console.log("mooore");
    if (isNextPageLoading) {
      return;
    }
    setIsNextPageLoading(true);
    await fetchHandler(pageCount);
    setPageCount((pageCount) => pageCount + 1);
    setIsNextPageLoading(false);
  };

  if (!list.length) return loaderComponent;

  return (
    <div className={`h-full mt-4 ${className}`}>
      <AutoSizer disableHeight={true}>
        {({ width }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={handleNewPageLoad}
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
      {/* <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={handleNewPageLoad}
        rowCount={totalCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer className="w-full h-full">
            {({ height, width }) => (
              <List
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                width={width}
                height={height}
                rowCount={list.length}
                rowHeight={150}
                rowRenderer={(rowData) =>
                  rowRenderer({ cache, list, renderRow, rowData })
                }
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader> */}
      {isNextPageLoading && loaderComponent}
    </div>
  );
}
