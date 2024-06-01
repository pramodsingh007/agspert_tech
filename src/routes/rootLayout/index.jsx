import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Button, Flex, useColorMode } from '@chakra-ui/react'
import { Outlet } from 'react-router'


function ToggleSwitch() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
      <header>
        <Button onClick={toggleColorMode}>
           {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
        </Button>
      </header>
    )
  }

function RootLayout() {
  return (
    <>
    <Flex align={'end'} display={'flex'} justifyContent={'flex-end'} p={4}>
        <ToggleSwitch/>
    </Flex>
    <Outlet></Outlet>
    </>
  )
}

export default RootLayout