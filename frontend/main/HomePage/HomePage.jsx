import { useUser } from "../src/UserContext";
import {useNavigate} from "react-router-dom";

function Main(){
    const { user } = useUser();   
    const navigate= useNavigate();
    return(
        <div className="container1">
        <div className="menu">
                menu
        </div>
        <div className="content">
            <div className="Heading">
                <div className="title">
                    <h1>Algorithm Visualizer</h1>
                    <p>
                        Welcome!, {user}
                        New? Check out the guide
                    </p>
                </div>

            </div>
            <p>Sorting</p>
            <div className="sorting">
                <button onClick={()=>{navigate('/bubblesort')}}>
                    Bubble  Sort
                </button>
                <div>
                    Quick Sort
                </div>
                <div>
                    Merge Sort
                </div>
                <div>
                    Insertion Sort
                </div>
                <div>
                    Selection Sort
                </div>
            </div>
            <p>Searching</p>
            <div className="searching">

                <div>
                    Binary Search
                </div>
                <div>
                    BFS 
                </div>
                <div>
                    DFS
                </div>
                <div>
                    Dijkstra
                </div>
                <div>
                    Kruskal
                </div>
            </div>
        </div>
    </div>
    )
}
export default Main