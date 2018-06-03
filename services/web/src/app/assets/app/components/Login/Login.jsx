function Login(props) {

  return (
    <div className='bg-login'>
      <div className='bx-form'>
        <div className="wrapper-login">
          <div className="title">
            <span>Inicia Sesión</span>
          </div>
          <div>
            <form className="style-form">
                <span>Email:</span> <input className="input-style" type="text" name="email" /> <br />
                <span>Contraseña:</span><input className="input-style" type="password" name="password" />
            </form>
          </div>
        </div>
      </div>
    </div>);
}

export default Login;
