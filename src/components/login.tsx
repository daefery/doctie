import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import AuthContext from '../context';
import { AppService } from '../services/app.service';

interface LoginVoid{
    closeModal: (name: string)=>void
}
  
export default function Login(props: LoginVoid) {
    const _appService = new AppService()
    const [uname, setUname] = useState("")
    const [pass, setPass] = useState("")
    const toast = useToast()
    const {authenticated, setAuthenticated} = useContext(AuthContext)

    const login = async() =>{
        let request = {
            username: uname,
            password: pass
        }

        const response = await _appService.login(request)
        if(!response.ok){
            toast.closeAll()
            toast({
                title: response.message,
                status: 'error',
                isClosable: true,
                position: 'top'
            })
        }else{
            toast.closeAll()
            setAuthenticated(true)
            props.closeModal(response.name)
        }
    }

    const changeForm = (e: React.FormEvent<HTMLInputElement>) =>{
        if(e.currentTarget.name === "username"){
            setUname(e.currentTarget.value)
        }else{
            setPass(e.currentTarget.value)
        }
    }

    return (
      <Flex
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link>
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input type="text" name='username' placeholder='Type your username' focusBorderColor='green.400' onChange={changeForm} value={uname}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" name='password' placeholder='Type your password' focusBorderColor='green.400' onChange={changeForm} value={pass}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox colorScheme='green'>Remember me</Checkbox>
                </Stack>
                {!authenticated ? 
                <Button
                    bg={'green.400'}
                    color={'white'}
                    _hover={{
                    bg: 'green.500',
                    }} onClick={login}
                    >
                    Sign in
                </Button>
                : null}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }