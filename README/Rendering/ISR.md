# ISR(Incremental Static Regeneration)
- SSG 정적 페이지 생성의 이점을 그대로 사용하면서 페이지를 특정 조건에 맞게 업데이트할 수도 있음

</br>

## SSG 장점
- HTML 파일로 되어있어 SEO 가 잘 되어있음
- 빌드시에 '한 번만' rendering 되기에 불필요한 rendering 을 방지할 수 있음
- 빌드시에 pre-rendering 되기 때문에 user 가 로딩을 보지 않아도 됨

</br>

## what is ISR?  
- 위 SSG 의 장점들을 그대로 유지가능
- ISR 을 통해서 전체 사이트를 다시 빌드할 필요 없이 페이지 별로 정적 생성이 가능함(확장, 업데이트 가능) 

</br> 

## how to use ISR
```
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default Blog
```

- `getStaticProps` 에 `revalidateprop` 를 추가
- `revalidate: 10` 설정의 의미
  - 설정하게 되면 10초 동안 모든 유저들은 같은 페이지를 보게 됨
  - 10초 뒤 누군가 해당 페이지에 방문하게 되면 페이지 재생성을 트리거함 (10초 뒤 방문한 유저도 여전히 이전 버전의 페이지를 봄)
  - 재생성 트리거가 된 이후 누군가 방문시 새로 재생성된 페이지를 볼 수 


