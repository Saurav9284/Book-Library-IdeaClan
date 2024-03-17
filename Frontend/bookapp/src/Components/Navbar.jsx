import { Box, Button, Flex, Heading, Image, Select, Text, useDisclosure } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import user from '../Assets/user.png'


const Navbar = () => {

    const navigate = useNavigate()

    const Logout = () => {
        sessionStorage.clear()
        navigate('/login')
    }

    const gotoUser = () => {
        navigate('/profile')
    }

    const token = sessionStorage.getItem("accessToken");

    return (
        <Box p={"10px"} bg={'blue.200'} boxShadow={"rgba(0, 0, 0, 0.2) 0px 4px 12px"}>
            <Flex justifyContent={"space-between"} alignItems={"center"} padding={"0 15px"} maxW={"1280px"} m={"auto"}>
                <Flex gap={"15px"} justifyContent={"center"} alignItems={"center"}>
                    <Image src='https://freepngdownload.com/image/thumb/book-icon-png-free.png' width={"80px"} onClick={()=>navigate('/')} />
                    <Link to={"/"}><Heading size="lg" color="maroon">E-Book</Heading></Link>
                </Flex>
                         { token ? 
                         <Flex gap={"15px"}>
                            <Image src={user} width={"40px"} onClick={gotoUser}/>
                            <Button colorScheme='blackAlpha' onClick={Logout} >Logout</Button>
                            
                        </Flex> :
                        <Flex gap={"15px"}>
                        <Link to={"/login"} ><Button colorScheme='blackAlpha' >Login</Button></Link>
                         </Flex>
                        }

            </Flex>
        </Box>
    )
}

export default Navbar