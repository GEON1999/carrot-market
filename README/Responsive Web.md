# Responsive Web
</br>
 <div align="center">
  <img height="800" src="./preview/10.gif" />
 </div>

## 1. 특정 화면 크기에 맞는 커스텀 설정

```tsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: { max: "767px" }, 
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      nav: { min: "768px", max: "1100px" },
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};
```

- `md` 에서 설정한 것과 같이 ~px 만 기입할 경우 ~px 이 상의 화면 크기의 범위를 설정한다.
- `nav` 에서 설정한 것과 같이 `min` , `max` 스크린을 설정해서 min ~ max 화면 크기 사이에서만 적용되는 범위를 설정할 수 있다.

## 2. 화면 크기에 맞는 반응형 웹

```jsx
<h1 className="text-lg md:text-2xl xl:text-4xl">Hello!!</h1>
```

- `text-lg` 는 0px 부터 `md` 까지 설정되는 text 의 크기다. 마찬가지로 `md:text-2xl` 는 `md` 부터 `xl` 까지 설정되는 text 의 크기다.
- 제일 작은 범위는 기재하지 않는다. 제일 작은 범위를 기본 범위로 인지하기 때문이다. // `sm:text-lg` 로 기재하지 않은 이유

```jsx
<div className="sm:hidden w-full h-20 fixed top-0 left-0 flex px-24 items-center justify-between bg-slate-50 z-10 dark:bg-gray-900 ">
```

- pc 화면에서 노출되는 `nav` 를 모바일에서는 보이지 않게 하기 위해 `sm:hidden` 을 사용했다.
    - 위와 같이 코딩할 경우 모바일 전용 `nav` pc 전용 `nav` 를 별도로 만들어야함으로 코드가 길어지고 무거워짐으로 지양해야한다. // project 완성 이후 반응형 웹으로 변경하여, 새로 만들었다.

```jsx
<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    className="w-7 h-7 hover:text-gray-500 transition-colors"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
</svg>
```

- 화면 크기에 맞는 설정 값은 `className` 안에서만 가능하다.
- `svg` 내 `fill` 혹은 `strokeWidth` 등의 값을 화면 크기에 맞게 커스텀할 수 없어 아쉽다.
    - 간편하게 반응형 웹을 구현할 수 있지만 디테일한 설정까진 힘듬
