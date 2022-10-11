***React Framework***

## Framework VS Library

![Untitled](https://www.interviewbit.com/blog/wp-content/uploads/2021/10/Image-1-2-768x375.png)

- 내 코드를 통해 library 를 call 하기 때문에 코딩에 자유도가 있다. 예를 들어 어떤 방식을 통해 랜더링 할 것인지, 내 파일 들의 이름은 어떻게 할 것인지 등 스스로 정의하고 구현할 수 있다.
- framework 의 경우 반대다. framework 가 내 코드를 call 하기 때문에 framework 에서 정해진 규칙에 따라 코딩 해야하고 규칙에 어긋날 경우 구현되지 않는다.

## SSR(Sever Side Render) VS CSR(Client Side Render) 🚀

### CSR

- CSR 방식은 소스 코드 내 HTML 은 하나의 div(root) 만 가지고 있다.
    - 최초의 div 하나를 가진 HTML 에서 client 는 redering 을 하게되고, 이때 js 코드를 가져와 react app 이 된다.
    - js 코드를 랜더링 하는 과정에서는 하나의 div 만을 가지고 있기에 흰 화면만 출력된다.

### SSR

- SSR 방식은 소스 코드 내 모든 UI 에 대한 요소를 HTML 에 부여한다.
    - js 코드가 랜더링 되기 이전에도 HTML 은 sever side 에서 redering 이 미리 되어 있기 때문에 js 코드 랜더링 이전에도 HTML elements 들은 확인할 수 있다.
    - 최초 상태의 html 을 미리 랜더링 해놓는 것을 pre rendering 이라고 한다.
    

## Nextjs basic info

- pages 풀더 안에 생성한 파일에 따라 자동 랜더링 해준다.
    - pages/about 경로에 me.js 파일을 생성 후 “Hi” 을 return 하게 되면 NextJs 에서 localhost3000/about/me 경로로 자동 랜더링 하고 Hi 를 출력 해준다 .
- 파일명이 곧 path 에 기입되는 이름이다.  function 의 식별자 이름은 관계가 없다.(index 파일 제외)
- function 은 export default 되어야 자동 랜더링 된다.
- React dom 과 동일하게 페이지 이동 시 Link 태그를 사용한다

```jsx
// 일반 a 태그
<a href="/">home</a>

// Link 태그 사용 예시
// 스타일은 a 태그에만 적용 가능
<Link href="/">
	<a style={{color:"red"}}>
		home
	</a>
</Link> 
```

## _app.js 🏛

- **`_app`** 은 서버로 요청이 들어왔을 때 **가장 먼저 실행되는 컴포넌트**로 페이지에 적용할 공통 레이아웃 역할이다.
- 모든 컴포넌트에 공통으로 적용할 속성 관리를 위해 존재한다.

```jsx
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

- Component 속성 값은 서버에 요청한 페이지이다.
    - Ex. http://localhost:3000/home에 접속하면, **`Component`**는 home 컴포넌트를 가리킨다.
- pageProps는 **`getInitialProps`**, **`getStaticProps`**, **`getServerSideProps`**중 하나를 통해 페칭한 초기 속성값이 된다.
