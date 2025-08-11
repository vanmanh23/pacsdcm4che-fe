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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    const fetchImage = async () => {
      const res = await getInstanceImage(
        sopInstanceUID,
        studyInstanceUID,
        seriesInstanceUID
      );
      setImageUrl(res);
    };
    fetchImage();
  }, [sopInstanceUID, studyInstanceUID, seriesInstanceUID]);
  return (
    <div className="flex flex-wrap gap-4">
      <div>
        {imageUrl ? (
          <img src={imageUrl} alt="dicom" className="w-full rounded border" />
        ) : (
          <Skeleton className="flex w-[90px] h-[90px] bg-slate-100" />
        )}
      </div>
    </div>
  );
}
