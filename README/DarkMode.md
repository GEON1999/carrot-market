# Dark Modeπ
</br>

 <div align="center">
  <img height="800" src="./preview/11.gif" />
 </div>

## 1. κΈ°λ³Έ μ€μ 

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

- μ΄λ² νλ‘μ νΈλ μλμΌλ‘ dark mode λ₯Ό μ€μ ν  μ μλλ‘ νκΈ° μν΄ `class` λ₯Ό κΈ°μνλ€.

## Dark Mode μ€μ 

- dark mode λ₯Ό μ€μ νκΈ° μν΄μ  λΆλͺ¨ μμμ `className` μ `dark` κ° κΈ°μλμ΄ μμ΄μΌ, `dark:bg-black` κ³Ό κ°μ μ½λκ° μμ μμλ€μκ² μ μ©λλ€.

```jsx
<div className="dark">
	<div className="w-full h-screen bg-white dark:bg-black">
		<h1 className="text-black dark:text-white">Hello!</h1>
	</div>
</div>
```

## Toggle Button μ€μ 

```jsx
<div className={`${darkMode === true ? `dark` : ``}`}>
	<div className="w-full h-screen bg-white dark:bg-black">
		<h1 className="text-black dark:text-white">Hello!</h1>
		<button onClicked={()=>setDarkMode((prev)=>!prev)}></button>
	</div>
</div>
```

- `useState` λ±μΌλ‘ κ°λ¨νκ² μμ κ°μ μΌν­ μ°μ°μλ‘ μ€μ ν  μ μλ€.
