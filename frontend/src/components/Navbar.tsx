import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { Toaster } from "./ui/toaster";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()


  return (
    <>
      <Container maxW={'1140px'} px={4}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDir={{
            base: 'column',
            sm: 'row'
          }}
        >
          <Text
            fontSize={{ base: '22px', sm: '28px'}}
            fontWeight={'bold'}
            textTransform={'uppercase'}
            textAlign={'center'}
            bgGradient={'to-r'}
            gradientFrom={'cyan.400'}
            gradientTo={'blue.500'}
            bgClip={'text'}
          >
            <Link to={'/'}>
              產品管理 🛒
            </Link>
          </Text>


          <HStack spaceX={2} alignItems={'center'}>
            <Link to={'/create'}>
              <Button
                bg={useColorModeValue('whiteAlpha.50', 'blackAlpha.300')}
                color={useColorModeValue('blackAlpha.900', 'whiteAlpha.900')}
              >
                <BsPlusSquare fontSize={20} />
              </Button>
            </Link>

            <Button
              fontSize={18}
              
              onClick={toggleColorMode}
              bg={useColorModeValue('whiteAlpha.50', 'blackAlpha.300')}
            >
              {colorMode === 'light' ? '🌙' : '☀️'}
            </Button>
          </HStack>
        </Flex>
      </Container>
      
      <Toaster />
    </>
  )
}
export default Navbar