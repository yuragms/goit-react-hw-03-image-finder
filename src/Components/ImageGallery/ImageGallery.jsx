import style from "./ImageGallery.module.css";
import ImageGalleryItem from "./../ImageGalleryItem/ImageGalleryItem.jsx";

export default function ImageGallery({ hits, onClick }) {
  return (
    <ul className={style.ImageGallery}>
      <ImageGalleryItem hits={hits} onClick={onClick} />
    </ul>
  );
}

//   const Section = ({ title, children }) => {
//     return (
//       <Container>
//         <Title>{title}</Title>
//         {children}
//       </Container>
//     );
//   };

//   export default Section;
