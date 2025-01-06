
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './Create'
// import Read from './Read'

import Main from '../HomePage/HomePage'
import SortingVisualizer from '../SortingVisualizer/SortingVisualizer'
import { UserProvider } from './UserContext'

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Main/>}/>
                    <Route path="/" element={<Create/>}/>
                    <Route path="/bubblesort" element={<SortingVisualizer/>}/>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App