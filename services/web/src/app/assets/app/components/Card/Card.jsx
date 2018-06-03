function Card(props) {
  const {
  children,
} = props;

  return (
    <div className='card'>
      <h3 className='title-month'>Mayo</h3>
        {children}
    </div>);
}

export default Card;
