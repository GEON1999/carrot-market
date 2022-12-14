# ****TailwindCSS****

### โกTailWind code challenge
- [TailWind](https://play.tailwindcss.com/kpXIvC3AUl)

CSS framework for React

# Why Tailwindโ

- utility-first CSS framework
    - taillwind has a lot of className which is called utillity.
    
    ```jsx
    ex)
    flex = display: flex
    text-center = text-align : center
    ```
    
    - all i need to do is add & combine className what is already made by tailwind.
    

# Tailwind setup๐ฒ

- Tailwind ๋ฒ์ ์ง์ 

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}", // pages ํ๋ ์์ ๋ชจ๋  ํ๋ ์์ ๋ชจ๋  ํ์ผ ์ค js,jsx,ts,tsx ํ์ฅ์
    "./components/**/*.{js,jsx,ts,tsx}" // components //
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Extention : ****Tailwind CSS IntelliSense****
    - It provide **auto-complete** of tailwind css

# Tailwind basic info๐

---

- Number(unit)
    - in tailwind there is rem instead of px(pixel)
        - remโs size is changed when the browser(screen)โs size change. so, itโs helpful for making **responsive website**
- mobile first
    - ์ต์ด์ ์์ฑํ๋ css ์ฝ๋๋ ๋ชจ๋ฐ์ผ์ ์ํ ์ฝ๋์ด๋ค.
    - ๋ฏธ๋์ด ์ฟผ๋ฆฌ์ ๊ฒฝ์ฐ ์์ ํ๋ฉด์ ์ํ ์ฝ๋๋ฅผ ์๋ก ์์ฑ ํ๋ค๋ฉด tailwind ๋ ๋ฐ๋์ด๋ค.
    - ํ๋ฉด ์ฌ์ด์ฆ์ ๋ฐ๋ผ css ์ฝ๋๊ฐ ๋ค๋ฅด๊ฒ ์๋ํ  ์ ์๊ฒ ํด์ฃผ๋ sm, md ~ 2xl ๋ฑ์ด ์์ง๋ง. sm ์ ๊ฒฝ์ฐ sm ์ฌ์ด์ฆ ์๋์ ์คํฌ๋ฆฐ์ ์ ์ฉ๋๋ ๊ฒ์ด ์๋ sm ๋ถํฐ~ ๊ทธ ์ ์ฌ์ด์ฆ ๋ฅผ ๋ปํ๋ ์ฆ, breakpoint ์ญํ ์ ํจ
    
    ```jsx
    <div className="bg-whtie sm:bg-red-500"></div>
    // bg-white ๋ ์ ์ผ ์์ ํ๋ฉด ~ sm ๊น์ง 
    // bg-red-500 ์ sm ~ ํฐ ํ๋ฉด  
    ```
    
- JNT(Just In Time)
    - JNT ์ปดํ์ผ๋ฌ๋ฅผ ํตํด ์์ฑ๋๋ className ์ค ํ์ํ ๊ฒ๋ง css ํ์ผ๋ก ์ค์๊ฐ ๋ณํ๋จ
- Taildwindcss Plugins / Fomrs
    - Theย **`@tailwindcss/forms`**
    ย plugin adds an opinionated form reset layer that makes it easier to style form elements with utility classes.

# Tailwindโs Guide๐ 

### Modifiers

- Hover
    - hover, active, focus ๋ฑ์ ์ด๋ฒคํธ์ ๊ฐ๋จํ css ํจ๊ณผ ์ฌ์ฉ ๊ฐ๋ฅ
    
    ```jsx
    className="hover:bg-blue-500 focus:text-blue-500 active:bg-yellow-500"
    ```
    
