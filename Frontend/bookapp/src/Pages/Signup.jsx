import { FormControl, Input, Button, FormLabel, VStack, HStack, Select } from '@chakra-ui/react';
import { Box, Heading } from '@chakra-ui/layout';
import { Form, useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../Context/ContextProvider';
import { useToast } from '@chakra-ui/react';


const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String!, $role: String!) {
    createUser(email: $email, name: $name, password: $password, role: $role) {
      accessToken
      email
      name
      role
      id
    }
  }
`;

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)

  const [createUser, { data }] = useMutation(CREATE_USER);
  const DATA = useContext(AuthContext);
  const {login} = DATA;

  const navigate = useNavigate()
  const toast = useToast();

  const regsiterUser = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({ variables: { email, name, password, role: "Regular User" } });
      setAccountCreated(true);
      toast({
        position: 'top',
        title: `User Registerd Successfully!`,
        status: 'success',
        isClosable: true,
      })
      setTimeout(()=>{
        navigate("/login");
      },1000)
    } catch (error) {
      setIsError(true)
      toast({
        position: 'top',
        title: `${error.message}`,
        status: 'error',
        isClosable: true,
      })
      setError(error.message);
    }
  };

  return (
    <Box
      bg="gray.100" 
      w="100vw" 
      h="100vh" 
      display="flex"
      justifyContent="center" 
      alignItems="center" 
    >
    <Box
      w={['full', 'md']}
      p={[8, 10]}
      mx='auto'
      mt={"-10vh"}
      backgroundColor={"white"}
      border={['none', '1px']}
      borderColor={['', 'gray.300']}
      borderRadius={10}
    >
      <VStack spacing={4} align='flex-start' w='full'>
        <VStack spacing={1} align={['flex-start', 'center']} w='full'>
          <Heading mt={4} size='md' color='purple.500' >Register to create your account</Heading>
        </VStack>

        

        <FormControl id="name">
          <FormLabel >Name</FormLabel>
          <Input
          type="text"
          placeholder="Enter your name"
          isRequired={true}
          value={name}
          onChange={(e) => {setName(e.target.value)}}
          />
        </FormControl>

        <FormControl id="email">
          <FormLabel >Email</FormLabel>
          <Input
          type="email"
          placeholder="user@gmail.com"
          value={email}
          isRequired={true}
          onChange={(e) => {setEmail(e.target.value)}}
         />
        </FormControl>

        {/* <FormControl id="role">
          <FormLabel >Choose role</FormLabel>
          <Select placeholder="Select your role">
            <option value="Admin">Admin</option>
            <option value="Regular User">Regular User</option>
          </Select>
        </FormControl> */}

        <FormControl id="password">
          <FormLabel >Password</FormLabel>
          <Input
          type="password"
          placeholder="min 8 character"
          isRequired={true}
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}

          />
        </FormControl>

        <HStack w='full' justify='space-between'>
        </HStack>
        <Button rounded='none' colorScheme='purple' w='full' onClick={regsiterUser}>
          Register
        </Button>
        
        <Button variant='link' colorScheme='blue' onClick={()=>navigate('/login')}>
              Already have an account? Login
            </Button>
      </VStack>
  
    </Box>
    </Box>
  );
}

export default Signup;