import Document, { Head, Html, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ko">
        <Head>
          <meta property="og:description" content="편리한 중고거래" />
          <meta property="author" content="Geon" />
          <meta property="og:title" content="당근마켓" />
          <meta
            property="og:image"
            content="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/DaangnMarket_logo.png/544px-DaangnMarket_logo.png"
          />
          <link
            rel="shortcut icon"
            sizes="16x16 32x32 64x64"
            href="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FS0wSJ%2FbtqDogzoUNX%2FkZBkpKPGjdGKJSvKKs35D0%2Fimg.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
