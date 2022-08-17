# ****TailwindCSS****

CSS framework for React

# Why Tailwind❓

- utility-first CSS framework
    - taillwind has a lot of className which is called utillity.
    
    ```jsx
    ex)
    flex = display: flex
    text-center = text-align : center
    ```
    
    - all i need to do is add & combine className what is already made by tailwind.
    

# Tailwind setup🚲

- Tailwind 범위 지정

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}", // pages 풀더 안의 모든 풀더 안에 모든 파일 중 js,jsx,ts,tsx 확장자
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

# Tailwind basic info🌌

---

- Number(unit)
    - in tailwind there is rem instead of px(pixel)
        - rem’s size is changed when the browser(screen)’s size change. so, it’s helpful for making **responsive website**
- mobile first
    - 최초에 작성하는 css 코드는 모바일을 위한 코드이다.
    - 미디어 쿼리의 경우 작은 화면을 위한 코드를 새로 작성 했다면 tailwind 는 반대이다.
    - 화면 사이즈에 따라 css 코드가 다르게 작동할 수 있게 해주는 sm, md ~ 2xl 등이 있지만. sm 의 경우 sm 사이즈 아래의 스크린에 적용되는 것이 아닌 sm 부터~ 그 위 사이즈 를 뜻하는 즉, breakpoint 역할을 함
    
    ```jsx
    <div className="bg-whtie sm:bg-red-500"></div>
    // bg-white 는 제일 작은 화면 ~ sm 까지 
    // bg-red-500 은 sm ~ 큰 화면  
    ```
    
- JNT(Just In Time)
    - JNT 컴파일러를 통해 작성되는 className 중 필요한 것만 css 파일로 실시간 변환됨
- Taildwindcss Plugins / Fomrs
    - The **`@tailwindcss/forms`**
     plugin adds an opinionated form reset layer that makes it easier to style form elements with utility classes.

# Tailwind’s Guide🌠

### Modifiers

- Hover
    - hover, active, focus 등의 이벤트에 간단한 css 효과 사용 가능
    
    ```jsx
    className="hover:bg-blue-500 focus:text-blue-500 active:bg-yellow-500"
    ```
    
- Fist-child / only / even / empty
    - array 안의 first & last(:first-child) / only(:only-child) / even(짝수의 자식) 등 사용 가능
    
    ```jsx
    className="last:bg-black fist:bg-white even:bg-yellow-500"
    ```
    
    - 배열 내부에 빈 요소(빈 텍스트, undefined, null)가 있는 경우 empty 사용 가능
    
    ```jsx
    className="bg-black empty:bg-white"
    // 아래와 같이 빈 요소를 보이지 않게 할 수 있음 
    className="bg-black empty:hidden"  // display:none 과 유사한 효과
    ```
    
- Forms(group, peer)
    - group 이 hover 되었을 시 특정 item 이 변경 되는 등의 기술 구현
    
    ```jsx
    <div className="group">
    	<div className="group-hover:bg-blue-500 transition-colors"/>
    </div>
    // transition 효과도 함께 적용 가능
    ```
    
    - form 내 input 이 비었거나 입력되었거나 등의 컨디션에 따른 css 효과
    
    ```jsx
    <form>
    	<input required className="peer"/>
    	<span className="peer-valid:hidden peer-invalid:text-red-500">
    		This input is invalid
    	</span>	
    </form>
    ```
    
- Detail
    - 지금 사용하고 있는 toggle 과 같은 모양과 기능
    - ← 해당 toggle
    
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
    - 글자 혹은 콘텐츠가 선택 되었을 때 (글자 복사를 위해 드래그 했을 때)
    
    ```jsx
    className="selection:bg-green-200"
    ```
    
- ul&li
    - ← 해당 기호와 (list-disc / 동그란 모양을 makrer 이라 하고 css 적용 가능)
    1. ← 번호를 각 리스트에 부여할 수 있음 (list-decimal)
    
    ```jsx
    <ul className="list-disc marker:text-teal-500"> //marker 은 text 로 인지됨
    	<li>heloo</li>
    	<li>heloo</li>
    	<li>heloo</li>
    </ul>
    ```
    
- file
    - input type file 에 css 를 적용할 수 있음
    
    ```jsx
    <input
    	type="file" 
    	className="file:bg-blue-500 file:text-white file:rounded-xl file:hover:bg-white"/>
    ```
    
- Ring utility
    - ring-num : border 을 감싸는 원 utility, num 에 기입되는 숫자에 따라 크기 조절 가능(shadow 를 통해 만들어짐)
    ring-offset-num : 오브젝트와 원의 간격을 조절할 수 있음
    ring-color : 원의 색상 설정 가능
    
    - ring 에 hover 등의 modifier 사용 시 ring 에 부여되는 css 값들에 일일히 hover을 입력하지 않아도 됨
    
    ```jsx
    <div className="hover:ring-2 ring-offset-2 ring-blue-500"></div>
    ```
    
    - 오직 css variable 만을 변경하는 class 가 있고, 모든 variable 을 합쳐서 값을 적용 시키는 class 도 있음
    

### Transitions

- transition 에는 color, background-color, border-color, fill, stroke 등등의 선택지가 있으며, all 이라는 옵션도 있음.

```jsx
<button className="bg-blue-500 hover:bg-red-500 transition-color"/>
```

### Media query

- info 에서 기술 했듯이, 화면 크기에 맞는 breakpoint 가 있음

```jsx
sm 640px @media (min-width: 640px) { ... }
md 768px @media (min-width: 768px) { ... }
lg 1024px @media (min-width: 1024px) { ... }
xl 1280px @media (min-width: 1280px) { ... }
2xl 1536px @media (min-width: 1536px) { ... }
```

- 모바일 화면이 가로인지 세로인지에 따른 변화도 속성도 추가할 수 있음(가로일 시의 옵션이 컴퓨터의 옵션이 됨)

```jsx
<div className="landscape:bg-teal-500 portrait:bg-indigo-600"></div>
// landscpae : 가로 portrait: 세로
```

### Dark

- dark mode 는 브라우저나 혹은 모바일 기기가 dark mode 로 설정 되어있는지 여부에 따라 설정 값이 적용됨

```jsx
<div className="bg-white dark:bg-black"></div>
```

- 브라우저 혹은 모바일 기기의 dark mode 여부 상관 없이 유저가 수동으로 설정할 수 있게 설정하기 위해서는 tailwind.config.js 파일에서 아래와 같이 설정 해야함

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
	//darkMode: "media 가 default 임"
	darkMode: "class" // 부모 요소에서 dark 라는 className 을 찾을 것이고 있다면 적용이됨
  plugins: [],
};

/**index.tsx*/
<div className="dark">
	<div className="bg-white dark:bg-black"/>
<div>
```

### M**anual operation**
- 색상 크기 상관없이 아래와 같이 값을 수동으로 줄 수 있음

```jsx
className="text-xl"
-> className="text-[200px]"
```

- background-img 를 아래와 같이 설정 가능

```jsx
className="bg-[url('https://~~~~')]"
```
