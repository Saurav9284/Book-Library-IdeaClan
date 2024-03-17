import { FormControl, Input, Button, FormLabel, VStack, HStack,Text} from '@chakra-ui/react';
import { Box, Heading } from '@chakra-ui/layout';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../Context/ContextProvider';
import { useToast } from '@chakra-ui/react';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
      email
      name
      role
      id
    }
  }
`;

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false)

  const [loginUser, { data }] = useMutation(LOGIN_USER);
  const DATA = useContext(AuthContext);
  const {login} = DATA;

  const navigate = useNavigate()
  const toast = useToast();

  const Login = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({ variables: { email, password } });
      sessionStorage.setItem("accessToken",data.loginUser.accessToken)
      sessionStorage.setItem("Role",data.loginUser.role)
      login(data.loginUser);
      toast({
        position: 'top',
        title: `Login Successfull!`,
        status: 'success',
        isClosable: true,
      })
      navigate("/");
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
            <Heading mt={4} size='md' color='purple.500' >Login to your account</Heading>
          </VStack>

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

          <FormControl id="password">
            <FormLabel >Password</FormLabel>
            <Input
            type="password" 
            placeholder="min 8 characters"
            value={password}
            isRequired={true}
            onChange={(e) => {setPassword(e.target.value)}}
            />
          </FormControl>

          <HStack w='full' justify='space-between'>
            
          </HStack>
          <Button rounded='none' colorScheme='purple' w='full' onClick={Login}>
            Login
          </Button>
          <Button mb={5} variant='link' colorScheme='blue' onClick={() => navigate('/signup')}>
            Don't have an account? Register
          </Button>
        </VStack>
          <Text fontSize='md' color="red">Admin Credentials</Text>
          <Text fontSize='sm' color="green">Email: admin@gmail.com</Text>
          <Text fontSize='sm' color="green">Password: Admin@123</Text>
      </Box>
    </Box>
  );
}

export default Login;
