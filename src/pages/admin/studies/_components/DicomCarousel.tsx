import { useEffect, useState } from "react";
import { getInstanceImage } from "../../../../apis/dicomApis";
import { Skeleton } from "../../../../components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";

type DicomRenderProps = {
  sopInstanceUID: string;
  studyInstanceUID: string;
  seriesInstanceUID: string;
};
export default function DicomCarousel({
  sopInstanceUID,
  studyInstanceUID,
  seriesInstanceUID,
}: DicomRenderProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  useEffect(() => {
    const fetchImage = async () => {
      const res = await getInstanceImage(
        sopInstanceUID,
        studyInstanceUID,
        seriesInstanceUID
      );
      setImageUrls(res);
    };
    fetchImage();
  }, [sopInstanceUID, studyInstanceUID, seriesInstanceUID]);
  return (
    <Carousel className="relative w-full max-w-[100vw]">
      <CarouselContent> 
        {imageUrls.map((url, index) => (
          <CarouselItem key={index}>
            <div className="flex items-center justify-center p-2">
              {url ? (
                <img
                  src={url}
                  alt={`dicom-${index}`}
                  className="max-full h-auto max-h-[80vh] object-contain rounded border bg-red-600"
                />
              ) : (
                <Skeleton className="flex w-[200px] h-[200px] bg-slate-100" />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="z-10 left-10" />
      <CarouselNext className="z-20 right-52" />
    </Carousel>
  );
}
