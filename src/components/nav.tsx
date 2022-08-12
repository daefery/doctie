import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    useColorModeValue,
    useDisclosure,
    useToast,
    Menu, MenuItem, MenuButton, MenuList, Avatar, MenuDivider, Badge,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon
} from '@chakra-ui/icons';
import {Link as RLink} from 'react-router-dom'
import Logo from './logo';
import Login from './login';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context';
import { AppService } from '../services/app.service';
import { BookingProps, NavItemProps } from '../interfaces/app.interface';
  
export default function Nav() {
    const { isOpen, onToggle } = useDisclosure();
    const { 
        isOpen: isOpenLoginModal, 
        onOpen: onOpenLoginModal, 
        onClose: onCloseLoginModal 
    } = useDisclosure()
    const toast = useToast()
    const _appService = new AppService()

    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const [totalAppointment, setTotalAppointment] = useState(0)

    useEffect(()=>{
        if(authenticated && totalAppointment === 0){
            getAppointment()
        }
    }, [authenticated]) // eslint-disable-line react-hooks/exhaustive-deps

    const getAppointment = async() =>{
        const response = await _appService.getAppointment()
        let appointment: BookingProps[] = response
        appointment = appointment.filter(x=>x.doctorId !== undefined && x.status !== "cancelled")
        setTotalAppointment(appointment.length)
    }

    const afterLoginAction = () =>{
        onCloseLoginModal()
    }

    const logout = async() =>{
        const response = await _appService.logout()
        if(response.ok){
            setAuthenticated(false)
        }else{
            toast.closeAll()
            toast({
                title: "Cannot logout.",
                status: 'error',
                isClosable: true,
                position: 'top'
            })
        }
    }
    return (
      <Box>
        <Flex id="navBar"
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Logo color={useColorModeValue('gray.700', 'white')} />
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
  
        {authenticated ?
        <Stack
        flex={{ base: 1, md: 0 }}
        justify={'flex-end'}
        direction={'row'}
        spacing={6}>
            <Menu>
                <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                    size={'sm'}
                    src={require('../asset/images/profile.jpeg')}
                />
                </MenuButton>
                <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem as={RLink} to="/appointments">
                    My Appointment {totalAppointment !== 0 ? <Badge borderRadius={'full'} marginLeft={2} colorScheme='red'>{totalAppointment}</Badge> : null}
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </Stack>
        : 
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Button
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                onClick={onOpenLoginModal}>
                Login
            </Button>
            <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                colorScheme={'green'}
                >
                Signup
            </Button>
        </Stack>
          }
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>

        <Modal size={'xl'} isOpen={isOpenLoginModal} onClose={onCloseLoginModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <Login closeModal={afterLoginAction}/>
                </ModalBody>
            </ModalContent>
        </Modal>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
  
    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                to={navItem.href ?? '#'}
                as={RLink}
                p={2}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
                }}>
                  {navItem.label}
                </Link>
              </PopoverTrigger>
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }: NavItemProps) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link as={RLink} to={child.href ? child.href : "/"} key={child.label} py={2}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  
  const NAV_ITEMS: Array<NavItemProps> = [
    {
        label: 'Home',
        href: '/',
    },
    {
      label: 'Browse Doctor',
      href: '/doctors',
    }
  ];