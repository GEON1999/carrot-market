## General method

1. File(browser) ---> Api Server ---> CloudFlare Server

- `data`를 브라우저에서 바로 DB 서버로 보낼 수 없는 이유는 `Token` 정보를 식별할 수 없기 때문이다.
- 때문에 브라우저에서 받은 `data` 를 `api server` 로 보내고 `api server` 에서 `Token` 정보와 함께 `DB server` 로 보내는 게 일반적이다.

위 경우와 같이 데이터를 관리하기 위해서는 server 가 존재해야한다. 

현재와 같은 SSR project 에는 적합하지 않다. 

## Direct creator upload (DCU)

1. Client try to upload
2. Api Server notice CF(with Api key)
3. CF send empty file URL →  Client
4. Client fill the URL - > CF // By default, the `uploadURL` will expire after 30 minutes if unused.

`API key` 를 유저로부터 보호하면서 동시에 중계 저장소가 없어, upload 속도 또한 개선되며 SSR project 에 적합함.
