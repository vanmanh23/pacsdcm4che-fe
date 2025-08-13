import ColumnDicomChart from "../../components/ColumnDicomChart";
import DicomChart from "../../components/DicomChart";
import MyChart from "../../components/LineChart";

export default function Component() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <ColumnDicomChart />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="outline-none">
          <MyChart />
        </div>
        <div className="outline-none">
          <DicomChart />
        </div>
      </div>
    </div>
  );
}
