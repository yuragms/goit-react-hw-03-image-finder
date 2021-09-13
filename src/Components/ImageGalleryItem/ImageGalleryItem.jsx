import style from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ hits, onClick }) {
  return (
    // <ul className={style.ImageGallery}>
    <>
      {hits.map((item) => (
        <li key={item.id} className={style.ImageGalleryItem}>
          <img
            src={item.webformatURL}
            alt={item.tags}
            className={style.image}
            onClick={() => onClick(item.largeImageURL)}
          />
        </li>
      ))}
    </>
    // </ul>
  );
}
