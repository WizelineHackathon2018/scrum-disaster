function Sprint(props) {
  const { children, name, date } = props;

  return (
    <div className="sprint">
      <div>{children}</div>
      <div className="sprint-name">{name}</div>
      <div className="date">{date}</div>
    </div>
  );
}

export default Sprint;
