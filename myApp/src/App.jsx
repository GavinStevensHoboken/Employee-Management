import NavBar from './navigation/navBar.jsx';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EmployeeProfiles from './employees/employeeProfiles.jsx';
import SignUp from './registration/SignUp.jsx';
import LayoutWithNavBar from './Layout/LayoutWithNavBar.jsx';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/employees" element={<LayoutWithNavBar><EmployeeProfiles/></LayoutWithNavBar>} />
                <Route path="/register" element={<SignUp/>}/>
            </Routes>
        </Router>
    )
}

export default App
