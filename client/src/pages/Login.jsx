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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="6" width="18" height="13" rx="2" stroke="#6BAED6" strokeWidth="1.5"/>
  <path d="M8 6V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6" stroke="#6BAED6" strokeWidth="1.5"/>
  <path d="M8 12H16" stroke="#6BAED6" strokeWidth="1.5" strokeLinecap="round"/>
  <path d="M8 15.5H13" stroke="#6BAED6" strokeWidth="1.5" strokeLinecap="round"/>
  <circle cx="19" cy="17" r="4" fill="#2E86DE"/>
  <path d="M17.5 17L18.5 18L20.5 16" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
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