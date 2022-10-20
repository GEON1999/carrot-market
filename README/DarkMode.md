# Dark Mode🌙
</br>

 <div align="center">
  <img height="800" src="./preview/11.gif" />
 </div>

## 1. 기본 설정

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};
```

- 이번 프로젝트는 수동으로 dark mode 를 설정할 수 있도록 하기 위해 `class` 를 기입했다.

## Dark Mode 설정

- dark mode 를 설정하기 위해선 부모 요소의 `className` 에 `dark` 가 기입되어 있어야, `dark:bg-black` 과 같은 코드가 자식 요소들에게 적용된다.

```jsx
<div className="dark">
	<div className="w-full h-screen bg-white dark:bg-black">
		<h1 className="text-black dark:text-white">Hello!</h1>
	</div>
</div>
```

## Toggle Button 설정

```jsx
<div className={`${darkMode === true ? `dark` : ``}`}>
	<div className="w-full h-screen bg-white dark:bg-black">
		<h1 className="text-black dark:text-white">Hello!</h1>
		<button onClicked={()=>setDarkMode((prev)=>!prev)}></button>
	</div>
</div>
```

- `useState` 등으로 간단하게 위와 같은 삼항 연산자로 설정할 수 있다.
