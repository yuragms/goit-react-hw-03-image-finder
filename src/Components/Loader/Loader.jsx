import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import style from "./Loader.module.css";

export const Spinner = () => (
  <div className={style.wrapperloader}>
    <Loader
      type="Oval"
      color="LightSkyBlue"
      height={100}
      width={100}
      timeout={3000}
      className={style.loader}
    />
  </div>
);
