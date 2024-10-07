import { forwardRef } from "react";
import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = forwardRef(({ onClick }, ref) => {
  return (
    <div className={css.loadMoreBtnContainer}>
      <button ref={ref} onClick={onClick} className={css.loadMoreBtn}>
        Load more
      </button>
    </div>
  );
});

export default LoadMoreBtn;
