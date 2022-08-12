import { Box, Button, Flex, Spacer, Grid, GridItem, Icon, Text, Container, Center, Stack, Spinner } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"
import { DoctorCard } from "../../components/cards"
import Logo from "../../components/logo"
import {Link, useLocation} from 'react-router-dom'
import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons"
import Patient from "./patient"
import { useEffect, useState } from "react"
import Summary from "./summary"
import {DoctorProps} from '../../interfaces/app.interface'
import { AppService } from "../../services/app.service"
import BookingResult from "./result"

const Booking = () =>{
    let location = useLocation()
    let navigate = useNavigate()
    const {doctorId} = useParams<'doctorId'>();

    const [path, setPath] = useState<URLSearchParams>()
    const _appService = new AppService()
    const [doctor, setDoctor] = useState<DoctorProps>()
    const [loading, setLoading] = useState(true)
    const [isDone, setIsDone] = useState(false)
    const [pathHistory, setPathHistory] = useState("/doctors/"+doctorId)

    useEffect(()=>{
        getDoctorById(doctorId)
        const urlParams = new URLSearchParams(location.search);
        setPath(urlParams)
        if(urlParams.get('status') !== null){
            setIsDone(true)
        }
        if(location.search === ""){
            return navigate("/doctors/"+doctorId)
        }

        if(isDone){
            window.location.replace('/');
            return navigate("/")
        }

        if(urlParams.get("name") === null || urlParams.get("name") === ""){
            setPathHistory("/doctors/"+doctorId)
        }else if(urlParams.get("start") !== null || urlParams.get("start") !== ""){
            setPathHistory(location.pathname+'?start='+urlParams.get("start")+'&date='+urlParams.get("date"))
        }
    }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

    const CircleIcon = (props: any) => (
        <Icon viewBox='0 0 200 200' {...props}>
          <path
            fill='currentColor'
            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
          />
        </Icon>
    )

    const getDoctorById = async (id:any) => {
        const response = await _appService.getDoctorById(id)
        let doctor: DoctorProps = response
        doctor.name = doctor.name.toLowerCase()
        setDoctor(doctor)
        setLoading(false)
    }

    return(
        <>
        {loading ? 
        <Box minH={'100vh'}>
            <Center h='100vh'>
                <Container centerContent>
                    <Spinner color="green.400" w={'8rem'} h={'8rem'}/>
                </Container>
            </Center>
        </Box>
        : 
        <Box>
            <Grid
            minH={'100vh'}
            templateColumns='repeat(4, 1fr)'
            >
            <GridItem colSpan={1} bg='gray.100' padding={5}>
            <Logo/>
                <Center h='100%' padding={0}>
                    <Stack width={'100%'}>
                        {loading ? 
                        <Spinner/> : 
                        <DoctorCard name={doctor?.name ? doctor?.name : ""} id={doctorId?doctorId:""} address={doctor?.address} source={"book"}/>
                        }
                        <Box paddingLeft={10} paddingRight={10}>
                        <Flex>
                            <CircleIcon/>
                            <Spacer marginBottom={'7px'} borderBottom={'1px solid'} borderBottomColor={path?.get("name") !== null ? "black" : "gray.400"}/>
                            <CircleIcon color={path?.get("name") !== null ? "black" : "gray.400"}/>
                            <Spacer marginBottom={'7px'} borderBottom={'1px solid'} borderBottomColor={path?.get("status") !== null ? "black" : "gray.400"}/>
                            <CircleIcon color={path?.get("status") !== null ? "black" : "gray.400"}/>
                        </Flex>
                        </Box>
                        <Flex paddingLeft={30} paddingRight={30}>
                            <Text textAlign={'center'} maxW={'40px'} fontSize={'10px'}>Patient Details</Text>
                            <Spacer/>
                            <Text textAlign={'center'} maxW={'50px'} fontSize={'10px'}>Booking Summary</Text>
                            <Spacer/>
                            <Text textAlign={'center'} maxW={'40px'} fontSize={'10px'}>Booked</Text>
                        </Flex>
                        
                    </Stack>
                </Center>
            </GridItem>
            <GridItem colSpan={3} padding={5}>
                {path?.get("status") === null ? 
                <Flex>
                    <Button
                    as={Link}
                    to={pathHistory}
                    fontSize={'md'}
                    variant={'link'}
                    replace={true}
                    >
                        <ChevronLeftIcon/> Back
                    </Button>   
                <Spacer />
                    <Button
                    as={Link}
                    fontSize={'md'}
                    variant={'link'}
                    to={'/doctors/'+doctorId}
                    >
                    Close <CloseIcon/>
                    </Button>
                </Flex>
                : null}
                {path?.get("name") === null ? 
                    <Patient path={location.pathname} search={location.search}/>
                : path?.get("status") !== null ? 
                    <BookingResult status={path?.get("status")}/>
                : <Summary path={location.pathname} search={location.search} doctor={doctor}/>}
            </GridItem>
            </Grid>
        </Box>
        }
        </>
    )
}

export default Booking