# 밥선배 프론트 현황(11/23)

### 1. 패키지 현황

- dependencies
  - "@emotion/babel-preset-css-prop": "^11.10.0"
  - "@emotion/styled": "^11.10.4"
  - "@testing-library/jest-dom": "^5.16.5"
  - "@testing-library/react": "^13.4.0"
  - "@testing-library/user-event": "^13.5.0"
  - "@types/color-hash": "^1.0.2"
  - "@types/gravatar": "^1.8.3"
  - "@types/jest": "^27.5.2"
  - "@types/node": "^16.11.68"
  - "@types/react": "^18.0.21"
  - "@types/react-calendar": "^3.9.0"
  - "@types/react-copy-to-clipboard": "^5.0.4"
  - "@types/react-dom": "^18.0.6"
  - "@types/validator": "^13.7.10
  - "axios": "^1.1.3"
  - "[color-hash](https://github.com/zenozeng/color-hash#readme)": "^2.0.1" - 문자열 해쉬로 색 추출
  - "[dayjs](https://day.js.org/)": "^1.11.6" - 날짜/시간 형식 라이브러리
  - "[framer-motion](https://www.framer.com/docs/)": "^7.6.1" - 애니메이션 추가
  - "[gravatar](https://ko.gravatar.com/)": "^1.8.2" - 문자열 해시 기반 아바타 생성 
  - "react": "^18.2.0"
  - "[react-calendar](https://www.npmjs.com/package/react-calendar)": "^4.0.0"
  - "[react-copy-to-clipboard](https://www.npmjs.com/package/react-copy-to-clipboard)": "^5.1.0" - 클립보드로 복사
  - "react-custom-scrollbars-2": "^4.5.0" - 스크롤바 추가
  - "react-dom": "^18.2.0"
  - "[react-kakao-maps-sdk](https://react-kakao-maps-sdk.jaeseokim.dev/)": "^1.1.5" - 카카오맵 관련 api
  - "[react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton)": "^3.1.0" - 문자열 로딩화면
  - "react-router-dom": "^6.4.2"
  - "react-scripts": "5.0.1"
  - "[react-textarea-autosize](https://www.npmjs.com/package/react-textarea-autosize)": "^8.3.4" - 자동으로 사이즈 조절되는 textarea
  - "[react-toastify](https://www.npmjs.com/package/react-toastify)": "^9.1.1" - 토스트 모달
  - "[socket.io-client](https://socket.io/)": "^2.4.0" - 웹소켓(소켓io) 클라이언트용 (추후 버전 업그레이드 예정)
  - "swr": "^1.3.0"
  - "typescript": "^4.8.4"
  - "[validator](https://www.npmjs.com/package/validator)": "^13.7.0" - 유효한 입력값인지 체크
  - "web-vitals": "^2.1.4
  

- devDependencies
  - "@emotion/react": "^11.10.4"
  - "@types/socket.io-client": "^1.4.35"
  - "prettier": "2.7.1"
  - "[react-loader-spinner](https://mhnpd.github.io/react-loader-spinner/)": "^5.3.4" - 로딩중 Spinner모음 라이브러리

### 2. 유의 사항

css props 사용 시 소스파일 맨 위에 아래 줄 추가해야함.\
`````/** @jsxImportSource @emotion/react */`````


### 3. 태그 속성 타입 정리

| 태그명(tag) | 속성(attribute) | 타입(type)                        |
|:---------|:--------------|:--------------------------------|
| form     | onSubmit      | FormEvent                       |
| *        | onClick       | MouseEvent\<HTMLElement\>       |
| input    | onChange      | ChangeEvent\<HTMLInputElement\> |
| *        | children      | ReactNode                       |
| *        | onKeyPress    | KeyboardEvent                   |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
