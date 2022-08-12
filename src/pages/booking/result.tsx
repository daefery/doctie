import { Box, Button, ButtonGroup, Center, Container, Heading, Icon, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

export default function BookingResult(path: any) {
    return (
        <Center h={'100%'}>
            <Container>
            {path.status === "done" ? 
            <Box textAlign="center" py={10} px={6}>
                <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    Your appointment booked.
                </Heading>
                <Text color={'gray.500'}>
                    Please wait for doctor's confirmation in several hours and for the note please bring your card identity before you go to hospital or clinic.
                    You can book another appointment with different doctor by clicking this button below.
                </Text>
                <ButtonGroup mt={6} mb={2}>
                    <Button as={Link} to="/appointments">View my appointment</Button>
                    <Button as={Link} to="/doctors" colorScheme='green'>Book New Appointment</Button>
                </ButtonGroup>
            </Box>
            : 
            <Box textAlign="center" py={10} px={6}>
                <Icon as={FaTimesCircle} boxSize={"50px"} color={"red.400"}/>
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    Your booking failed.
                </Heading>
                <Text color={'gray.500'}>
                    Something wrong in the process, can be coming from server, please contact admin for more help.
                </Text>
                <ButtonGroup mt={6} mb={2}>
                    <Button as={Link} to="/">Home</Button>
                    <Button as={Link} to="/doctors" colorScheme='green'>Book New Appointment</Button>
                </ButtonGroup>
            </Box>
            }
            </Container>
        </Center>
    );
}