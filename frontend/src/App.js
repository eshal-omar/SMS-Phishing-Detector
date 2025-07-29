// import logo from './logo.svg';
import './App.css';
import  "./index.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Result from './Result';
import Detector from './detector'
function App() {
  return (
    <Router>
    <div className="App p-5 min-h-screen bg-gradient-to-br from-[#021c50] to-[#0a2f6b] text-white">
      {/* <header className="App-header" > */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p className="p-6 text-5xl font-bold">
          Phishing SMS Detector
        </p>
        
        <Routes>
          <Route path="/" element={<Detector />} />
          <Route path="/result" element={<Result />} />
        </Routes>
         </div>
      </Router>
      //   {/* <a
      //     className="App-link"
      //     href="https://reactjs.org"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Learn React
      //   </a> */}
      //   {/* <Detector/> */}
      // {/* </header> */}
   
  );
}

export default App;
