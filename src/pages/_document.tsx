import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap" rel="stylesheet" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="your degen pov" />
          <meta name="twitter:creator" content="Degen POV CTO" />
          <meta property="og:url" content="https://degenpov.me" />
          <meta property="og:title" content="your degen pov" />
          <meta property="og:description" content="We're all degens here..." />
          <meta property="og:image" content="https://degenpov.me/card.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
