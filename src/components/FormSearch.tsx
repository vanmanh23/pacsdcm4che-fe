import { Pencil } from "lucide-react";
import CustomButton from "./CustomButton";

type Studyprops = {
    name: string,
    studyID: string,
    studyXyz: string,
    handleAction : () => void
}
export default function FormSearch({name, studyID, studyXyz, handleAction}: Studyprops) {
  return (
    <div className="md:px-16 sm:px-16 xl:px-16 2xl:px-16 px-2 space-y-2 py-4">
        <div className="w-full bg-white opacity-75 px-2 py-1 shadow-2xl shadow-gray-500">
            <p className="text-lg font-medium uppercase">{name}</p>
        </div>
        <div className="flex flex-row justify-between bg-white opacity-80 shadow-md p-2">
            <div className="flex flex-wrap w-3/4 gap-5">
                <div className="flex flex-row text-menu-items">
                    <input type="text" placeholder="Patient name"  className="pl-2 border-b border-gray-400 italic h-fit outline-secondary-color text-base"/>
                    <div className="p-1 bg-black w-fit h-fit">
                        <Pencil size={16} fill="#ffff"/>
                    </div>
                </div>
                <div className="flex flex-row text-menu-items">
                    <input type="text" placeholder="Patient name1"  className="pl-2 border-b border-gray-400 italic h-fit outline-secondary-color text-base"/>
                    <div className="p-1 bg-black w-fit h-fit">
                        <Pencil size={16} fill="#ffff"/>
                    </div>
                </div>
                <div className="flex flex-row text-menu-items">
                    <input type="text" placeholder="Patient name2"  className="pl-2 border-b border-gray-400 italic h-fit outline-secondary-color text-base"/>
                    <div className="p-1 bg-black w-fit h-fit">
                        <Pencil size={16} fill="#ffff"/>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-3 w-1/4">
                <div className="md:w-1/3 sm:w-1/3 xl:w-1/3 2xl:w-1/3 w-full">
                    <CustomButton btn_name="Count" handleAction ={handleAction} />
                </div>
                <div className="md:w-1/3 sm:w-1/3 xl:w-1/3 2xl:w-1/3 w-full">
                    <CustomButton btn_name="Size" handleAction ={() => {}} />
                </div>
                <div className="md:w-1/3 sm:w-1/3 xl:w-1/3 2xl:w-1/3 w-full">
                    <CustomButton btn_name="Submit" handleAction ={() => {}} />
                </div>
            </div>
        </div>
    </div>
  )
}
