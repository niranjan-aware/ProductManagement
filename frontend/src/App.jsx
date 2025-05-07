import { Box, Button, ButtonGroup, useColorModeValue } from '@chakra-ui/react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreatePages from './pages/CreatePages'
import Navbar from './components/Navbar'

function App() {

  return (
    <Box width={"100vw"} bgColor={useColorModeValue("gray.100","gray.900")}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<CreatePages/>}/>
      </Routes>
    </Box>
  )
}

export default App
