import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import './Signup.css'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      navigate('/dashboard')

    } catch (err) {
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password')
      } else {
        setError('Something went wrong. Try again.')
      }
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <nav className="auth-nav">
        <span className="logo-icon">💼</span>
        <span className="logo-text" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>ApplySmart</span>
      </nav>

      <div className="auth-container">
        <div className="auth-card">
          <h2>Welcome back</h2>
          <p>Log in to your ApplySmart account</p>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn-full" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="auth-switch">
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')}>Sign up free</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login