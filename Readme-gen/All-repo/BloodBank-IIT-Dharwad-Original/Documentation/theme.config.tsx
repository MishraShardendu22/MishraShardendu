import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { Linkedin } from 'lucide-react'

const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img
        src="http://sanity-admin.rudraksha-ratna.com/static/images/blogs/lord-parashuram(1).jpg"
        alt="Team Parshu"
        style={{ height: '30px', width: '30px', borderRadius: '50%' }}
      />
      <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f56565' }}>BloodSphere</span>
    </div>
    link: 'https://github.com/MishraShardendu22',
  },
  chat: {
    link: 'https://www.linkedin.com/in/shardendumishra22/',
    icon: <Linkedin size={20} />, 
  },
  footer: {
    text: 'IIIT Dharwad - Team ParshuVelocity',
  },
  feedback: {
    content: null,
  },
  editLink: {
    text: null,
  },
  gitTimestamp: <span>{new Date().toLocaleString()}</span>,
}

export default config
