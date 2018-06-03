export default class Login extends React.Component {
  render() {
    const { onSubmit } = this.props;

    return (
      <div className="bg-login">
        <div className="bx-form">
          <div className="wrapper-login">
            <div className="title">
              <span>Inicia Sesión</span>
            </div>
            <div>
              <form method="post" className="style-form" onSubmit={onSubmit}>
                <span>Email:</span> <input className="input-style" type="text" name="email" /> <br />
                <span>Contraseña:</span>
                <input className="input-style" type="password" name="password" />
                <button className="btn-primary">Iniciar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