- Fist-child / only / even / empty
    - array ์์ first & last(:first-child) / only(:only-child) / even(์ง์์ ์์) ๋ฑ ์ฌ์ฉ ๊ฐ๋ฅ
    
    ```jsx
    className="last:bg-black fist:bg-white even:bg-yellow-500"
    ```
    
    - ๋ฐฐ์ด ๋ด๋ถ์ ๋น ์์(๋น ํ์คํธ, undefined, null)๊ฐ ์๋ ๊ฒฝ์ฐ empty ์ฌ์ฉ ๊ฐ๋ฅ
    
    ```jsx
    className="bg-black empty:bg-white"
    // ์๋์ ๊ฐ์ด ๋น ์์๋ฅผ ๋ณด์ด์ง ์๊ฒ ํ  ์ ์์ 
    className="bg-black empty:hidden"  // display:none ๊ณผ ์ ์ฌํ ํจ๊ณผ
    ```
    
- Forms(group, peer)
    - group ์ด hover ๋์์ ์ ํน์  item ์ด ๋ณ๊ฒฝ ๋๋ ๋ฑ์ ๊ธฐ์  ๊ตฌํ
    
    ```jsx
    <div className="group">
    	<div className="group-hover:bg-blue-500 transition-colors"/>
    </div>
    // transition ํจ๊ณผ๋ ํจ๊ป ์ ์ฉ ๊ฐ๋ฅ
    ```
    
    - form ๋ด input ์ด ๋น์๊ฑฐ๋ ์๋ ฅ๋์๊ฑฐ๋ ๋ฑ์ ์ปจ๋์์ ๋ฐ๋ฅธ css ํจ๊ณผ
    
    ```jsx
    <form>
    	<input required className="peer"/>
    	<span className="peer-valid:hidden peer-invalid:text-red-500">
    		This input is invalid
    	</span>	
    </form>
    ```
    
- Detail
    - ์ง๊ธ ์ฌ์ฉํ๊ณ  ์๋ toggle ๊ณผ ๊ฐ์ ๋ชจ์๊ณผ ๊ธฐ๋ฅ
    - โ ํด๋น toggle
    
    ```jsx
    <details className="open:bg-blue-500">
    	<summary>
    		What is my name
    	</summary>
    	<span>
    		Geon
    	</span>
    </details>
    ```
    
- Selection
    - ๊ธ์ ํน์ ์ฝํ์ธ ๊ฐ ์ ํ ๋์์ ๋ (๊ธ์ ๋ณต์ฌ๋ฅผ ์ํด ๋๋๊ทธ ํ์ ๋)
    
    ```jsx
    className="selection:bg-green-200"
    ```
    
- ul&li
    - โ ํด๋น ๊ธฐํธ์ (list-disc / ๋๊ทธ๋ ๋ชจ์์ makrer ์ด๋ผ ํ๊ณ  css ์ ์ฉ ๊ฐ๋ฅ)
    1. โ ๋ฒํธ๋ฅผ ๊ฐ ๋ฆฌ์คํธ์ ๋ถ์ฌํ  ์ ์์ (list-decimal)
    
    ```jsx
    <ul className="list-disc marker:text-teal-500"> //marker ์ text ๋ก ์ธ์ง๋จ
    	<li>heloo</li>
    	<li>heloo</li>
    	<li>heloo</li>
    </ul>
    ```
    
- file
    - input type file ์ css ๋ฅผ ์ ์ฉํ  ์ ์์
    
    ```jsx
    <input
    	type="file" 
    	className="file:bg-blue-500 file:text-white file:rounded-xl file:hover:bg-white"/>
    ```
    
- Ring utility
    - ring-num : border ์ ๊ฐ์ธ๋ ์ utility, num ์ ๊ธฐ์๋๋ ์ซ์์ ๋ฐ๋ผ ํฌ๊ธฐ ์กฐ์  ๊ฐ๋ฅ(shadow ๋ฅผ ํตํด ๋ง๋ค์ด์ง)
    ring-offset-num : ์ค๋ธ์ ํธ์ ์์ ๊ฐ๊ฒฉ์ ์กฐ์ ํ  ์ ์์
    ring-color : ์์ ์์ ์ค์  ๊ฐ๋ฅ
    
    - ring ์ hover ๋ฑ์ modifier ์ฌ์ฉ ์ ring ์ ๋ถ์ฌ๋๋ css ๊ฐ๋ค์ ์ผ์ผํ hover์ ์๋ ฅํ์ง ์์๋ ๋จ
    
    ```jsx
    <div className="hover:ring-2 ring-offset-2 ring-blue-500"></div>
    ```
    
    - ์ค์ง css variable ๋ง์ ๋ณ๊ฒฝํ๋ class ๊ฐ ์๊ณ , ๋ชจ๋  variable ์ ํฉ์ณ์ ๊ฐ์ ์ ์ฉ ์ํค๋ class ๋ ์์
    

