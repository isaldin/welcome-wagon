// pages/_app.js
import React from 'react'
/* todo this is not working, we have to fix it */
// import styles from 'react-day-picker/lib/style.css'

const styles = require('react-day-picker/lib/style.css')

console.log(styles)

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
