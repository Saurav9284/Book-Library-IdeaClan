import { useContext } from "react";
import { AuthContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Button } from '@chakra-ui/react';

const UserProfile = () => {
  const { authStatus, userData, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const Logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      {authStatus && userData && (
        <Card>
          <CardHeader>User Profile</CardHeader>
          <CardBody>
            <p>{`Name: ${userData.name}`}</p>
            <p>{`Email: ${userData.email}`}</p>
            <p>{`Role: ${userData.role}`}</p>
          </CardBody>
          <CardFooter>
            <Button colorScheme="red" onClick={Logout}>Logout</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default UserProfile;
