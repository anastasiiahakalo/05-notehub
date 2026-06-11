import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (event: { selected: number }) => void;
}

export default function Pagination({
  pageCount,
  forcePage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={onPageChange}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
}