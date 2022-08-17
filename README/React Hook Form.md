# React Hook Form

## React Hook From’s info ✔

- React 에서 Form 을 만들려면 기본적으로 validation, error alarms, input handler, events 등을 위한 useState 가 필요하다. 이렇게 form 위해 필요로한 많은 줄의 코드들을 압축해준 tool 이 바로 React Hook Form 이다.

- 모든 건 useForm Hook 으로 부터 나온다.+

- Demo
  - register 의 첫번 째 인수는 register 의 이름(식별자) 이고 두번째 인수는 optional 객체이다.
    - 객체 안에는 min, max, required 등등에 대한 boolean 값과 false 일 때의 error message 를 미리 설정할 수 있다.
  - handleSubmit 의 첫번 째 인수는 onVaild (값이 유효할 때) 의 함수이고, 두번 째 인수는 반대다. 두번 째 인수는 optional 이다.
  - validate 객체
    - validate 객체 첫번 째 인수는 custom 이름이고, value 프로퍼티를 사용해 원하는 제한을 설정할 수 있음
  - formState: {errors}
    - errors 를 밖에서도 사용할 수 있게 해줌.
  - useForm({mode: “”})
    - defalut 값으로 onSubmit 임
    - onChange 와 같은 event 로 변경이 가능함

```jsx
import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm < LoginForm > { mode: "onBlur" };
  const onValid = (data: LoginForm) => {
    console.log("im valid");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "The username should be longer than 5 chars.",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes(`@gmail.com`) ? "" : "Gmail is not allowed",
            // validate 객체 첫번 째 인수는 custom 이름이고, value 프로퍼티를 사용해 원하는 제한을 설정할 수 있음
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email?.message}
      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
```
