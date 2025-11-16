import { useState } from "react";
import { getPhotos } from "../../services/photos";
import Form from "../../components/Form/Form";
import PhotosGallery from "../../components/PhotosGallery/PhotosGallery";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import Text from "../../components/Text/Text";
import type { Photo } from "../../types/photo";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const data = await getPhotos(query);
      setPhotos(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (photo: Photo) => setSelectedPhoto(photo);
  const closeModal = () => setSelectedPhoto(null);

  return (
    <>
      <Form onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <Text>Something went wrong. Try again.</Text>}

      {photos.length > 0 && (
        <PhotosGallery photos={photos} onPhotoClick={openModal} />
      )}

      {selectedPhoto && (
        <Modal onClose={closeModal}>
          <img src={selectedPhoto.src.original} alt={selectedPhoto.alt} />
        </Modal>
      )}
    </>
  );
}

