import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";
import { memo } from 'react';

const Loader = memo(() => {
  return (
    <div className={css.loaderContainer}>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
});

Loader.displayName = 'Loader';

export default Loader;