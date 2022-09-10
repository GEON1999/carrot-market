# TWILIO & NODEMAILER
- 메일 / 휴대폰 인증

## TWILIO 🏝

문자, 보이스, 비디오 등등을 자동으로 발송해주는 서비스 플랫폼.

Carrot Maket 앱에서 가입 시 필요한 인증 코드를 보내는 용도로 사용함.

```jsx
import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `your token is ${payload}`,
    });
    console.log(message);
  }
```

- 현재 trial 서비스를 이용중임으로 to 를 MY_PHONE 으로 설정해두었지만 유저가 입력하는 phone number 에 전송 해야함
- body 에 발송을 원하는 메신저 입력

## NODEMAILER 🏞

메일을 자동으로 발송해주는 서비스.

가입, fetch, sid, 등등의 절차 없이 사용 가능해 매우 편리함.

다만, 위 절차를 생략한 만큼 단순한 매커니즘을 갖추고 있음.

개인 메일 계정의 이메일, 비밀번호를 입력하고 발송을 원하는 이메일 주소, 메일 제목 및 메일 텍스트 등 입력 이 필요로하며 개인 → 개인 방식으로 메일이 발송됨 

```jsx
const smtpTransport = nodemailer.createTransport({
  service: "Naver",
  host: "smtp.naver.com",
  port: 587,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

if (email) {
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "Verification Code From Carrot Market",
      text: `Verification Code : ${payload}`,
    };
    const result = await smtpTransport.sendMail(
      mailOptions,
      (error, responses) => {
        if (error) {
          console.log(error);
          return null;
        } else {
          console.log(responses);
          return null;
        }
      }
    );
    smtpTransport.close();
    console.log(result);
  }
```
