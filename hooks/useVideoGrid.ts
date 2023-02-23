import { useCallback, useEffect, useMemo, useState } from 'react';

const DEFAULT_ASPECT_RATIO = 16 / 9;

interface Props {
  width: number;
  height: number;
  gap?: number;
  tileAspectRatio?: number;
  minTileWidth?: number;
  sessionIds: string[];
  minCountPerPage?: number;
  maxCountPerPage?: number;
}

export const useVideoGrid = ({
  gap = 1,
  height,
  maxCountPerPage = 25,
  minCountPerPage = 1,
  minTileWidth = 1,
  sessionIds,
  tileAspectRatio = DEFAULT_ASPECT_RATIO,
  width,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Calculates the maximum amount of columns and rows,
   * based on the given width, height and minimum tile width.
   */
  const [maxColumns, maxRows] = useMemo(() => {
    const columns = Math.max(1, Math.floor(width / minTileWidth));
    const widthPerTile = width / columns;
    const rows = Math.max(
      1,
      Math.floor(height / (widthPerTile / tileAspectRatio))
    );

    return [columns, rows];
  }, [height, minTileWidth, tileAspectRatio, width]);

  /**
   * Calculates the amount of elements rendered per page.
   */
  const pageSize = useMemo(
    () =>
      Math.max(
        minCountPerPage,
        Math.min(maxColumns * maxRows, maxCountPerPage)
      ),
    [maxColumns, maxRows, maxCountPerPage, minCountPerPage]
  );

  /**
   * Total amount of pages for pagination.
   */
  const totalPages = useMemo(
    () => Math.ceil(sessionIds.length / pageSize),
    [pageSize, sessionIds.length]
  );

  /**
   * Avoid page from overflowing pages.
   */
  useEffect(() => {
    if (currentPage <= totalPages) return;
    setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  /**
   * Calculate actual amount of columns and rows.
   * This method runs through different combinations of possible columns and rows,
   * and finds the combination with the highest amount of used space in pixels.
   */
  const [columns, rows] = useMemo(() => {
    const tileCount = Math.min(pageSize, sessionIds.length);
    if (tileCount === 0) return [width, height];

    const getWidthByColumnCount = (cols: number) =>
      Math.floor((width - gap * (cols - 1)) / cols);
    const getHeightByRowCount = (rows: number) =>
      Math.floor((height - gap * (rows - 1)) / rows);

    const idealTileArea = (width * height) / tileCount;
    const idealTileWidth = Math.sqrt(idealTileArea * tileAspectRatio);
    const idealTileHeight = Math.sqrt(idealTileArea / tileAspectRatio);

    const roundedColumns = Math.round(width / idealTileWidth);
    const roundedRows = Math.round(height / idealTileHeight);

    const ceiledRows = Math.ceil(tileCount / roundedColumns);
    const ceiledColumns = Math.ceil(tileCount / roundedRows);

    const layoutWithColumnPriority = {
      area:
        tileCount *
        getWidthByColumnCount(roundedColumns) *
        getHeightByRowCount(ceiledRows),
      result: [roundedColumns, ceiledRows],
    };
    const layoutWithRowPriority = {
      area:
        tileCount *
        getWidthByColumnCount(ceiledColumns) *
        getHeightByRowCount(roundedRows),
      result: [ceiledColumns, roundedRows],
    };

    if (layoutWithColumnPriority.area > layoutWithRowPriority.area)
      return layoutWithColumnPriority.result;

    return layoutWithRowPriority.result;
  }, [gap, height, pageSize, sessionIds.length, tileAspectRatio, width]);

  /**
   * Calculates the session ids rendered on the current page.
   */
  const currentIds = useMemo(() => {
    return sessionIds.length - Math.max(currentPage, 1) * pageSize > 0
      ? sessionIds.slice(
          (Math.max(currentPage, 1) - 1) * pageSize,
          Math.max(currentPage, 1) * pageSize
        )
      : sessionIds.slice(-pageSize);
  }, [currentPage, pageSize, sessionIds]);

  /**
   * Switches to next page, if available.
   */
  const nextPage = useCallback(
    () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
    [totalPages]
  );
  /**
   * Switches to previous page, if available.
   */
  const prevPage = useCallback(
    () => setCurrentPage((p) => Math.max(1, p - 1)),
    []
  );

  /**
   * Calculates the total width and height utilized by the tiles.
   */
  const [containerWidth, containerHeight] = useMemo(() => {
    const columnGap = gap * (columns - 1);
    const rowGap = gap * (rows - 1);
    let tileWidth = (width - columnGap) / columns;
    let tileHeight = tileWidth / tileAspectRatio;
    if (rows * tileHeight + rowGap > height) {
      tileHeight = (height - rowGap) / rows;
      tileWidth = tileHeight * tileAspectRatio;
    }
    return [
      Math.floor(tileWidth * columns + columnGap),
      Math.floor(tileHeight * rows + rowGap),
    ];
  }, [columns, gap, height, rows, tileAspectRatio, width]);

  return {
    columns,
    containerHeight,
    containerWidth,
    rows,
    currentIds,
    nextPage,
    prevPage,
    currentPage,
    totalPages,
    pageSize,
  };
};
