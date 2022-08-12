import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box, Button, Divider, Grid, GridItem, Heading, Spinner,
    Container,
    Text,
    Flex,
    Spacer,
    Avatar,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react';
import React, { useState } from "react";
import { useParams } from "react-router-dom"
import {Link} from 'react-router-dom'
import { DoctorProps, DoctorTimeProps, DateProps } from "../../interfaces/app.interface";
import { AppService } from "../../services/app.service";

const DoctorDetail = () =>{
    const [isLoading, setLoading] = useState(true)
    const {doctorId} = useParams<'doctorId'>();
    const [doctor, setDoctor] = useState<DoctorProps>()
    const [date, setDate] = useState<DateProps[]>([])
    const [timeSlot, setTimeSlot] = useState<DoctorTimeProps[]>([])
    const [initDateIndex, setInitDateIndex] = useState(0)
    const [initTargetIndex, setInitTargetIndex] = useState(5)

    const _appService = new AppService()

    React.useEffect(()=>{
        generateFiveDays()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const getDoctorById = async (id:any, pDate: DateProps[]) => {
        const response = await _appService.getDoctorById(id)
        let _timeSlot: DoctorTimeProps[] = response.opening_hours
        let doctor: DoctorProps = response
        doctor.name = doctor.name.toLowerCase()
        setDoctor(doctor)
        setTimeSlot(_timeSlot)
        setLoading(false)
        generateDateData(pDate, _timeSlot)
    }

    const generateDateData = (pDate: DateProps[], _timeSlot: DoctorTimeProps[]) =>{
        pDate.forEach(val=>{
            let filteredTime = _timeSlot.filter(x=>x.day === val.value)
            if(filteredTime.length > 0){
                let selectedTime: DoctorTimeProps = filteredTime[0]
                let startTime: number = Number(selectedTime.start)
                let endTime: number = Number(selectedTime.end)
                let temp = []
                while (startTime <= endTime) {
                    temp.push((Math.round(startTime * 100) / 100).toFixed(2))
                    startTime = startTime + 1
                }

                val.isClosed = selectedTime.isClosed
                val.times = temp
            }
        })
        setDate(pDate)
    }

    const generateFiveDays = (action: string = "") =>{
        const d = new Date();
        let temp = []
        let start = action === "next" ? initDateIndex + 5 : action === "prev" ? initDateIndex - 5 : initDateIndex
        let target = action === "next" ? initTargetIndex + 5 : action === "prev" ? initTargetIndex - 5 : initTargetIndex

        for (let i = start; i < target; i++) {
            let _date = new Date(new Date().getTime()+(i*24*60*60*1000))
            let day = _date.toLocaleDateString('en-EN', { weekday: 'short' }).toLocaleUpperCase()
            let month = _date.toLocaleDateString('en-EN', {month: 'short'})
            let dayText = day
            if(d.getTime() === _date.getTime()){
                dayText = "TODAY"
            }
            temp.push({
                text: dayText+' '+_date.getDate()+' '+month,
                value: day,
                times: [],
                date: formatDate(_date.getTime())
            })
        }

        if(action !== ""){
            setInitDateIndex(start)
            setInitTargetIndex(target)
        }

        if(!doctor){
            getDoctorById(doctorId, temp)
        }else{
            generateDateData(temp, timeSlot)
        }
    }

    const formatDate = (dt: number) => {
        let d = new Date(dt);
        let month = (d.getMonth() + 1).toString();
        let day = d.getDate().toString();
        let year = d.getFullYear();
        if (month.length < 2) {
          month = '0' + month;
        }
        if (day.length < 2) {
          day = '0' + day;
        }
        return [year, month, day].join('-');
    }

    const generateTableBody = () =>{
        let result = []
        const dateLocal = date.sort(function(a, b){
            return b.times?.length - a.times.length;
        });

        if(dateLocal.length > 0){
            const longestTime = dateLocal[0].times.length
            for (let i = 0; i < longestTime; i++) {
                result.push(<Tr key={i}>
                    {date.map((v, k)=>
                        <Td padding={0} key={k}>
                            {!v.isClosed && v.times[i] ? 
                            <Button variant='ghost' _hover={{
                                bg: 'green.400'
                            }} width={'full'} as={Link} to={"booking?start="+v.times[i]+"&date="+v.date}>{v.times[i]}</Button>
                            : null}
                        </Td>
                    )}
                </Tr>)
            }
        }

        return result
    }

    return(
        <Box paddingLeft={'10%'} paddingRight={'10%'} paddingTop={75} paddingBottom={75}>
            <Button
            as={Link}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            to='/doctors'
            >
                <ChevronLeftIcon/> Back to doctor list
            </Button>
            {isLoading ? 
            <Container centerContent>
                <Spinner 
                color='green.500'
                size='xl'/> 
                <Text marginTop={5}>Loading doctor's detail...</Text>
            </Container>
            : 
            <Grid
            marginTop={20}
            minH={200}
            templateColumns='repeat(5, 1fr)'
            gap={4}
            >
                <GridItem rowSpan={2} colSpan={2} id="test">
                    <Container centerContent>
                        <Avatar
                        marginBottom={5}
                        size={'2xl'}
                        src={require(`../../asset/images/${doctorId}.jpeg`)}
                        />          
                        <Heading textTransform={'capitalize'}>{doctor?.name}</Heading>
                        <Text>{doctor?.address?.line_1} {doctor?.address?.line_2}, {doctor?.address?.district}</Text>
                    </Container>
                    <Divider marginTop={5} marginBottom={5}/>
                    <Container>
                        <Heading size="sm">Description</Heading>
                        <Text>{doctor?.description !== "" ? doctor?.description : "-"}</Text>
                    </Container>

                </GridItem>
                <GridItem colSpan={3}>
                    <Container centerContent maxW={'md'}>
                        <Heading>Choose Time</Heading>
                    </Container>
                    <Container>
                        <Flex>
                            <Button size={'sm'} colorScheme="green" onClick={generateFiveDays.bind(this, "prev")}
                            disabled={initDateIndex===0}>
                                <ChevronLeftIcon/> Prev
                            </Button>
                        <Spacer />
                            <Button size={'sm'} colorScheme="green" onClick={generateFiveDays.bind(this, "next")}>
                                Next <ChevronRightIcon/>
                            </Button>
                        </Flex>
                    </Container>
                    <TableContainer>
                        <Table variant='striped' colorScheme='green'>
                            <Thead>
                            <Tr>
                                {date.map((v, k)=>
                                    <Th key={k}>{v.text}</Th>
                                )}
                            </Tr>
                            </Thead>
                            <Tbody>
                                {generateTableBody().map((v, k)=>{
                                    return v
                                })}
                            </Tbody>
                        </Table>
                        </TableContainer>
                </GridItem>
            </Grid>
            }
            
        </Box>
    )
}

export default DoctorDetail