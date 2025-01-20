import  { useState, useEffect } from 'react';
import ThemeToggle from './Component/ThemeToggle';
import Sidebar from './Component/Sidebar';
import BackgroundShapes from './Component/BackgroundShapes';
import Modal from './Component/Modal';
import './home.css';
import { useUser } from "../src/UserContext";
 
const algorithmInfo = {
  bubble: {
    title: "Bubble Sort Algorithm",
    description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    complexity: { time: "O(n²)", space: "O(1)" },
    learnMoreUrl: "https://en.wikipedia.org/wiki/Bubble_sort",
    navlink:"/bubblesort"
  },
  quick: {
    title: "Quick Sort Algorithm",
    description: "Quick Sort is an efficient, in-place sorting algorithm that uses a divide-and-conquer strategy to sort elements.",
    complexity: { time: "O(n log n)", space: "O(log n)" },
    learnMoreUrl: "https://en.wikipedia.org/wiki/Quicksort"
  },
  merge: {
    title: "Merge Sort Algorithm",
    description: "Merge Sort is a divide-and-conquer algorithm that recursively breaks down a problem into smaller, more manageable subproblems until they become simple enough to solve directly.",
    complexity: { time: "O(n log n)", space: "O(n)" },
    learnMoreUrl: "https://en.wikipedia.org/wiki/Merge_sort"
  }
};

const algorithmSections = [
  {
    title: "Sorting Algorithms",
    algorithms: [
      { key: "bubble", title: "Bubble Sort", description: "Visualize bubble sort algorithm in action" },
      { key: "quick", title: "Quick Sort", description: "Visualize quick sort algorithm in action" },
      { key: "merge", title: "Merge Sort", description: "Visualize merge sort algorithm in action" },
      { key: "insertion", title: "Insertion Sort", description: "Visualize insertion sort algorithm in action" }
    ]
  },
  {
    title: "Searching Algorithms",
    algorithms: [
      { key: "bfs", title: "BFS", description: "Visualize breadth-first search in action" },
      { key: "dfs", title: "DFS", description: "Visualize depth-first search in action" },
      { key: "binary", title: "Binary Search", description: "Visualize binary search in action" },
      { key: "linear", title: "Linear Search", description: "Visualize linear search in action" }
    ]
  },
  {
    title: "Miscellaneous",
    algorithms: [
      { key: "graph", title: "Graph Algorithms", description: "Explore various graph algorithms" },
      { key: "dp", title: "Dynamic Programming", description: "Visualize dynamic programming concepts" },
      { key: "greedy", title: "Greedy Algorithms", description: "Explore greedy algorithm patterns" }
    ]
  }
];

function Main() {
  const [theme, setTheme] = useState('light');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useUser();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev);
  };

  const handleCardClick = (algorithmKey) => {
    setSelectedAlgorithm(algorithmInfo[algorithmKey]);
    setIsModalOpen(true);
  };

  const renderAlgorithmCard = (algo) => (
    <div 
      key={algo.key} 
      className="algorithm-card" 
      data-algorithm={algo.key}
      onClick={() => handleCardClick(algo.key)}
    >
      <h3>{algo.title}</h3>
      <p>{algo.description}</p>
    </div>
  );

  return (
    <div className="body-dup2">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <BackgroundShapes />
      
      <div className="container2">
        <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
        
        <main className={`main-content ${isSidebarExpanded ? 'shifted' : ''}`}>
          <div className="header">
            <h1>Algorithm Visualizer</h1>
            <p>Welcome back {user}! Let&apos;s visualize some code.</p>
          </div>

          {algorithmSections.map((section, index) => (
            <section key={index} className="algorithm-section">
              <h2>{section.title}</h2>
              <div className="algorithm-cards">
                {section.algorithms.map(renderAlgorithmCard)}
              </div>
            </section>
          ))}
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        algorithm={selectedAlgorithm}
      />
    </div>
  );
}

export default Main;
