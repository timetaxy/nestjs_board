<!-- philosophy of NESTJS -->
<!-- https://github.com/jaewonhimnae/nestjs-board-app -->
<!-- https://wikidocs.net/158481 -->
<!-- https://www.wisewiredbooks.com/nestjs/intro.html -->

# quick refactoring shortcut: command + .

# 순서 : model > svc > ctrl 생성이 일반

docs.nestjs.com
내부적 express 토대로 만든 http서버 프레임워크, fastify 교체 가능
고도로 테스트가능, 느슨한 결합, 유지관리 쉬운, angular 영향

nodejs 설치
-download로 설치(npm 포함)

<!-- sudo npm i -g @nestjs/cli -->
<!-- nest new [name] -->

or

<!-- nest new ./ -->

nest-cli.json
네스트 설정

<!-- npm run start:dev -->

모듈
AppModule(root)
루트모듈은 하나이상
모듈은 기본적으로 싱글톤, 공급자에게 동일한 인스턴스 공유

기본 컨트롤러, 서비스 삭제 후

핸들러: 컨트롤러내 매서드(서비스연결)

<!-- nest g module boards -->
<!-- nest g controller boards --no-spec -->

--no-spec: 테스트위한 스펙

> test: something else gen?

프로바이더 - 종속성 주입으로 인스턴스 연결, 모듈파일에 프로바이더 등록

서비스:@Injectable()

<!-- nest g service boards --no-spec -->

#todo
컨트롤러 코드작성, 필드에 있는 값만 생성자 값 할당 가능
보드서비스 작성
호출해보기

#로컬 데이터 uuid 생성하기

<!-- npm i uuid --save -->

서비스에서 사용 import {v1 as uuid}from'uuid'
DTO 각 구간 타입마다 모두 네이티브로 선언하면 유지보수 부분 과다발생하고 무결성 깨질 수 있음
dto interface/클래스 가능, cls가 런타임 중 작동 파이프 사용 가능
문서에서는 클래스를 더 추천

#td
create-boards dto 생성
service > ctrl 순으로 생성

<!-- #pipe: data transformation, validation 하는, 사용 @Injectable -->

pipe:transformation, validationi
lvl: handler(ctrl), parameter(service), global (main.ts)
빌트인파이프
validation parseInt parseBool parseArray parseUUID defaultValue

<!-- #npm i class-validator class-transformer --save -->

데코레이터(어노테이션) 문서
https://github.com/typestack

#td
dto에 pipe 추가, ctrl에도 usepipe 선언해주어야 함
getBoard에 notFouondException 선언해주기
delete에 없는 게시물 지우려 시도시 에러처리는 기존에 구현한 getBoardById 활용(not found exception 발생)
db를 이용한 crud 구현

remove 존재하는 아이템, delete 존재하지 않을시 에러없음

<!-- 커스텀 파이프(빌트인과 다름) -->

pipeTransform 인터페이스는 모든 파이프에서 구현해줘야 하는 인터페이스
args 처리위해 사용되는 transform() 메소드 필수
파라메터1 value, 파라메터2 metadata

implements PipeTransform

<!-- brew install postgresql -->
<!-- brew services list -->
<!-- brew services start postgresql -->
<!-- https://www.pgadmin.org/download/ -->

#todo
boards-pipe-board-status-vadation.pipe.ts 생성
ctrl.updateSatus 수정
?타입스크립트 readonly 옵션
설치-postgresSQL, pgAdmin

typeorm - object relation mapping
nodejs에서 실행, typescript로 작성된 객체 관계형 매퍼 라이브러리 여러 db 지원
객체와 관계형 데이터베이스의 데이터를 자동 변형 및 연결
객체와 데이터베이스 변형에 유연하게 사용

<!-- npm i pg typeorm @nestjs/typeorm --save -->

docs.nestjs 참조
configs/typeorm.configs.ts 생성

synchronize 옵션, drop 후 재생성
repository 엔티티와 삽입 업데이트 삭제 등 처리 : typeorm.delightful.studio/classes/_repository_repository_.repository.html

td
repository 생성
기존서비스 로컬메모리 컨트롤러 주석처리,
기존 DTO에서 필요한 것만 enum으로 하고 나머지 삭제

매서드 작성시 typeorm 문서 참고

---auth module

<!-- nest g module auth -->
<!-- nest g controller auth --no-spec -->
<!-- nest g service auth --no-spec -->

td
src/auth/user.entity.ts 작성
src/auth/user.repository.ts 작성

<!-- npm i bcryptjs --save -->

암호화 3가지

1. encode, decode 양방향
2. hash 단방향
3. salt + hash => bcrypt
   아마 +salt 후 encode 하는 방식으로 동작하는 듯

JWT 구조

1. 헤더 = 메타데이터, (타입 해싱알고리즘)
2. 페이로드 = issuer expTime subject # 중요한 정보는 넣지 말 것
3. verify signature = 서명 (헤더,페이로드 + 시크릿 > 해싱 :이라고 생각하면 됨, 서버에서 같은지 검증)
https://jwt.io/
<!-- npm i @nestjs/jwt @nestjs/passport passport passport-jwt --save -->

guard 인증 미들웨어

미들웨어 순서
middleware>guard>interceptor(before)>pipe>ctrl>svc>ctrl>interceptor(after)>filter>client
