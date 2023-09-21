import { LazyLoadImage } from "react-lazy-load-image-component";

interface ImageCardProps {
  src: string;
  name: string;
  onDragStart: any;
  dragging: boolean;
  onDragEnter: any;
}

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  name,
  onDragStart,
  dragging,
  onDragEnter,
}) => {
  return (
    <div
      draggable
      className={`${
        dragging ? "border-[5px] border-dotted border-red-400" : ""
      } relative`}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
    >
      <LazyLoadImage
        src={`https://www.themoviedb.org/t/p/original${src}`}
        alt={name}
      />
      <p className="absolute bottom-0 left-0 right-0 z-10 text-white font-bold text-[1.2rem] text-center bg-[#000000a8] p-4">
        {name}
      </p>
    </div>
  );
};

export default ImageCard;
