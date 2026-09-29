
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../utils/api'
import { getJwtToken, setJwtToken } from '../../utils/auth'
import './index.css'

const LoginForm = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = getJwtToken()
    if (token) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  const submitForm = async (event) => {
    event.preventDefault()
    setErrorMsg('')

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both username and password')
      return
    }

    setIsLoading(true)

    try {
      const data = await loginUser(username, password)
      if (data.jwt_token) {
        setJwtToken(data.jwt_token)
        navigate('/', { replace: true })
      } else {
        setErrorMsg(data.error_msg || "username and password didn't match")
      }
    } catch (err) {
      setErrorMsg(err.message || "username and password didn't match")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-left">

        <div className="login-card">

          {/* Logo */}
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/zq6l7e9q/image/upload/v1789443971/Screenshot_2026-09-15_091517.png"
              alt="website logo"
              className="login-logo"
            />

            <h1 className="website-title">
              Tasty Kitchens
            </h1>
          </div>

          {/* Login heading */}
          <h2 className="login-heading">
            Login
          </h2>

          <form onSubmit={submitForm}>

            {/* Username */}
            <div className="input-group">
              <label htmlFor="username">
                USERNAME
              </label>

              <input
                type="text"
                id="username"
                value={username}
                onChange={event =>
                  setUsername(event.target.value)
                }
                placeholder="Enter Username"
                autoComplete="username"
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">
                PASSWORD
              </label>

              <input
                type="password"
                id="password"
                value={password}
                onChange={event =>
                  setPassword(event.target.value)
                }
                placeholder="Enter Password"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Error */}
            {errorMsg && (
              <p className="error-message">
                {errorMsg}
              </p>
            )}

            {/* Login button */}
            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

          </form>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="login-right">
        <img
          src="https://res.cloudinary.com/zq6l7e9q/image/upload/v1789443291/ceff20e8367d1981f2a409a617ac848670d29c7e.jpg"
          alt="website login"
          className="login-image"
        />
      </div>

    </div>
  )
}

export default LoginForm

