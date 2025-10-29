import { useContext } from 'react';
import { Navbar } from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export const Tasks = () => {
  const auth = useContext(AuthContext)!;
  const role = auth.role;
  const navigate = useNavigate();

  const handleNavigateToAdmin = () => {
    navigate("/admin");
    // navigation logic to admin page
  }
  return (
    <>
      <Navbar />
      {role==="ADMIN" &&<button onClick={handleNavigateToAdmin}>Go to admin page</button>}
      <h2>Tasks Page - User & Admin Access</h2>
    </>
  );
};
