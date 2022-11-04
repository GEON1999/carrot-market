# SSG(Static-Site Generation)
- ****getStaticProps 함수를 사용하여 page를 export 하는 경우 빌드시 해당 page 를 pre-rendering 함****

## For what

- 변경되지 않는 data 를 매번 rendering 하는 수고를 줄이고자 빌드시에 1번만 rendering 되는 page 를 만듬
- 미리 html 로서 존재하기에 SEO 에 좋음
- 웹페이지의 약도, FAQ 등 자주 변경되지 않는 정보들을 표기할 때 사용 가능

## How to use

```jsx
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
```
