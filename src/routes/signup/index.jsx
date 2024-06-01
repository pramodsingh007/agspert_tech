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
} from '@chakra-ui/react';
import {  useForm } from 'react-hook-form';
import {Link as RouterLink } from 'react-router-dom';

 
const Signup = () => {
  const toast = useToast();
  const { register, handleSubmit, formState: {isSubmitted} } = useForm({defaultValues:{
    username:"",
    email:"",
    password:"",
    confirmPassword:""
}});
  const onSubmit = (data) => {
    console.log(data)
    const {username,password,confirmPassword} = data
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position:'bottom-right'
      });
      return;
    }

    toast({
      title: 'Account created',
      description: `Welcome, ${username}!`,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position:'bottom-right'
    });
  };

  return (
    <Flex  minWidth="30vw" alignItems="center" justifyContent="center" bgGradient={useColorModeValue('white', 'gray.700')}>
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        p={8}
        rounded="lg"
        shadow="lg"
        maxW="lg"
        w="full"
      >
        <Heading mb={6} textAlign="center" fontSize="2xl" color={useColorModeValue('purple.600', 'purple.300')}>
          Create an Account
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input {...register('username')} type="text" name="username" focusBorderColor="purple.500" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input {...register('email')} type="email" name="email" focusBorderColor="purple.500" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input {...register('password')} type="password" name="password" focusBorderColor="purple.500" />
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input {...register('confirmPassword')} type="password" name="confirmPassword" focusBorderColor="purple.500" />
            </FormControl>
            <Button disabled={isSubmitted} type="submit" colorScheme="purple" width="full" mt={4}>
              Sign Up
            </Button>
            
            <Text textAlign="center" mt={6} color="gray.600">
              Already have an account? 
                <RouterLink to={"/"}>
              <Link color="purple.500" >Login</Link>
                </RouterLink>
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Signup;
