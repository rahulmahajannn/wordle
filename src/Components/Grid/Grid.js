const Grid = ({ displayText, background, border }) => {
  return (
    <div className="box" style={{ background, border }}>
      {displayText}
    </div>
  );
};

export default Grid;
