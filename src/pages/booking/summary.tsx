import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
    Heading,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from '@chakra-ui/react';
import { FaUserMd, FaMapMarkerAlt, FaCalendar, FaClock } from 'react-icons/fa';
import { BookingProps, PathProps } from '../../interfaces/app.interface';
import { AppService } from '../../services/app.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
  
export default function Summary(param: PathProps) {
    const {doctorId} = useParams<'doctorId'>();
    let navigate = useNavigate()
    const urlParams = new URLSearchParams(param.search);
    const [loading, setLoading] = useState(false)
    const _appService = new AppService()
    const { isOpen, onOpen, onClose } = useDisclosure()

    if(urlParams.get('name') === "" || urlParams.get('name') === null){
        window.history.back()
    }

    const bookDoctor = async () =>{
        onClose()
        setLoading(true)
        const response = await _appService.bookDoctor({
            id: (Math.random() + 1).toString(36).substring(7),
            doctorId: doctorId?doctorId:"",
            date: urlParams.get("date"),
            name: urlParams.get("name"),
            start: Number(urlParams.get("start")),
            status: "cancel"
        })

        let booking: BookingProps = response
        setLoading(false)
        if(booking.id !== ""){
            navigate(param.path+param.search+'&status=done')
        }else{
            navigate(param.path+param.search+'&status=failed')
        }
    }

    return (
        <Center h={'100%'}>
        <Box
            maxW={'330px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <Stack
            textAlign={'center'}
            p={6}
            color={useColorModeValue('gray.800', 'white')}
            align={'center'}>
            <Text
                fontSize={'sm'}
                fontWeight={500}
                bg={useColorModeValue('green.50', 'green.900')}
                p={2}
                px={3}
                color={'green.500'}
                rounded={'full'}>
                Booking Summary
            </Text>
            <Stack direction={'row'} align={'center'} justify={'center'}>
                <Text fontSize={'2xl'} fontWeight={800} textTransform={'capitalize'}>
                {urlParams.get('name')}
                </Text>
            </Stack>
            </Stack>

            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                <Heading size={'md'}>Doctor Details</Heading>
                <List spacing={3} marginTop={5}>
                    <ListItem textTransform={'capitalize'}>
                    <ListIcon as={FaUserMd} color="green.400" />
                    {param.doctor?.name}
                    </ListItem>
                    <ListItem>
                    <ListIcon as={FaMapMarkerAlt} color="green.400" />
                    {param.doctor?.address?.line_1} {param.doctor?.address?.line_2}, {param.doctor?.address?.district}
                    </ListItem>
                    <ListItem>
                    <ListIcon as={FaCalendar} color="green.400" />
                    {urlParams.get("date")}
                    </ListItem>
                    <ListItem>
                    <ListIcon as={FaClock} color="green.400" />
                    {urlParams.get("start")} - {(Math.round((Number(urlParams.get("start"))+1) * 100) / 100).toFixed(2)}
                    </ListItem>
                </List>

                <Button
                    mt={10}
                    w={'full'}
                    bg={'green.400'}
                    color={'white'}
                    rounded={'xl'}
                    boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                    _hover={{
                    bg: 'green.500',
                    }}
                    _focus={{
                    bg: 'green.500',
                    }} onClick={onOpen} isLoading={loading}>
                    Book Now
                </Button>
            </Box>
        </Box>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody pb={6}>
                <Text>Are you sure want to proceeed?</Text>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='green' mr={3} onClick={bookDoctor}>Yes</Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </Center>
    );
}