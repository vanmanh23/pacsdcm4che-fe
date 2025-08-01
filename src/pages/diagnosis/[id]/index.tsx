import { X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Component() {
  const navigate = useNavigate();
  const cancleHandle = () => navigate(-1);
  return (
    <div className="flex flex-col w-full h-full p-5">
      <div className="flex flex-row justify-end p-5">
        <X className="cursor-pointer text-menu-items" onClick={cancleHandle}/>
      </div>
      <div className="flex flex-row w-full h-full">
      <div className="flex flex-col w-2/12 h-full border-r border-gray-100">
        <div className="p-3">
          <img src="https://tse3.mm.bing.net/th/id/OIP.7v0C7KnM6q9N1-qp1MxqOwHaHP?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="dcm-image" />
        </div>
        <div className="p-3">
          <img src="https://tse3.mm.bing.net/th/id/OIP.7v0C7KnM6q9N1-qp1MxqOwHaHP?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="dcm-image" />
        </div>
        <div className="p-3">
          <img src="https://tse3.mm.bing.net/th/id/OIP.7v0C7KnM6q9N1-qp1MxqOwHaHP?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="dcm-image" />
        </div>
      </div>
      <div className="w-6/12">
        <div className="p-3 w-full h-full">
          <img className="w-full" src="https://tse3.mm.bing.net/th/id/OIP.7v0C7KnM6q9N1-qp1MxqOwHaHP?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="dcm-image" />
        </div>
      </div>
      <div className="flex flex-col h-full w-4/12 border-l border-gray-100 p-3">
        <div>
          <label className="font-semibold text-xl text-gray-600">Diagnostic content</label>
          <textarea rows={10}  className="w-full p-2 border border-slate-100 outline-slate-200">...</textarea>
        </div>
        <div className="flex flex-row gap-3 justify-end text-white">
          <Button className="bg-red-600">Cancel</Button>
          <Button className="bg-bg-secondary">Submit</Button>
        </div>
      </div>
    </div>
    </div>
  )
}
