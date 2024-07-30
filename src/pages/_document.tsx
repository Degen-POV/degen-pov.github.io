import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap" rel="stylesheet" />
        <style>{`
          .pdf-loading-text {
            font-family: 'Coming Soon', cursive;
            font-weight: bold;
            font-size: 1.5rem;
            color: #ffff33;
            background-color: '#26437d';
          }
        `}</style>
        </Head>
        <body style={{ backgroundColor: '#26437d', fontWeight: 'bold', fontFamily: '"Coming Soon", cursive', fontSize: '1.5rem', color:'#ffff33' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument