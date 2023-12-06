import { React } from 'react';
import {
  Text,
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Spacer,
} from '@chakra-ui/react';


import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { auth } from "../firebase";
import { handleAuth } from '@/api/auth';





const Links = [
  {
    "title": "Add To-Do",
    ref: "/add-todo"
  },
  {
    title: "Add Event",
    ref: "/add-calendar-event"
  },
  {
    title: "Add Contact",
    ref: "/add-contact"
  },
  {
    title: "List All",
    ref: "/"
  }
];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={children.ref}>
    {children.title}
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, user } = useAuth();
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box ml={[0, 0, 10]} fontWeight={800}>
              THE APP
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.ref}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://web.archive.org/web/20230521174951/https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => toggleColorMode()}>

                      {colorMode == "dark" ? <FaSun /> : <FaMoon />}
                      <Spacer/>
                      {colorMode == "dark" ? "Switch to Light Mode" : "Switch to Light Mode"}
                </MenuItem>
                <MenuDivider />
                {isLoggedIn && (
                  <>
                    <MenuItem>
                      <Text color="green.500">{user.email}</Text>
                    </MenuItem>
                    <MenuItem>
                        <Link color="red.500" onClick={() => auth.signOut()}>
                          Logout
                        </Link>
                    </MenuItem>
                  </>
                )}
                <>
                  {!isLoggedIn && (
                  <MenuItem lefticon={<FaGoogle />} onClick={() => handleAuth()}>
                    Login with Google
                  </MenuItem>
                  )}
                </>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}