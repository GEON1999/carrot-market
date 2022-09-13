# NextJS IMAGE

</br>

## 장점

- image component 사용시 이미지가 모두 load 되기 이전에, 받아 올 이미지를 blur 처리 된 상태로 placeholder 를 채워줌.
- qulity 등의 설정을 통해 이미지를 자동 압축할 수 있음

## Set up

- next.config.js 파일에서 image 의 도메인을 설정해주어야한다. (api 를 통해 img 를 load 할 경우)
    
    ```
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      reactStrictMode: true,
      images: {
        domains: ["imagedelivery.net"] // "imagedelivery.net" 는 CloudeFlare 의 이미지 도메인 이름이다.
      },
    }
    
    module.exports = nextConfig
    ```
    

## How to use

- Image component 사용시에는 image 의 size 를 미리 알려줘야 압축 및 blur 처리 등을 할 수 있기 때문에 size 를 명시해주어야함

```jsx
<Image
	width={48}	
	height={48}
	src={`url`}
	className="~"
/>
```

- size 를 미리 알지 못하는 경우에는 layout=”fill” 을 통해 받아올 이미지 사이즈 원본 그대로를 사용할 수 있음.
    - 해당 이미지의 사이즈와 상관없이 object-fit 과 함께 사용하면 받아올 이미지에 대한 비율 혹은 사이즈를 설정할 수 있음

```jsx
<Image
	layout="fill"
	src={`url`}
	className="~"
/>
```

- blur 처리는 local image 만 사용할 수 있음. 단, blurDataURL 를 통해 자체적으로 blur 처리한 image url 을 기입할 수 있음.
    - 모든 이미지를 blur 처리하고 기입할 수 없기에 이번 프로젝트에선 blur 기능은 사용하지 않을 예정
