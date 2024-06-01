import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  Text,
  Link,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";



function Signin() {
  const toast = useToast();
  const navigate = useNavigate()
  const {login} = useContext(AuthContext)
  
  const {
    register,
    handleSubmit,
    formState: {  isSubmitted },
  } = useForm({defaultValues:{
    email: "",
    password: ""
  }});

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(data);
    if (email === "admin@admin.com" && password === "123") {
      login(data)
      toast({
        title: "Login successful",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      navigate('/inventory')
      

    } else {
      toast({
        title: "Invalid credentials",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Flex
      minHeight="85vh"
      alignItems="center"
      justifyContent="center"
      bgGradient={useColorModeValue('white', 'gray.700')}
    >
      <Box bg={useColorModeValue('white', 'gray.700')} p={8} rounded="lg" shadow="lg" maxW="lg" w="30rem">
        <Heading mb={6} textAlign="center" fontSize="2xl" color={useColorModeValue('purple.600', 'purple.300')}>
          Welcome Back
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input {...register('email')} type="email" name="email" focusBorderColor="purple.500" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                {...register('password')}
                type="password"
                name="password"
                focusBorderColor="purple.500"
              />
            </FormControl>
        <Text fontWeight={500} textAlign={'center'}>
          email: admin@admin.com
          password: 123  
        </Text>
            <Button
              disabled={isSubmitted}
              type="submit"
              colorScheme="purple"
              width="full"
              mt={4}
            >
              Login
            </Button>
            <Text textAlign="center" mt={6} color="gray.600">
              {`Don't`} have an account?
              <RouterLink to={"/signup"}>
                <Link color="purple.500">Sign Up</Link>
              </RouterLink>
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}

export default Signin;
