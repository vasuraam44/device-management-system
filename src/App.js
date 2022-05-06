
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';
import { UploadApk } from './UploadApk/UploadApk';
import { UploadFile } from './UploadFiles/UploadFile';
import { Home } from './Home/Home';
import { DeviceView } from './DeviceDetails/DeviceView';
import { Availablefile } from './AvailableFiles/Availablefile';
import { UploadEvt } from './UploadEvtFile/UploadEvt';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
          
          <Route path="/home" element={<Home/>}/>
          <Route path="/uploadapk" element={<UploadApk/>}/>
          <Route path="/uploadevt" element={<UploadEvt/>}/>
          <Route path="/deviceview" element={<DeviceView/>}/>
          <Route path="/uploadfiles" element={<UploadFile/>}/>
          <Route path="/avilablefiles" element={<Availablefile/>}/>
        

      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
