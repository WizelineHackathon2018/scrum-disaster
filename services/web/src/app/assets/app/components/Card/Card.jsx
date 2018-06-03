function Card(props) {
  const {
  children,
} = props;

  return (
    <div className='card'>
      <h3>Mayo</h3>
        {children}
    </div>);
}

export default Card;
