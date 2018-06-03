export default class Login extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const [email, password] = event.target.elements;

    console.log({ email: email.value, password: password.value });

    // fetch(`http://localhost:3000/login`)
    //    .then(result=> {
    //      console.log('RESULT', result)
    // });
  }

  render() {
    const { onSubmit } = this.props;

    return (
      <div className='bg-login'>
        <div className='bx-form'>
          <div className='wrapper-login'>
            <div className='title'>
              <span>Inicia Sesión</span>
            </div>
            <div>
              <form className='style-form' onSubmit={this.handleSubmit}>
                  <span>Email:</span> <input className='input-style' type='text' name='email' /> <br />
                  <span>Contraseña:</span><input className='input-style' type='password' name='password' />
                  <button className='btn-primary'>Iniciar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
