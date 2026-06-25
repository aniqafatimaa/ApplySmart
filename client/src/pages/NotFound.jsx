import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f6f9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: '#0C2340',
        borderRadius: '16px',
        padding: '3rem 2rem',
        maxWidth: '420px',
        width: '100%'
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '1rem' }}>
          <rect x="3" y="6" width="18" height="13" rx="2" stroke="#6BAED6" strokeWidth="1.5"/>
          <path d="M8 6V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6" stroke="#6BAED6" strokeWidth="1.5"/>
          <path d="M8 12H16" stroke="#6BAED6" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 15.5H13" stroke="#6BAED6" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="19" cy="17" r="4" fill="#2E86DE"/>
          <path d="M17.5 17L18.5 18L20.5 16" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 style={{ color: '#fff', fontSize: '64px', fontWeight: '700', lineHeight: 1, marginBottom: '0.5rem' }}>404</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '0.5rem' }}>Page not found</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '2rem' }}>The page you're looking for doesn't exist or has been moved.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#2E86DE',
            color: '#fff',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Back to home
        </button>
      </div>
    </div>
  )
}

export default NotFound