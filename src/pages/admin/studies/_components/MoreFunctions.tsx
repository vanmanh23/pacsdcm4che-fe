import { Upload } from "lucide-react";

type MoreInfoProps = {
  count: number,
  size: number
}

export default function MoreFunctions({ count, size }: MoreInfoProps) {
  return (
    <div className="flex w-full flex-row justify-between">
      <div className="flex flex-row gap-5 w-full">
        <div className="py-3 px-3 w-1/4 rounded-md border border-gray-300">
          <p className="font-medium">Number of elements: <span className="font-bold">{count}</span></p>
        </div>
        <div className="py-3 px-3 w-1/4 rounded-md border border-gray-300">
          <p className="font-medium">File size: <span className="font-bold">{size} MB</span></p>
        </div>
      </div>
      <input type="file" multiple id="upload-input" className="hidden"/>
      <label htmlFor="upload-input" className="w-1/6" >
      <div className="bg-bg-secondary hover:bg-bg-secondary/70 cursor-pointer p-3 rounded-md text-white flex flex-row gap-2 w-full items-center justify-center">
        <Upload fontWeight={"bold"}/>
        <p className="font-semibold"> Upload dicom object </p>
      </div>
      </label>
    </div>
  );
}
