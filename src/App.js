
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';
import { UploadApk } from './UploadApk/UploadApk';
import { Home } from './Home/Home';
import { DeviceView } from './DeviceDetails/DeviceView';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
          
          <Route path="/home" element={<Home/>}/>
          <Route path="/uploadapk" element={<UploadApk/>}/>
          <Route path="/deviceview" element={<DeviceView/>}/>



      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
