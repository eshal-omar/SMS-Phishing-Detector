import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Detector(){
    const [sms, setSms] = useState("");
    const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!sms.trim()) {
    setError("Please enter an SMS message before analyzing");
    return;
  }
  setError("");
  const payload = { message: sms };
  const startTime = performance.now();
  setTimeout(async () => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( payload ),
      });

      const data = await response.json();
      const endTime = performance.now();
      console.log(`Prediction latency: ${(endTime - startTime).toFixed(2)} ms`);
    navigate("/result", { state: { smsMessage: sms, verdict: data.verdict } });
     } catch (error) {
      console.error("Error analyzing SMS:", error);
    }
    }, 0);
  };
    return(
    <div className="p-4 flex flex-col overflow-visible">
  <div className="flex flex-col items-center   px-4 py-8">
      {/* Centered Container Matching Background */}
      <div className="w-full max-w-3xl bg-blue-900 p-8 rounded-xl">
    <label className="font-extralight text-base ">
    Enter your SMS message:
    <textarea name="inputField" rows={5} cols={50} value={sms}
          onChange={(e) => setSms(e.target.value)}  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700"/>
    {error && (
    <div className="text-red-500 font-medium mt-4">
        {error}
    </div>
    )}
    <button type="button" onClick={handleAnalyze} className="bg-blue-800 text-white text-lg font-extrabold background-white/5 border border-white/10 py-4 px-6 rounded-md mt-6">Analyze Message</button>
    </label>
    </div></div>
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