import { useEffect, useState } from "react";
import { getInstanceImage } from "../../../../apis/dicomApis";
import { Skeleton } from "../../../../components/ui/skeleton";

type DicomRenderProps = {
  sopInstanceUID: string;
  studyInstanceUID: string;
  seriesInstanceUID: string;
};
export default function DicomRender({
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
    // <div className="flex flex-wrap gap-4">
    //   <div>
    //     {imageUrl ? (
    //       <img src={imageUrl} alt="dicom" className="w-full rounded border" />
    //     ) : (
    //       <Skeleton className="flex w-[90px] h-[90px] bg-slate-100" />
    //     )}
    //   </div>
    // </div>
    <div>
      {imageUrls && imageUrls.length > 0 ? (
  <div className={`grid gap-2 ${imageUrls.length > 3 ? "grid-cols-3" : "grid-cols-1"}`}>
    {imageUrls.map((url, index) => (
      <img
        key={index}
        src={url}
        alt={`dicom-frame-${index + 1}`}
        className="w-full rounded border"
      />
    ))}
  </div>
) : (
  <Skeleton className="flex w-[90px] h-[90px] bg-slate-100" />
)}

    </div>
  );
}
