import Link from 'next/link'

const Form = ({ isLogin, errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div className="form-group">
      <label>Username</label>
      <input type="text" className="form-control" name="username" required />
    </div>
    <div className="form-group">
      <label>Password</label>
      <input
        type="password"
        className="form-control"
        name="password"
        required
      />
    </div>
    {!isLogin && (
      <div className="form-group">
        <label>Repeat password</label>
        <input
          type="password"
          className="form-control"
          name="rpassword"
          required
        />
      </div>
    )}

    <div className="submit">
      {isLogin ? (
        <>
          <div className="form-group">
            <Link href="/signup">
              <a className="text-secondary">I don't have an account</a>
            </Link>
          </div>
          <button type="submit" className="btn btn-info">
            Login
          </button>
        </>
      ) : (
        <>
          <div className="form-group">
            <Link href="/login">
              <a>I already have an account</a>
            </Link>
          </div>
          <button type="submit" className="btn btn-info">
            Signup
          </button>
        </>
      )}
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}
  </form>
)

export default Form
