import  { useState } from 'react';

function BinarySearch(){
  const [searchValue, setSearchValue] = useState('69');
  
  const treeData = {
    value: 74,
    left: {
      value: 50,
      left: {
        value: 15,
        left: {
          value: 10,
          left: {
            value: 8
          },
          right: {
            value: 14
          },
        },
        right: {
          value: 18,
          left: {
            value: 16
          },
          right: {
            value: 25
          }
        }
      },
      right: {
        value: 55,
        right: {
          value: 65,
          left: {
            value: 57
          },
          right: {
            value: 67,
            right: {
              value: 70,
              left: {
                value: 68,
                right: {
                  value: 69
                }
              }
            }
          }
        }
      }
    },
    right: {
      value: 85,
      right: {
        value: 95,
        left: {
          value: 89.2,
          right: {
            value: 91
          }
        },
        right: {
          value: 99
        }
      }
    }
  };

async function binarySearch(data){
    let right=data.value;
    let left=data.value;
    let mid=data.value;
    let initialValue=data.value;
    let last=data.value;
    try{while (mid) {
      console.log("mid:",mid);
      document.getElementById(`circle-${mid}`).setAttribute("fill", "yellow");
      document.getElementById(`circle-${mid}`).setAttribute("stroke", "yellow");
      document.getElementById(`text-${mid}`).setAttribute("fill", "white");
      await new Promise((resolve) => setTimeout(resolve, 200));
        if (mid == searchValue)
        {
          document.getElementById(`circle-${mid}`).setAttribute("fill", "green");
          document.getElementById(`circle-${mid}`).setAttribute("stroke", "black"); 
          break;
        }
            
        if (mid> searchValue)
        {
          document.getElementById(`line-${mid}-${data.left.value}`).setAttribute("stroke","yellow");
          await new Promise((resolve) => setTimeout(resolve, 200));
          document.getElementById(`circle-${mid}`).setAttribute("fill", "white"); 
          document.getElementById(`circle-${mid}`).setAttribute("stroke", "black"); 
          document.getElementById(`text-${mid}`).setAttribute("fill", "black");
          document.getElementById(`line-${mid}-${data.left.value}`).setAttribute("stroke","black");
          last=mid;
          data=data.left;
          mid=data.value;
          left=data.value;
          console.log("left:",left);
        }   

        else
        {
          document.getElementById(`line-${mid}-${data.right.value}`).setAttribute("stroke","yellow");
          await new Promise((resolve) => setTimeout(resolve, 100));
          document.getElementById(`circle-${mid}`).setAttribute("fill", "white");
          document.getElementById(`circle-${mid}`).setAttribute("stroke", "black");  
          document.getElementById(`text-${mid}`).setAttribute("fill", "black");
          document.getElementById(`line-${mid}-${data.right.value}`).setAttribute("stroke","black");  
          last=mid;     
          data=data.right;
          mid=data.value;
          right=data.value;
          console.log("right",right);  
        }     
    }}
    catch (error) {
      console.error("Error:", error);
      if (Math.max()<initialValue-right){
        if(initialValue-last<initialValue-left){
        document.getElementById(`circle-${last}`).setAttribute("fill", "red"); 
        document.getElementById(`circle-${mid}`).setAttribute("stroke", "black"); 
        document.getElementById(`text-${mid}`).setAttribute("fill", "white");
      }
      else{
        document.getElementById(`circle-${left}`).setAttribute("fill", "red");
        document.getElementById(`circle-${mid}`).setAttribute("stroke", "black"); 
        document.getElementById(`text-${mid}`).setAttribute("fill", "white");
      }
    }
    console.error("Error:", error);
      if (initialValue-left>initialValue-right){
        if(initialValue-last<initialValue-right){
        document.getElementById(`circle-${last}`).setAttribute("fill", "red"); 
        document.getElementById(`circle-${mid}`).setAttribute("stroke", "black"); 
        document.getElementById(`text-${mid}`).setAttribute("fill", "white");
      }
      else{
        document.getElementById(`circle-${right}`).setAttribute("fill", "red");
        document.getElementById(`circle-${mid}`).setAttribute("stroke", "black"); 
        document.getElementById(`text-${mid}`).setAttribute("fill", "white");
      }
    }
    }   
}
  // Calculate coordinates for each node
  const calculateCoordinates = (node, x = 500, y = 50, level = 0) => {
    if (!node) return null;
    
    const gap = 200 / (level + 1);
    
    return {
      ...node,
      x,
      y,
      left: node.left ? calculateCoordinates(node.left, x - gap, y + 60, level + 1) : null,
      right: node.right ? calculateCoordinates(node.right, x + gap, y + 60, level + 1) : null
    };
  };

  const coordTree = calculateCoordinates(treeData);

  // Draw lines between nodes
  const drawLines = (node) => {
    if (!node) return null;
    
    const lines = [];
    if (node.left) {
      lines.push(
        <line
          id={`line-${node.value}-${node.left.value}`}
          key={`${node.value}-${node.left.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.left.x}
          y2={node.left.y}
          stroke={node.left.color || '#000'}
          strokeWidth="2"
        />
      );
      lines.push(...drawLines(node.left));
    }
    if (node.right) {
      lines.push(
        <line
          id={`line-${node.value}-${node.right.value}`}
          key={`${node.value}-${node.right.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.right.x}
          y2={node.right.y}
          stroke={node.right.color || '#000'}
          strokeWidth="2"
        />
      );
      lines.push(...drawLines(node.right));
    }
    return lines;
  };

  // Draw nodes
  const drawNodes = (node) => {
    if (!node) return null;
    
    const nodes = [
      <g key={node.value}>
        <circle
          id={`circle-${node.value}`} 
          cx={node.x}
          cy={node.y}
          r="15"
          fill={node.color || '#fff'}
          stroke="#000"
          strokeWidth="2"
        />
        <text
          id={`text-${node.value}`} 
          x={node.x}
          y={node.y}
          fill="#000"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
        >
          {node.value}
        </text>
      </g>
    ];
    
    if (node.left) nodes.push(...drawNodes(node.left));
    if (node.right) nodes.push(...drawNodes(node.right));
    
    return nodes;
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4 items-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-20"
        />
        <button style={{backgroundColor:"green",color:"white",borderRadius:"5px"}} onClick={()=>{binarySearch(treeData);}}>Exact</button>
        <button className="bg-red-500 text-white px-4 py-1 rounded">lower_bound</button>
        <span>Extremes:</span>
        <button className="bg-red-500 text-white px-4 py-1 rounded">Min</button>
        <button className="bg-red-500 text-white px-4 py-1 rounded">Max</button>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <svg width="auto" height="80vh" viewBox="0 0 1000 500">
          <g className="lines" style={{ transform: `0.5s` }}>{drawLines(coordTree)} </g>
          <g className="nodes" style={{ transform: `0.5s` }}>{drawNodes(coordTree)}</g>
        </svg>
      </div>
    </div>
  );
};

export default BinarySearch;