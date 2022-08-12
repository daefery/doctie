import { Box, Grid, GridItem, Heading, Spinner, Container, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { DoctorCard } from "../../components/cards"
import { DoctorProps } from "../../interfaces/app.interface"
import { AppService } from "../../services/app.service"

const DoctorList = () =>{
    const [isLoading, setLoading] = useState(true)
    const [doctors, setDoctors] = useState<DoctorProps[]>([])
    React.useEffect(()=>{
        getDoctors()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const _appService = new AppService()

    const getDoctors = async () => {
        const response = await _appService.getDoctors()
        let doctors: DoctorProps[] = response
        let result = doctors.map(x=>{
            x.name = x.name.toLowerCase()
            return x
        })

        setLoading(false)
        setDoctors(result)
    }

    return(
        <Box paddingLeft={'10%'} paddingRight={'10%'} paddingTop={75} paddingBottom={75}>
            <Heading>Doctor List</Heading>
            {isLoading ? <Container centerContent>
                <Spinner 
                color='green.500'
                size='xl'/> 
                <Text marginTop={5}>Searching for doctor(s)...</Text>
            </Container>
             : 
            <Grid templateColumns='repeat(4, 1fr)' gap={6} id="test">
                {doctors.map((v, k)=>
                <GridItem w='100%' key={k}>
                    <DoctorCard name={v.name} id={v.id} address={v.address}/>
                </GridItem>
                )}
            </Grid>
            }
            
        </Box>
    )
}

export default DoctorList