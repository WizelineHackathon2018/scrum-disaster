function Card(props) {
  const { children, user } = props;

  return (
    <div className="card">
      <h3 className="title-month">{user}</h3>
      {children}
    </div>
  );
}

export default Card;
