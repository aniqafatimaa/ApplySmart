import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { signOut } from 'firebase/auth'
import './Insights.css'

const Insights = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [insight, setInsight] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (user) fetchApplications()
  }, [user])

  const fetchApplications = async () => {
    try {
      const q = query(
        collection(db, 'applications'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setApplications(apps)
    } catch (err) {
      console.log(err)
    } finally {
      setFetching(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const buildPrompt = (apps) => {
    const total = apps.length
    const byMethod = {}
    const byStatus = {}
    const byDay = {}

    apps.forEach(app => {
      // By method
      byMethod[app.method] = (byMethod[app.method] || 0) + 1

      // By status
      byStatus[app.status] = (byStatus[app.status] || 0) + 1

      // By day of week
      if (app.dateApplied) {
        const day = new Date(app.dateApplied).toLocaleDateString('en-US', { weekday: 'long' })
        byDay[day] = (byDay[day] || 0) + 1
      }
    })

    const replied = (byStatus['replied'] || 0) + (byStatus['interview'] || 0) + (byStatus['offer'] || 0)
    const replyRate = total > 0 ? Math.round((replied / total) * 100) : 0

    return `
You are a career coach analyzing someone's job application data. Here is their data:

Total applications: ${total}
Reply rate: ${replyRate}%
Applications by method: ${JSON.stringify(byMethod)}
Applications by status: ${JSON.stringify(byStatus)}
Applications by day of week: ${JSON.stringify(byDay)}

Give them 4-5 specific, honest, actionable insights based on this data. 
Point out what's working, what's not, and what they should do differently.
Be direct and specific. Use simple language. No generic advice.
Format each insight as a short paragraph with a bold heading.
    `
  }

  const getInsights = async () => {
    if (applications.length < 3) {
      setInsight('Add at least 3 applications to get meaningful insights.')
      return
    }

    setLoading(true)
    setInsight('')

    try {
      const prompt = buildPrompt(applications)

      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + import.meta.env.VITE_GEMINI_API_KEY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      })

      const data = await res.json()
      const text = data.candidates[0].content.parts[0].text
      setInsight(text)

    } catch (err) {
      console.log(err)
      setInsight('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  // Stats for display
  const total = applications.length
  const replied = applications.filter(a => ['replied', 'interview', 'offer'].includes(a.status)).length
  const replyRate = total > 0 ? Math.round((replied / total) * 100) : 0

  const formatInsight = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h4 key={i} className="insight-heading">{line.replace(/\*\*/g, '')}</h4>
      }
      if (line.includes('**')) {
        const parts = line.split('**')
        return (
          <p key={i} className="insight-para">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          </p>
        )
      }
      if (line.trim() === '') return <br key={i} />
      return <p key={i} className="insight-para">{line}</p>
    })
  }

  return (
    <div className="insights-page">

      {/* Navbar */}
      <nav className="dash-nav">
        <div className="nav-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="6" width="18" height="13" rx="2" stroke="#6BAED6" strokeWidth="1.5"/>
  <path d="M8 6V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6" stroke="#6BAED6" strokeWidth="1.5"/>
  <path d="M8 12H16" stroke="#6BAED6" strokeWidth="1.5" strokeLinecap="round"/>
  <path d="M8 15.5H13" stroke="#6BAED6" strokeWidth="1.5" strokeLinecap="round"/>
  <circle cx="19" cy="17" r="4" fill="#2E86DE"/>
  <path d="M17.5 17L18.5 18L20.5 16" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
          <span className="logo-text">ApplySmart</span>
        </div>
        <div className="nav-right">
          <span className="nav-name">Hi, {user?.displayName?.split(' ')[0]}</span>
          <button className="btn-insights" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="btn-logout" onClick={handleLogout}>Log out</button>
        </div>
      </nav>

      <div className="insights-content">
        <div className="insights-header">
          <div>
            <h2>AI Insights</h2>
            <p>Let AI analyze your application patterns and tell you what's working</p>
          </div>
          <button className="btn-analyze" onClick={getInsights} disabled={loading || fetching}>
            {loading ? 'Analyzing...' : '✨ Analyze my applications'}
          </button>
        </div>

        {/* Quick stats */}
        <div className="insights-stats">
          <div className="stat-box">
            <span className="stat-num">{total}</span>
            <span className="stat-lbl">Total applications</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{replyRate}%</span>
            <span className="stat-lbl">Reply rate</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{applications.filter(a => a.status === 'interview').length}</span>
            <span className="stat-lbl">Interviews</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{applications.filter(a => a.method === 'cold email').length}</span>
            <span className="stat-lbl">Cold emails sent</span>
          </div>
        </div>

        {/* Insight result */}
        <div className="insight-box">
          {!insight && !loading && (
            <div className="insight-empty">
              <span className="insight-emoji">🧠</span>
              <p>Click "Analyze my applications" to get personalized insights from AI</p>
            </div>
          )}
          {loading && (
            <div className="insight-empty">
              <span className="insight-emoji">⏳</span>
              <p>Analyzing your applications...</p>
            </div>
          )}
          {insight && !loading && (
            <div className="insight-result">
              {formatInsight(insight)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Insights