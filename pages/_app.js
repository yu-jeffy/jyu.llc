import '../styles/globals.css';
import Head from 'next/head';
import NavBar from '../components/NavBar';

function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <title>Jeffy Yu - Software Engineer / Artist</title>
        <meta name="description" content="Full Stack Software Engineer, Machine Learning Researcher, Web3, Artist" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <NavBar /> */}
      <Component {...pageProps} />
    </div>
  );
}

export default App;
