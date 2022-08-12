import { Box, Container, Heading, Spinner, Text, Grid, GridItem, Modal, ModalBody, ModalContent, ModalOverlay, ModalHeader, ModalFooter, Button, useDisclosure, useToast } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BookingCard } from "../../components/cards"
import AuthContext from "../../context"
import { BookingProps, DoctorProps } from "../../interfaces/app.interface"
import { AppService } from "../../services/app.service"

const Appointments = () =>{
    const navigate = useNavigate()
    const {authenticated} = useContext(AuthContext)
    const _appService = new AppService()
    const [appointments, setAppointments] = useState<BookingProps[]>([])
    const [loading, setLoading] = useState(true)
    const [saveLoading, setSaveLoading] = useState(false)
    const [selectedData, setSelectedData] = useState<BookingProps>({
        id: "",
        name: "",
        start: 0,
        doctorId: "",
        date: "",
        status: ""
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    useEffect(()=>{
        if(!authenticated){
            return navigate("/")
        }

        getDoctors()
    },  []) // eslint-disable-line react-hooks/exhaustive-deps

    const getAppointment = async(doctors: DoctorProps[]) =>{
        const response = await _appService.getAppointment()
        let appointments: BookingProps[] = response
        appointments.forEach(appointment=>{
            const doctorIdx = doctors.findIndex(p=>p.id === appointment.doctorId)
            if(doctorIdx !== -1){
                appointment.doctorName = doctors[doctorIdx].name
            }
        })
        setAppointments(appointments)
        setLoading(false)
    }

    const getDoctors = async () => {
        const response = await _appService.getDoctors()
        let doctors: DoctorProps[] = response
        getAppointment(doctors)
    }

    const cancelAppointment = async() =>{
        setSaveLoading(true)
        const response = await _appService.updateAppointment(selectedData)
        let appointment: BookingProps = response

        if(appointment.id !== ""){
            toast({
                title: "Appointment is updated.",
                status: 'success',
                isClosable: true,
                position: 'top'
            })
            getDoctors()
        }else{
            toast({
                title: "Appointment cannot be updated.",
                status: 'error',
                isClosable: true,
                position: 'top'
            })
        }
        setSaveLoading(false)
        onClose()
    }

    const modalAction = (data: BookingProps) =>{
        setSelectedData(data)
        onOpen()
    }

    return(
        <Box paddingLeft={'10%'} paddingRight={'10%'} paddingTop={75} paddingBottom={75}>
            <Heading>My Appointment</Heading>
            {loading ? 
            <Container centerContent>
                <Spinner 
                color='green.500'
                size='xl'/> 
                <Text marginTop={5}>Getting my appointments...</Text>
            </Container>
            : 
            <Grid templateColumns='repeat(3, 1fr)' gap={6} id="test">
                {appointments.map((v, k)=>
                {
                    let res = null
                    if(v.doctorId !== undefined){
                        res = <GridItem w='100%' key={k}>
                            <BookingCard key={k} id={v.id} date={v.date} doctorId={v.doctorId} 
                            name={v.name} start={v.start} status={v.status} action={modalAction}
                            doctorName={v.doctorName?.toLowerCase()}/>
                        </GridItem>
                    }

                    return res
                }
                )}
            </Grid>
            }

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody pb={6}>
                <Text>Are you sure want to cancel?</Text>
            </ModalBody>

            <ModalFooter>
                <Button isLoading={saveLoading} colorScheme='green' mr={3} onClick={cancelAppointment}>Yes</Button>
                <Button onClick={onClose} disabled={saveLoading}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </Box>
    )
}

export default Appointments