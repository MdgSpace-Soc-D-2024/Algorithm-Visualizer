
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './Create'
import Acc from '../HomePage/AccPage'
import Main from '../HomePage/HomePage'
import FeedbackForm from '../HomePage/Feedback'
import SortingVisualizer from '../SortingVisualizer/SortingVisualizer'
import QuickSort from '../SortingVisualizer/QuickSort'
import SelectionSort from '../SortingVisualizer/SelectionSort'
import MergeSort from '../SortingVisualizer/MergeSort'
import InsertionSort from '../SortingVisualizer/InsertionSort'
import { UserProvider } from './UserContext'

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Main/>}/>
                    <Route path="/" element={<Create/>}/>
                    <Route path="/bubblesort" element={<SortingVisualizer/>}/>
                    <Route path="/selectionsort" element={<SelectionSort/>}/>
                    <Route path="/insertionsort" element={<InsertionSort/>}/>
                    <Route path="/quicksort" element={<QuickSort/>}/>
                    <Route path="/mergesort" element={<MergeSort/>}/>
                    <Route path="/acc" element={<Acc/>}/>
                    <Route path="/feedback" element={<FeedbackForm/>}/>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App