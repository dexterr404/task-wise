import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function ImageLightBox({ images, openIndex, onClose }) {
  return (
    <Lightbox
      open={openIndex >= 0}
      index={openIndex}
      slides={images.map((src) => ({ src }))}
      close={onClose}
      onPrev={(prev) => (prev - 1 + images.length) % images.length}
      onNext={(prev) => (prev + 1) % images.length}
      
    />
  );
}

export default ImageLightBox;
