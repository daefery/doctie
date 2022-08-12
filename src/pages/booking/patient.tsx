import { Button, Modal, ModalBody, ModalOverlay, Heading, ModalContent, ModalCloseButton, Container, Center, Input, Stack, ButtonGroup, useDisclosure } from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useContext, useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import AuthContext from "../../context"
import Login from "../../components/login"
import { PathProps } from "../../interfaces/app.interface"

const Patient = (param: PathProps) =>{
    const [patientName, setPatientName] = useState("")
    const { 
        isOpen: isOpenLoginModal, 
        onOpen: onOpenLoginModal, 
        onClose: onCloseLoginModal 
    } = useDisclosure()

    const changePatientName = (e: React.FormEvent<HTMLInputElement>) =>{
        setPatientName(e.currentTarget.value)
    }
    const {authenticated, authData} = useContext(AuthContext)
    const [option, setOption] = useState("")
    const navigate = useNavigate()

    const optionAction = (opt: string) =>{
        setOption(opt)
        if(opt === "self" && authenticated){
            navigate(param.path+param.search+"&name="+authData.name)
        }
    }

    const afterLoginAction = (name: string) =>{
        navigate(param.path+param.search+"&name="+name)
        onCloseLoginModal()
    }

    return(
        <Center h='100%'>
            <Container>
                <Stack textAlign={"center"} gap={3}>
                    <Heading>Who are you booking this appointment for?</Heading>
                    {option === "" ? 
                    <ButtonGroup justifyContent={'center'}>
                        <Button variant={"outline"} onClick={optionAction.bind(this, "self")}>My self</Button>
                        <Button variant={"outline"} onClick={optionAction.bind(this, "else")}>Someone else</Button>
                    </ButtonGroup>
                    : null}
                    
                    {option === "self" ? 
                        authenticated ? 
                        <Heading>namanya</Heading>
                        : <ButtonGroup justifyContent={'center'}>
                            <Button variant={'outline'} onClick={onOpenLoginModal}>Login</Button>
                        </ButtonGroup>
                    : null}

                    {option === "else" ? 
                    <>
                    <Input placeholder='What is your name?' size='lg' focusBorderColor='green.400'
                    value={patientName} onChange={changePatientName}/>
                    <Button
                    rightIcon={<ArrowForwardIcon />} disabled={patientName === ""} as={Link} to={param.path+param.search+"&name="+patientName}
                    alignSelf={'flex-end'} colorScheme='green' variant='outline' borderRadius={'50px'}>
                        Next
                    </Button>
                    </>
                    : null}
                </Stack>
            </Container>

            <Modal size={'xl'} isOpen={isOpenLoginModal} onClose={onCloseLoginModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                    <Login closeModal={afterLoginAction}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Center>
    )
}


export default Patient