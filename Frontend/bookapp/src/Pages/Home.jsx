import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/ContextProvider";
import { useQuery, gql } from "@apollo/client";
import { Box, Button, Heading, Text, Image, Center , Flex } from "@chakra-ui/react";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
      id
      genre
      price
    }
  }
`;

const Home = () => {
  const [books, setBooks] = useState([]);
  const { loading, error, data } = useQuery(GET_BOOKS);
  const auth = useContext(AuthContext);
  console.log(auth)

  const role = sessionStorage.getItem("Role")

  useEffect(() => {
    if (loading) return;
    if (error) return;
    if (data && data.books) {
      setBooks(data.books);
    }
  }, [loading, error, data]);

  return (
    <>
      {role === "Admin" ? (
        <Box w="full" py={10} bg="gray.100">
          <Box w="10/12" m="auto" rounded="lg" py={15} bg="white">
            <Text textAlign="center" color="red">Frontend is not fully completed</Text>      
            <Heading
              textAlign="center"
              pb={16}
              pt={10}
              fontSize="4xl"
              fontWeight="semibold"
              color="dark"
            >
              Welcome to Admin Dashboard
            </Heading>
            <Flex justifyContent="center" alignItems="center">
                          <Button
                            variant="outline"
                            colorScheme="blue"
                            borderRadius="md"
                            _hover={{ opacity: 0.8 }}
                            mr={2}
                          >
                            Add Book
                          </Button>
                          </Flex>
            {loading ? (
              <Center h="200px">
                <Image
                  src="https://i.gifer.com/ZKZg.gif"
                  maxHeight="100px"
                  maxWidth="100px"
                />
              </Center>
            ) : (
              <Box px={4}>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                  gap={6}
                >
                  {data &&
                    data.books &&
                    data.books.map(({ id, title, author, genre, price }) => (
                      <Box
                        key={id}
                        bg="white"
                        p={6}
                        borderRadius="xl"
                        boxShadow="lg"
                        _hover={{ transform: "translateY(-4px)", transition: "all 0.3s ease" }}
                      >
                        <Text fontSize="xl" fontWeight="semibold" color="text-orange" mb={2}>
                          {title}
                        </Text>
                        <Text fontSize="md" fontWeight="normal" color="gray.600" mb={2}>
                          Author: {author}
                        </Text>
                        <Text fontSize="sm" fontWeight="normal" color="gray.600" mb={2}>
                          Genre: {genre}
                        </Text>
                        <Text fontSize="sm" fontWeight="normal" color="gray.600" mb={4}>
                          Price: ${price}
                        </Text>
                        <Flex>
                          <Button
                            variant="outline"
                            colorScheme="blue"
                            borderRadius="md"
                            _hover={{ opacity: 0.8 }}
                            mr={2}
                          >
                            Update
                          </Button>
                          <Button
                            variant="outline"
                            colorScheme="red"
                            borderRadius="md"
                            _hover={{ opacity: 0.8 }}
                            mr={2}
                          >
                            Delete
                          </Button>
                        </Flex>
                      </Box>
                    ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box w="full" py={10} bg="gray.100">
          <Box w="10/12" m="auto" rounded="lg" py={15} bg="white">
          <Text textAlign="center" color="red">Frontend is not fully completed</Text>
            <Heading
              textAlign="center"
              pb={16}
              pt={10}
              fontSize="4xl"
              fontWeight="semibold"
              color="dark"
            >
              Welcome to User Dashboard
            </Heading>
            {loading ? (
              <Center h="200px">
                <Image
                  src="https://i.gifer.com/ZKZg.gif"
                  maxHeight="100px"
                  maxWidth="100px"
                />
              </Center>
            ) : (
              <Box px={4}>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                  gap={6}
                >
                  {data &&
                    data.books &&
                    data.books.map(({ id, title, author, genre, price }) => (
                      <Box
                        key={id}
                        bg="white"
                        p={6}
                        borderRadius="xl"
                        boxShadow="lg"
                        _hover={{ transform: "translateY(-4px)", transition: "all 0.3s ease" }}
                      >
                        <Text fontSize="xl" fontWeight="semibold" color="text-orange" mb={2}>
                          {title}
                        </Text>
                        <Text fontSize="md" fontWeight="normal" color="gray.600" mb={2}>
                          Author: {author}
                        </Text>
                        <Text fontSize="sm" fontWeight="normal" color="gray.600" mb={2}>
                          Genre: {genre}
                        </Text>
                        <Text fontSize="sm" fontWeight="normal" color="gray.600" mb={4}>
                          Price: ${price}
                        </Text>
                        <Flex>
                          <Button
                            variant="outline"
                            colorScheme="blue"
                            borderRadius="md"
                            _hover={{ opacity: 0.8 }}
                            mr={2}
                          >
                            Buy Now
                          </Button>
                          <Button
                            variant="outline"
                            colorScheme="red"
                            borderRadius="md"
                            _hover={{ opacity: 0.8 }}
                            mr={2}
                          >
                            Borrow
                          </Button>
                        </Flex>
                      </Box>
                    ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};  

export default Home;
