import * as ReactPaginateModule from "react-paginate";
import type { FC } from "react";

type ReactPaginateComponent = React.ComponentType<Record<string, unknown>>;

const ReactPaginate =
  (ReactPaginateModule as unknown as { default: ReactPaginateComponent })
    .default;
    
  interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (event: { selected: number }) => void;
}

const Pagination: FC<PaginationProps> = ({
  pageCount,
  forcePage,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={onPageChange}
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;