### Transitions

- transition ์๋ color, background-color, border-color, fill, stroke ๋ฑ๋ฑ์ ์ ํ์ง๊ฐ ์์ผ๋ฉฐ, all ์ด๋ผ๋ ์ต์๋ ์์.

```jsx
<button className="bg-blue-500 hover:bg-red-500 transition-color"/>
```

### Media query

- info ์์ ๊ธฐ์  ํ๋ฏ์ด, ํ๋ฉด ํฌ๊ธฐ์ ๋ง๋ breakpoint ๊ฐ ์์

```jsx
sm 640px @media (min-width: 640px) { ... }
md 768px @media (min-width: 768px) { ... }
lg 1024px @media (min-width: 1024px) { ... }
xl 1280px @media (min-width: 1280px) { ... }
2xl 1536px @media (min-width: 1536px) { ... }
```

- ๋ชจ๋ฐ์ผ ํ๋ฉด์ด ๊ฐ๋ก์ธ์ง ์ธ๋ก์ธ์ง์ ๋ฐ๋ฅธ ๋ณํ๋ ์์ฑ๋ ์ถ๊ฐํ  ์ ์์(๊ฐ๋ก์ผ ์์ ์ต์์ด ์ปดํจํฐ์ ์ต์์ด ๋จ)

```jsx
<div className="landscape:bg-teal-500 portrait:bg-indigo-600"></div>
// landscpae : ๊ฐ๋ก portrait: ์ธ๋ก
```

### Dark

- dark mode ๋ ๋ธ๋ผ์ฐ์ ๋ ํน์ ๋ชจ๋ฐ์ผ ๊ธฐ๊ธฐ๊ฐ dark mode ๋ก ์ค์  ๋์ด์๋์ง ์ฌ๋ถ์ ๋ฐ๋ผ ์ค์  ๊ฐ์ด ์ ์ฉ๋จ

```jsx
<div className="bg-white dark:bg-black"></div>
```

- ๋ธ๋ผ์ฐ์  ํน์ ๋ชจ๋ฐ์ผ ๊ธฐ๊ธฐ์ dark mode ์ฌ๋ถ ์๊ด ์์ด ์ ์ ๊ฐ ์๋์ผ๋ก ์ค์ ํ  ์ ์๊ฒ ์ค์ ํ๊ธฐ ์ํด์๋ tailwind.config.js ํ์ผ์์ ์๋์ ๊ฐ์ด ์ค์  ํด์ผํจ

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
	//darkMode: "media ๊ฐ default ์"
	darkMode: "class" // ๋ถ๋ชจ ์์์์ dark ๋ผ๋ className ์ ์ฐพ์ ๊ฒ์ด๊ณ  ์๋ค๋ฉด ์ ์ฉ์ด๋จ
  plugins: [],
};

/**index.tsx*/
<div className="dark">
	<div className="bg-white dark:bg-black"/>
<div>
```

### M**anual operation**
- ์์ ํฌ๊ธฐ ์๊ด์์ด ์๋์ ๊ฐ์ด ๊ฐ์ ์๋์ผ๋ก ์ค ์ ์์

```jsx
className="text-xl"
-> className="text-[200px]"
```

- background-img ๋ฅผ ์๋์ ๊ฐ์ด ์ค์  ๊ฐ๋ฅ

```jsx
className="bg-[url('https://~~~~')]"
```
