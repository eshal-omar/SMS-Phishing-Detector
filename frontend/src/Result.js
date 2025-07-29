
import {  useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Result(){
    const { state } = useLocation();
  const navigate = useNavigate();

  const verdict = state?.verdict || "Unknown";
 const handleBack = async () => {
        navigate("/");}
    return(
    <div className="p-4 flex flex-col overflow-visible">
        <div className="flex flex-col items-center   px-4 py-8">
      {/* Centered Container Matching Background */}
      <div className="w-full max-w-3xl bg-blue-900 p-8 rounded-xl">
    <label className="font-extralight text-base ">
    Enter your SMS message:
    <textarea name="inputField" rows={5} cols={50}
         readOnly
          value={state?.smsMessage || ""}  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700"/>
    <button type="button" onClick={handleBack} className="bg-blue-800 text-white text-lg font-extrabold background-white/5 border border-white/10 py-4 px-6 rounded-md mt-6">Back</button>
    </label>
    <div className="mt-6 text-2xl font-bold text-center">
        Verdict: <span className={verdict === "Phishing" ? "text-red-500" : "text-green-400"}>{verdict}</span>
      </div></div></div>
    
    <div className=" grid grid-cols-1 grid-rows-1 gap-6 mt-6">
        <div className="px-10 py-10 background-white/5 border border-white/10  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm mt-6">
       <div className="text-center text-xl font-bold  ">
            99% Accuracy
        </div>
    </div>
    </div>
    <div className="grid grid-cols-1 grid-rows-1 gap-6 mt-6">
        <div className="px-10 py-10 background-white/5 border border-white/10  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm">
       <div className="text-center text-xl font-bold ">
            99% Precision
        </div>
    </div>
    </div>
     <div className="grid grid-cols-1 grid-rows-1 gap-6 mt-6">
        <div className="px-10 py-10 background-white/5 border border-white/10  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm">
       <div className="text-center text-xl font-bold ">
            96% F1 Score
        </div>
    </div>
    </div>
    
    </div>
    );

}