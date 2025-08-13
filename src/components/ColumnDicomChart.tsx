import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function ColumnDicomChart() {
  // Fake data
  const data = [
    { studyDate: "2025-08-01", studyCount: 5, seriesCount: 12 },
    { studyDate: "2025-08-02", studyCount: 8, seriesCount: 20 },
    { studyDate: "2025-08-03", studyCount: 4, seriesCount: 10 },
    { studyDate: "2025-08-04", studyCount: 10, seriesCount: 15 },
    { studyDate: "2025-08-05", studyCount: 6, seriesCount: 8 }
  ];

  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow">
      <h2 className="md:text-lg text-sm font-semibold mb-4 text-secondary">
        The bar chart shows the quantity of studies and series
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="studyDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Biểu đồ cột */}
          <Bar dataKey="studyCount" barSize={40} fill="#8884d8" name="Số Study" />
          {/* Biểu đồ đường */}
          <Line
            type="monotone"
            dataKey="seriesCount"
            stroke="#0bef1a"
            strokeWidth={2}
            name="Số Series"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
