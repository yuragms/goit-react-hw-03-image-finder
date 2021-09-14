import style from "./Button.module.css";

export default function ButtonMore({ handleClickLoadMore }) {
  return (
    <button
      className={style.Button}
      type={"button"}
      onClick={handleClickLoadMore}
    >
      Load more
    </button>
  );
}
