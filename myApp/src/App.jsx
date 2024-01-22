import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EmployeeProfiles from './employees/employeeProfiles.jsx';
import SignUp from './user/SignUp.jsx';
import LayoutWithNavBar from './layout/LayoutWithNavBar.jsx';
import LogIn from './user/LogIn.jsx'
import StatusCard from './user/Onboarding.jsx'
import VisaStatusManagement from './visaStatus/visaStatus.jsx'
import EmployeeForm from "./employees/employeeApplication.jsx";
import Visa from './pages/Visa/index.jsx';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/visa" element={<LayoutWithNavBar><VisaStatusManagement /></LayoutWithNavBar>}/>
                <Route path="/employees" element={<LayoutWithNavBar><EmployeeProfiles/></LayoutWithNavBar>} />
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/status" element={<LayoutWithNavBar><StatusCard/></LayoutWithNavBar>} />
                <Route path="/application" element={<LayoutWithNavBar><EmployeeForm/></LayoutWithNavBar>} />
                <Route path="/visafiles" element={<LayoutWithNavBar><Visa/></LayoutWithNavBar>}/>
            </Routes>
        </Router>
    )
}

export default App
