//import logo from './logo.svg';
import './App.css';
import CustomHeader from "./components/CustomHeader";
import {Route, Routes} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import User from "./pages/User";


function App() {
  return (
      <div className="App">
        <CustomHeader/>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/user/:userAdr" element={<User/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </div>
  );
}

export default App;
