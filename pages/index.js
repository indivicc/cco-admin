// pages/index.js
import AdminPanel from '../components/AdminPanel'

export default function Home() {
  return <AdminPanel />
}

// next.config.js
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ],
      },
    ]
  }
}

// .gitignore
node_modules/
.next/
.env.local
.vercel
.DS_Store