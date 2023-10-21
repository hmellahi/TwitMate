import { THREADS_LIMIT } from "@/constants";
import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";
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
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
    parent,
  },
}) => {
  return (
    <CellMeasurer
      key={list[index].id}
      cache={cache.current}
      parent={parent}
      rowIndex={index}
      columnIndex={0}
    >
      {({ measure, registerChild }) => (
        <div
          style={style}
          ref={(element): void => {
            if (element && registerChild) {
              registerChild(element);
            }
          }}
        >
          {renderRow({ item: list[index], measure, index })}
        </div>
      )}
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
  const oldList = useRef([]);
  const cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 700,
      fixedWidth: true,
    })
  );

  const isRowLoaded = useCallback(({ index }) => {
    return !!list[index];
  }, [list]);

  const handleNewPageLoad = useCallback(async () => {
    let pageCount = Math.floor(list.length / THREADS_LIMIT) + 1;

    if (isNextPageLoading) {
      return;
    }
    await fetchHandler(pageCount);
  }, [list, isNextPageLoading]);

  let [listRef, setListRef] = useState(null);

  const reset = useCallback(() => {
    // Recompute row heights and offsets
    listRef?.recomputeRowHeights();
    // Reset cached measurements for all cells.
    cache.current.clearAll();
    // infiniteLoaderRef.resetLoadMoreRowsCache(true);
  }, [listRef, cache]);

  useEffect(() => {
    // this will reset the cache whenever
    // an item is added to the list or removed
    // this is a workaround and not the best way
    if (Math.abs(oldList.current.length - list.length) === 1) {
      reset();
    }

    oldList.current = list;

    window.addEventListener("resize", reset);

    return () => window.removeEventListener("resize", reset);
  }, [list]);

  if (!list.length) {
    if (!isNextPageLoading) {
      return null;
    }
    return loaderComponent;
  }

  return (
    <div className={`mt-4 ${className} h-full min-h-[200%]`}>
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
      {isNextPageLoading && loaderComponent}
    </div>
  );
}
