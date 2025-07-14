import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img
        src="https://imgs.search.brave.com/v7jnCTZ16JfInKLLZ-8JRUKlME8sUO-hnFyus0A0lBQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/Lzk2L0RyYWdvbl9i/YWxsLnN2Zw"
        alt="Dragon Ball Logo"
        style={{ height: '40px', width: 'auto' }}
      />
      <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f56565' }}>Dragon Ball - API</span>
    </div>
  ),
  project: {
    link: 'https://github.com/MishraShardendu22/Dragon-Ball-Api.git',
  },
  chat: {
    link: 'https://discord.gg/5fGZsX68',
  },
  footer: {
    text: 'IIIT Dharwad - Shardendu Mishra, Computer Science Engineering',
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
