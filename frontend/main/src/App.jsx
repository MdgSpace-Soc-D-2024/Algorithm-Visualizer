
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './Create'
// import Read from './Read'

import Main from '../HomePage/HomePage'
import SortingVisualizer from '../SortingVisualizer/SortingVisualizer'
import MergeSort from '../SortingVisualizer/MergeSort'
import { UserProvider } from './UserContext'

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Main/>}/>
                    <Route path="/create" element={<Create/>}/>
                    <Route path="/" element={<SortingVisualizer/>}/>
                    <Route path="/selectionsort" element={<MergeSort/>}/>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App