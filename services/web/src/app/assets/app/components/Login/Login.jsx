/* global React */

export default class Login extends React.Component {
  render() {
    const { onSubmit, message, loading } = this.props;

    return (
      <div className='bg-login'>
        <div className='bx-form'>
          <div className='wrapper-login'>
            <div className='title'>
              <span>Inicia Sesión</span>
            </div>
            <div>
              <form className='style-form' onSubmit={onSubmit}>
                  <span>Email:</span> <input className='input-style' type='text' name='email' /> <br />
                  <span>Contraseña:</span><input className='input-style' type='password' name='password' />
                  <button className='btn-primary' disabled={loading}>{loading ? 'Comprobando sesión...' : 'Iniciar'}</button>
              </form>
              {message && <div className='error-message'>{message}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
