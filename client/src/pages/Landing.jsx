import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="landing">

      {/* Navbar */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <span className="logo-icon">💼</span>
          <span className="logo-text">ApplySmart</span>
        </div>
        <div className="nav-buttons">
          <button className="btn-outline" onClick={() => navigate('/login')}>Log in</button>
          <button className="btn-primary" onClick={() => navigate('/signup')}>Sign up free</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <span className="badge">AI-powered job tracking</span>
        <h1>Track every application.<br />Discover what actually works.</h1>
        <p>Stop losing track of where you applied. ApplySmart organizes your job search and uses AI to uncover patterns — so you apply smarter, not harder.</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => navigate('/signup')}>Get started free</button>
          <button className="btn-outline" onClick={() => navigate('/login')}>See how it works</button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">24</span>
            <span className="stat-label">Applications tracked</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">38%</span>
            <span className="stat-label">Reply rate</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">3</span>
            <span className="stat-label">Interviews scheduled</span>
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="preview">
        <p className="section-label">Recent applications</p>
        <div className="app-list">
          <div className="app-row">
            <div>
              <p className="company">Outliant</p>
              <p className="meta">Frontend Intern · Cold email · Jun 15</p>
            </div>
            <span className="pill pill-replied">Replied</span>
          </div>
          <div className="app-row">
            <div>
              <p className="company">NineSol Technologies</p>
              <p className="meta">Junior Dev · Job board · Jun 12</p>
            </div>
            <span className="pill pill-applied">Applied</span>
          </div>
          <div className="app-row">
            <div>
              <p className="company">Proglia</p>
              <p className="meta">Frontend Dev · Cold email · Jun 10</p>
            </div>
            <span className="pill pill-interview">Interview</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <p className="section-label">Why ApplySmart</p>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📋</span>
            <p className="feature-title">Visual tracking</p>
            <p className="feature-desc">See every application at a glance with status boards</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🧠</span>
            <p className="feature-title">AI insights</p>
            <p className="feature-desc">Discover patterns in your outreach that actually get replies</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔔</span>
            <p className="feature-title">Smart reminders</p>
            <p className="feature-desc">Never forget to follow up on a pending application again</p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="cta-footer">
        <p className="cta-title">Ready to take control of your job search?</p>
        <p className="cta-sub">Free forever. No credit card needed.</p>
        <button className="btn-primary" onClick={() => navigate('/signup')}>Create your account</button>
      </section>

    </div>
  )
}

export default Landing