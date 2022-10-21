# 밥선배 프론트 현황(10/21)

### 1. 패키지 현황

 "dependencies":\
    "@emotion/babel-preset-css-prop": "^11.10.0"\
    "@emotion/styled": "^11.10.4"\
    "@testing-library/jest-dom": "^5.16.5"\
    "@testing-library/react": "^13.4.0"\
    "@testing-library/user-event": "^13.5.0"\
    "@types/color-hash": "^1.0.2"\
    "@types/gravatar": "^1.8.3"\
    "@types/jest": "^27.5.2"\
    "@types/node": "^16.11.68"\
    "@types/react": "^18.0.21"\
    "@types/react-dom": "^18.0.6"\
    "axios": "^1.1.3"\
    ["color-hash"](https://github.com/zenozeng/color-hash#readme): "^2.0.1" - 문자열 해쉬로 색 추출\
    "gravatar": "^1.8.2"\
    "react": "^18.2.0"\
    "react-dom": "^18.2.0"\
    ["react-loading-skeleton"](https://github.com/dvtng/react-loading-skeleton): "^3.1.0" - 컴포넌트 내부에 문자열 로딩화면. 서버 사이드 렌더링 안해서 나중에 뺄 수 있음.\
    "react-router-dom": "^6.4.2"\
    "react-scripts": "5.0.1"\
    "swr": "^1.3.0"\
    "typescript": "^4.8.4"\
    "web-vitals": "^2.1.4

 "devDependencies":\
    "@emotion/react": "^11.10.4"\
    "prettier": "2.7.1"\
    ["react-loader-spinner"](https://mhnpd.github.io/react-loader-spinner/): "^5.3.4" - 로딩중에 뜨는 spinner들 모음

### 2. 유의 사항

css props 사용 시 소스파일 맨 위에 아래 줄 추가해야함.\
`````/** @jsxImportSource @emotion/react */`````



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
