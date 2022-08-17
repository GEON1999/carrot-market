# Prisma & PlanetScale

## What is Prisma?

- ORM(Object Relational Mapping) : 번역기와 같은 역할을 함.
  자바스크립트 혹은 타입스크립트의 코드와 데이터베이스를 연결해줌.
  - 객체라는 개념을 구현한 클래스와 RDB(Relational DataBase) 에서 쓰이는 데이터인 테이블을 자동 매핑한다.
  - 이 과정에서 ORM 을 통한 객체 간의 관계를 바탕으로 SQL 문을 자동으로 생성하고 클래스와 테이블을 서로 호환 가능하게 해준다.
  - 따라서 SQL 문을 코딩할 필요 없이 객체를 통해 간접적으로 데이터베이스를 조작할 수 있다.
- Prisma 를 사용하기 위해서는 Prisma 에게 DB 가 어떻게 생겼는지, 데이터의 type 들을 알려줘야함 (schema.prisma)
- Prisma 에게 데이터베이스가 어떻게 생겼는지 설명해주면 Prsima 는 client 를 생성해 줌.

## How to use Prisma?

1. npm i prisma -D / prisma 를 다운로드
2. npx prisma init / prisma 를 불러옴
3. .env 안에 있는 DATABASE_URL 에 DB url 을 기입해줌
4. schema.prisma 안 provider 에 datasource 의 provider 를 설정해줌 (postgresql, mysql, sqlite, sqlserver, mongodb 등등)
5. DB 에 사용할 model 생성

## What is PlaentScale?

- **The MySQL-compatible serverless database platform.**

  - serverless database 의 의미는 실제로 서버가 없다는 것이 아닌, 유저가 sever 을 관리할 필요가 없다는 뜻임.
    - 예를 들어 AWS 를 사용하기 위해선 서버를 만들고 데이터베이스의 규모 등을 직접 설정하고, scaling(확장) 을 수동으로 해야하지만, severless database 에서는 자동으로 처리해줌
    - no downtime : database 가 꺼지지 않음

- MySQL-compatible 의 의미는 실제로 MySQL 을 사용하는 것이 아니라 MySQL과 호환되는 서버 플랫폼 이라는 것임
- Vitess : MySQL 을 조금 더 쉽게 scaling 할 수 있게 해주는 시스템
- github 와 유사한 CLI(Comment Line Interface) 를 가지고 있어, GIT 을 쓰는 것과 같이 데이터베이스를 사용할 수 있음 (branch 등)

## \***\*Connecting to PlanetScale\*\***

- setup
  1. pscale auth login
  2. pscale database create _databaseName_ _region_(optional)
  3. pscale connect _databaseName_
     - Heroku 등을 이용할 때나 Api 사용 시 secreat key 등을 이용하여 DB 와 연결하는 경우가 많았지만, planetscale 은 CPI 를 통해 간편하게 연결하고 보안 취약점이 될 수 있는 부분을 보안함
  4. .env ⇒ `DATABASE_URL="mysql://127.0.0.1:3306/carrot-market”`

## Foreign key constraint

```
Users DB:
id:1 username:geon

Comments DB:
id:1 text:Hi user:(Users DB:5)

// 위와 같은 데이터베이스는 MySQL 에서 정상 작동하지 않는다.
// 이유는 Comment 가 새로 생성될 때 User를 통해 실존 여부를 먼저 확인하기 때문이다.

// 하지만 Vitess 에서는 실행된다.
// Vitess 는 데이터베이스를 잘게 쪼개서 여러 서버에 분산 시키는 데에 특화되어 있기에
// Comment 생성 이전에 User 의 존재 여부를 확인 하지 않는다.
```

- MySQL 처럼 User의 존재 여부를 우선 확인하는 방식을 foreign key constraint 라고 한다.
  - Vitess 는 foreign key constraint 를 지원하지 않는다.
  - 그럼으로 위와 같이 존재하지 않는 데이터를 사용했을 때 오류를 발생시키지 않는다.
  - 이는 개발 과정에서의 실수를 야기하기에, 이를 Prisma 에서 체크 해준다.
  ```jsx
  generator client {
    provider = "prisma-client-js"
    previewFeatures = ["referentialIntegrity"] // 해당 코드를 추가
  }

  // 위 코드를 추가함으로서 다른 객체가 연결될 때 그 객체가 존재하는지 여부를 체크 해줌

  datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
    referentialIntegrity = "prisma" // 해당 코드 추가
  }

  // referentialIntegrity 작업을 prisma 에서 할 것 이라는 것을 알려줌
  ```

## \***\*Prisma Client\*\***

- setup

  1. npm i @prisma/client
  2. make a file which name is client(whatever)
  3. import _`import_ { PrismaClient } _from_ "@prisma/client";`
  4. export _`export_ _default_ new PrismaClient()`
  5. 이로써 schema.prisma 에서 작성한 코드들을 기반으로 node_module 의 @prisma/client 파일에 client 가 생성됨

- setup 을 통해 client 풀더를 생성했고, 이제 유저가 프론트엔드에서 api 요청을 통해 client 에 접근할 수 있어야 한다.
  - 유저가 프론트엔드를 통해 api 를 요청하고 api 가 데이터베이스에 직접 전달을 함
  - 이 작업을 위해 보통 NodeJs 로 별도 서버를 분할하지만, NextJs 는 자체로 api 라우트를 만들 수 있음
