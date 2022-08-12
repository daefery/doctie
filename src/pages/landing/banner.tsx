import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
  } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const BannerSection = () =>{
    return(
      <Container maxW={'3xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Meet your doctor <br />
          <Text as={'span'} color={'green.400'}>
            with doctie
          </Text>
        </Heading>
        <Text color={'gray.500'}>
          Now you can easily check your docter and make an appointment online. 
          Spending so much time for waiting the line.
          Doctie comes to make your life easier.
        </Text>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}>
          <Button
            as={Link}
            to="/doctors"
            colorScheme={'green'}
            bg={'green.400'}
            rounded={'full'}
            px={6}
            _hover={{
              bg: 'green.500',
            }}>
            Get Started
          </Button>
        </Stack>
      </Stack>
    </Container>
    )
}

export default BannerSection