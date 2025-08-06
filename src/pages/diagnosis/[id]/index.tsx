import { X } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import type { InstanceProps, SeriesProps } from "../../../types/types";
import { useEffect, useState } from "react";
import { getInstances, getSeries } from "../../../apis/dicomApis";
import DicomRender from "./_components/DicomRender";

export default function Component() {
  const [series, setSeries] = useState<SeriesProps[]>([]);
  const [currentSeriesIndex, setCurrentSeriesIndex] = useState<number>(0);
  const [instants, setInstants] = useState<InstanceProps[]>([]);
  const navigate = useNavigate();
  const cancleHandle = () => navigate(-1);
  const { id } = useParams();
  useEffect(() => {
    const fetchSeries = async () => {
      if (id === undefined) return;
      const res = await getSeries(id);
      setSeries(res);
    };
    fetchSeries();
  }, [id]);
  useEffect(() => {
    const fetchInstants = async () => {
      const allInstants: InstanceProps[] = [];
      for (const item of series) {
        const res = await getInstances(
          item.studyInstanceUID,
          item.seriesInstanceUID
        );
        allInstants.push(...res);
        item.instances = res;
      }
      setInstants(allInstants);
    };

    if (series.length > 0) {
      fetchInstants();
    }
  }, [series]);
  console.log("series: ", series);
  return (
    <div className="flex flex-col w-full h-full p-2">
      <div className="flex flex-row justify-end p-1">
        <X className="cursor-pointer text-menu-items" onClick={cancleHandle} />
      </div>
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col w-1/12 h-full border-r border-gray-100">
          {series.map((item, index) => {
            const firstInstance = item.instances?.[0];

            if (!firstInstance) return null;

            return (
              <div
                key={index}
                className="flex p-1 w-fit h-fit cursor-pointer"
                onClick={() => setCurrentSeriesIndex(index)}
              >
                <div
                  className={`p-1  ${
                    currentSeriesIndex === index
                      ? "outline-bg-secondary outline-4 outline"
                      : ""
                  } `}
                >
                  <DicomRender
                    sopInstanceUID={firstInstance.sopInstanceUID}
                    studyInstanceUID={firstInstance.studyInstanceUID}
                    seriesInstanceUID={firstInstance.seriesInstanceUID}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`w-7/12 h-full grid ${
            series[currentSeriesIndex]?.instances?.length === 1
              ? "grid-cols-1"
              : "grid-cols-3"
          }`}
        >
          {series[currentSeriesIndex]?.instances?.map((item, index) => (
            <div key={index} className="p-1 w-fit h-fit ">
              <DicomRender
                sopInstanceUID={item.sopInstanceUID}
                studyInstanceUID={item.studyInstanceUID}
                seriesInstanceUID={item.seriesInstanceUID}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 h-full max-w-4/12 border-l border-gray-100 p-3">
          <div className="flex flex-col gap-2">
            <p className="truncate flex flex-col text-xs"><span className="font-semibold text-sm">Series Instance UID:</span> {series[currentSeriesIndex]?.seriesInstanceUID || "-"} </p>
            <p className="truncate flex flex-col text-xs"><span className="font-semibold text-sm">Description:</span> {series[currentSeriesIndex]?.seriesDescription || "-"}</p>
            <p className="truncate flex flex-col text-xs"><span className="font-semibold text-sm">Number of instances:</span> {series[currentSeriesIndex]?.numberOfInstances || "-"}</p>
            <p className="truncate flex flex-col text-xs"><span className="font-semibold text-sm">Modality:</span> {series[currentSeriesIndex]?.modality || "-"}</p>
            <p className="truncate flex flex-col text-xs"><span className="font-semibold text-sm">Study Instance UID:</span> {series[currentSeriesIndex]?.studyInstanceUID || "-"}</p>
          </div>
          <div className="border-b border-gray-200 w-full" />
          <div className="flex flex-col gap-3 w-full">
            <div>
              <label className="font-semibold text-xl text-gray-600">
                Diagnostic content
              </label>
              <textarea
                rows={10}
                className="w-full p-2 border border-slate-200 outline-slate-200"
              >
                ...
              </textarea>
            </div>
            <div className="flex flex-row gap-3 justify-end text-white">
              <Button className="bg-red-600">Cancel</Button>
              <Button className="bg-bg-secondary">Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
