import React from 'react'
import {Helmet, HelmetProvider } from "react-helmet-async"

const HelmetWrapper = () => {
  return (
    <HelmetProvider>
    <Helmet>
      <meta name="description" content="To Infinity & Beyond" />
      <meta name="keywords" content="TheDarkArtist, Kushagra, tda, coding, mitrc, rajgarh, kushagra sharma, The Dark Artist, thedarkartist, the dark artist" />
      <meta name="author" content="TheDarkArtist" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href="https://www.thedarkartist.github.io/" />
      <meta property="og:title" content="TheDarkArtist - Portfolio" />
      <meta property="og:description" content="To Infinity & Beyond" />
      <meta property="og:url" content="https://www.thedarkartist.github.io" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@TheDarkArtist00" />
      <meta name="twitter:title" content="TheDarkArtist" />
      <meta name="twitter:description" content="To Infinity & Beyond" />
      <meta name="twitter:image" content="https://www.thedarkartist.github.io/thumbnail.jpg" />
    </Helmet>
    </HelmetProvider>
  )
}

export default HelmetWrapper
