import Navbar from './Components/Navbar';
import Allroutes from './Routes/Allroutes';
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  
  return (
    <ChakraProvider>
      <Navbar />
    <Allroutes/>
    </ChakraProvider>
    
  );
}

export default App;
