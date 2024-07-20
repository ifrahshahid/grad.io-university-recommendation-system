import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/First'
import Academic from './pages/Second';
import PersonalityTraitTest from './pages/third';
import Fourth from './pages/Fourth';
import Admin from './Admin/admin';
import AdminLogin from './Admin/adminLogin';
import Gradadmin from './Admin/GradAdmin';
import User from './Admin/admin-pages/User';
import Question from './Admin/admin-pages/Question';
import Index from './pages';
import Adminsignup from './Admin/Adminsignup';
import Login from './UserAuth/Login';
import Signup from './UserAuth/Signup';
import Newadmin from './Admin/Newadmin';
import Modelquestion from './pages/Modelquestion';
import Fifth from './pages/fifth';
import Finalresult from './pages/Finalresult';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/PersonalityTraitTest" element={<PersonalityTraitTest />} />
          <Route path="/Fourth" element={<Fourth />} />
          <Route path="/Fifth" element={<Fifth />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/registernewadmin" element={<Adminsignup />} />
          <Route path="/Gradadmin" element={<Gradadmin />} />
          <Route path="/manage-users" element={<User />} />
          <Route path="/admin_dashboard" element={<Newadmin />} />
          <Route path="/Modelquestion" element={<Modelquestion />} /> 
          <Route path="/Finalresult" element={<Finalresult />} /> 
          <Route path="/personality-trait-type-question" element={<Question />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
