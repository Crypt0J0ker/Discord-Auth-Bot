const express = require('express')
const session = require('express-session')
const passport = require('passport')
const DiscordStrategy = require('passport-discord').Strategy
const localtunnel = require('localtunnel')
require('dotenv').config()

const app = express()

app.set('trust proxy', 1)

app.use(
  session({
    secret: 'your secret',
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: { secure: true },
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

app.get('/auth/discord', (req, res) => {
  res.redirect('/')
})

app.get(
  '/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    console.log('req.user from callback:', req.user)
    res.redirect('/')
  }
)

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.get('/', (req, res) => {
  if (req.user) {
    const { username, id, accessToken } = req.user
    const avatar = req.user.avatar
      ? `https://cdn.discordapp.com/avatars/${id}/${req.user.avatar}.png`
      : null
    res.send(`
      <h1>Hello ${username}</h1>
      <p>ID: ${id}</p>
      ${avatar ? `<img src="${avatar}" alt="Avatar">` : ''}
      <p>Access Token: ${accessToken}</p>
    `)
  } else {
    res.send('Hello Guest')
  }
})

const server = app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
})

// Создание туннеля с LocalTunnel
;(async () => {
  const tunnel = await localtunnel({ port: server.address().port })
  console.log('Tunnel URL:', tunnel.url)
  passport.use(
    new DiscordStrategy(
      {
        clientID: process.env.YOUR_CLIENT_ID,
        clientSecret: process.env.YOUR_CLIENT_SECRET,
        callbackURL: tunnel.url + '/auth/discord/callback',
        scope: ['identify', 'email'],
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile)
      }
    )
  )
})()
