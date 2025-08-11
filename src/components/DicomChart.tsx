import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { getStudies } from "../apis/dicomApis";

export default function DicomChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const res = await getStudies();
        setData(res);
    }
    fetchData();
  }, []);
  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow">
      <h2 className="md:text-lg text-sm font-semibold mb-4">Số lượng Series & Study theo ngày</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="studyID" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="numberOfSeries" stroke="#8884d8" name="Số Study" />
          <Line type="monotone" dataKey="numberOfInstances" stroke="#fa0064" name="Số Series" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
