
function BackgroundShapes() {
  return (
    <div className="background-shapes">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="shape" />
      ))}
    </div>
  );
}

export default BackgroundShapes;