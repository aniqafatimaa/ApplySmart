import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import './Signup.css'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      await updateProfile(userCredential.user, {
        displayName: formData.name
      })

      navigate('/dashboard')

    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already registered')
      } else if (err.code === 'auth/weak-password') {
        setError('Password must be at least 6 characters')
      } else {
        setError(err.message || 'Something went wrong. Try again.')
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
          <h2>Create your account</h2>
          <p>Start tracking your job applications today</p>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                name="name"
                placeholder="Aniqa Fatima"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn-full" type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="auth-switch">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}>Log in</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup