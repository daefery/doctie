import {
    Avatar,
    Box,
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
    Tooltip
  } from '@chakra-ui/react';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { MdBookmarkRemove } from 'react-icons/md';
import {Link as RLink} from 'react-router-dom'
import { BookingProps, DoctorProps } from '../interfaces/app.interface';
  
  export const DoctorCard = (param: DoctorProps) =>{
    return (
      <Center py={6}>
        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'120px'}
            w={'full'}
            src={require('../asset/images/bg.jpeg')}
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={require(`../asset/images/${param.id}.jpeg`)}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading textAlign={'center'} fontSize={'2xl'} fontWeight={500} fontFamily={'body'} textTransform={'capitalize'}>
                {param.name}
              </Heading>
              <Text textAlign={'center'} color={'gray.500'}>{param.address?.line_1} {param.address?.line_2}, {param.address?.district}</Text>
            </Stack>

            <Button
            display={param.source === "book" ? "none" : "inline-flex"}
            as={RLink}
            to={param.id}
            w={'full'}
            mt={8}
            bg={useColorModeValue('green', 'gray.500')}
            color={'white'}
            rounded={'md'}
            _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
            }}>
            Detail
            </Button>
          </Box>
        </Box>
      </Center>
    );
  }
  
  export const BookingCard = (props: BookingProps) =>{
    const time = (Math.round((Number(props.start)) * 100) / 100).toFixed(2)+" - "+(Math.round((Number(props.start)+1) * 100) / 100).toFixed(2)
    return (
        <Center py={6}>
        <Box
          w={'full'}
          bg={useColorModeValue(props.status === "confirmed" ? 'white' : 'red.50', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}>
            <Badge colorScheme={props.status === "confirmed" ? "green" : "red"}>
            {props.status}
            </Badge>
            <Stack direction={'row'} mt={6} align={'center'}>
                <Avatar
                size={'md'}
                src={require(`../asset/images/${props.doctorId}.jpeg`)}
                mb={4}
                pos={'relative'}
            />
            <div>
                <Heading fontSize={'xl'} fontFamily={'body'} textTransform={'capitalize'}>
                    Dr. {props.doctorName}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    Specialist
                </Text>   
            </div>
            
            </Stack>
            <Box
            maxW={'320px'}
            w={'full'}
            color={'gray.500'}
            bg={useColorModeValue('gray.100', 'gray.900')}
            rounded={'lg'}
            p={6}>
                <Stack align={'center'} justify={'space-between'} direction={'row'}>
                    <Stack direction={'row'} align={'center'}>
                        <FaCalendar/>
                        <Text fontSize={'xs'}>{props.date}</Text>
                    </Stack>
                    <Stack direction={'row'} align={'center'}>
                        <FaClock/>
                        <Text fontSize={'xs'}>{time}</Text>
                    </Stack>
                </Stack>
            </Box>  

            
        
            <Stack mt={8} direction={'row'} justify={'flex-end'} spacing={4}>
                <Tooltip label="Cancel appointment?">
                    <Button disabled={props.status !== "confirmed"}
                    rounded={'full'}
                    color="red.400"
                    onClick={props.action?.bind(this, {
                        id: props.id,
                        name: props.name,
                        start: props.start,
                        doctorId: props.doctorId,
                        date: props.date,
                        status: "cancelled"
                    })}
                    variant={'ghost'}>
                    <MdBookmarkRemove fontSize={"20px"}/>
                    </Button>
                </Tooltip>
            </Stack>
        
        </Box>
      </Center>
    );
  }