# Pixel Mosaic Lazy Loader — npm·CDN 배포 및 업데이트 가이드

이 문서는 `@dong-gri/pixel-mosaic-lazy-loader`를 npm에 공개하고, jsDelivr·unpkg CDN으로 사용하는 방법과 이후 업데이트 절차를 정리한 개인 보관용 가이드입니다.

- npm 패키지: `@dong-gri/pixel-mosaic-lazy-loader`
- Live Demo: https://git.dongri.me/example/pixel-mosaic-live/
- Blog Post: https://lab.dongri.me/p/pixel-mosaic-lazy-loader
- 최초 작성 기준 버전: `1.3.2`

---

## 0. 먼저 알아둘 점

### npm과 CDN의 관계

별도의 CDN 회원가입이나 등록은 필요하지 않습니다.

```text
npm에 공개 배포
→ jsDelivr에서 자동 제공
→ unpkg에서 자동 제공
```

즉, npm 게시가 성공하면 같은 패키지 파일을 CDN 주소로 바로 사용할 수 있습니다. CDN 반영까지 수분 정도 걸릴 수 있습니다.

### 터미널에 입력하는 것과 입력하지 않는 것

아래는 **패키지 이름**일 뿐 명령어가 아닙니다.

```text
@dong-gri/pixel-mosaic-lazy-loader
```

터미널에 이것만 입력하면 `command not found`가 발생합니다.

아래는 **package.json 내용**이므로 터미널에 그대로 입력하면 안 됩니다.

```json
{
  "name": "@dong-gri/pixel-mosaic-lazy-loader"
}
```

패키지 이름을 터미널에서 바꿀 때는 다음처럼 `npm pkg set` 명령을 사용합니다.

```bash
npm pkg set name="@dong-gri/pixel-mosaic-lazy-loader"
```

---

# 1. 최초 배포 준비

## 1-1. Node.js와 npm 설치 확인

터미널을 열고 실행합니다.

```bash
node -v
npm -v
```

둘 다 버전 번호가 나오면 준비된 상태입니다.

예:

```text
v24.0.0
11.0.0
```

`command not found`가 나오면 Node.js LTS를 설치해야 합니다. Node.js를 설치하면 npm도 같이 설치됩니다.

---

## 1-2. 프로젝트 폴더로 이동

명령은 반드시 `package.json`이 들어 있는 폴더에서 실행해야 합니다.

가장 쉬운 방법:

1. 터미널에 `cd `를 입력합니다. `cd` 뒤에 공백이 있어야 합니다.
2. Finder에서 프로젝트 폴더를 터미널 창으로 드래그합니다.
3. Enter를 누릅니다.

예:

```bash
cd "/Users/dongri/Downloads/Pixel Mosaic Lazy Loader"
```

현재 위치를 확인합니다.

```bash
pwd
ls
```

`ls` 결과에 적어도 다음 항목이 보여야 합니다.

```text
package.json
README.md
dist
scripts
```

`package.json`이 보이지 않으면 잘못된 폴더에 들어간 것입니다.

---

## 1-3. npm 공식 레지스트리 확인

```bash
npm config get registry
```

정상 결과:

```text
https://registry.npmjs.org/
```

다른 주소가 나오면 다음으로 변경합니다.

```bash
npm config set registry https://registry.npmjs.org/
```

다시 확인합니다.

```bash
npm config get registry
```

---

## 1-4. npm 로그인

```bash
npm login
```

브라우저가 열리면 npm 계정으로 로그인하고 인증을 완료합니다.

로그인 상태 확인:

```bash
npm whoami
```

정상 결과 예:

```text
dong-gri
```

오류가 나면 다시 `npm login`을 실행합니다.

---

# 2. 패키지 정보 확인

## 2-1. 패키지 이름 설정

현재 사용 중인 패키지 이름:

```text
@dong-gri/pixel-mosaic-lazy-loader
```

터미널에서 설정:

```bash
npm pkg set name="@dong-gri/pixel-mosaic-lazy-loader"
```

현재 이름 확인:

```bash
npm pkg get name
```

정상 결과:

```text
"@dong-gri/pixel-mosaic-lazy-loader"
```

현재 버전 확인:

```bash
npm pkg get version
```

최초 배포 기준:

```text
"1.3.2"
```

---

## 2-2. package.json 전체 확인

```bash
cat package.json
```

중요 항목 예:

```json
{
  "name": "@dong-gri/pixel-mosaic-lazy-loader",
  "version": "1.3.2",
  "license": "MIT",
  "homepage": "https://lab.dongri.me/p/pixel-mosaic-lazy-loader"
}
```

주의사항:

- `name`은 소문자여야 합니다.
- 공백이 없어야 합니다.
- 버전은 이미 npm에 배포된 버전과 같으면 안 됩니다.
- `private: true`가 있으면 npm에 게시할 수 없습니다.

`private` 항목 확인:

```bash
npm pkg get private
```

`true`가 나오면 제거합니다.

```bash
npm pkg delete private
```

---

# 3. 배포 전 빌드와 검사

## 3-1. 배포 파일 빌드

```bash
npm run build
```

정상적으로 끝나면 `dist` 폴더의 파일이 갱신됩니다.

주요 파일:

```text
dist/pixel-mosaic.js
dist/pixel-mosaic.mjs
dist/pixel-mosaic.css
```

---

## 3-2. JavaScript 검사

```bash
npm run check
```

아무 오류 없이 종료되면 정상입니다.

오류가 나오면 게시하지 말고 먼저 오류를 수정합니다.

---

## 3-3. npm에 포함될 파일 미리 확인

```bash
npm pack --dry-run
```

반드시 다음 파일들이 포함되는지 확인합니다.

```text
package.json
README.md
LICENSE
dist/pixel-mosaic.js
dist/pixel-mosaic.mjs
dist/pixel-mosaic.css
```

다국어 README를 패키지에 포함하도록 설정했다면 `docs/readme/` 파일도 보여야 합니다.

반대로 다음 파일은 일반적으로 npm 패키지에 넣지 않아도 됩니다.

```text
원본 데모 이미지
개발용 백업 파일
node_modules
.git
디자인 참고 파일
```

---

## 3-4. 실제 TGZ 패키지 만들기

```bash
npm pack
```

예:

```text
dong-gri-pixel-mosaic-lazy-loader-1.3.2.tgz
```

생성된 파일 확인:

```bash
ls *.tgz
```

TGZ는 npm에 실제로 게시되는 패키지 묶음과 거의 같은 형태입니다.

---

# 4. 최초 npm 배포

## 4-1. 실제 공개 게시

```bash
npm publish --access public
```

`@dong-gri/...`처럼 scope가 붙은 패키지를 공개하려면 `--access public`을 붙이는 것이 중요합니다.

게시 중 다음 절차가 나타날 수 있습니다.

- 브라우저 인증
- 이메일 인증
- OTP 입력
- Touch ID 또는 패스키 확인

성공 예:

```text
+ @dong-gri/pixel-mosaic-lazy-loader@1.3.2
```

---

## 4-2. 배포 결과 확인

```bash
npm view "@dong-gri/pixel-mosaic-lazy-loader" version
```

정상 결과 예:

```text
1.3.2
```

최신 버전 태그 확인:

```bash
npm view "@dong-gri/pixel-mosaic-lazy-loader" dist-tags
```

예:

```text
{ latest: '1.3.2' }
```

패키지 전체 정보 확인:

```bash
npm view "@dong-gri/pixel-mosaic-lazy-loader"
```

npm 웹페이지:

```text
https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader
```

---

# 5. npm 설치 테스트

게시 후 다른 프로젝트에서 설치할 때 사용합니다.

```bash
npm install @dong-gri/pixel-mosaic-lazy-loader
```

주의: 패키지를 개발하고 게시하는 현재 프로젝트 폴더 안에서 자기 패키지를 다시 설치할 필요는 없습니다. 별도의 테스트 프로젝트에서 확인하는 편이 안전합니다.

## 별도 테스트 폴더 만들기

```bash
mkdir ../pixel-mosaic-install-test
cd ../pixel-mosaic-install-test
npm init -y
npm install @dong-gri/pixel-mosaic-lazy-loader
```

설치 확인:

```bash
npm list @dong-gri/pixel-mosaic-lazy-loader
```

---

# 6. npm 패키지 사용 방법

## ESM import

```js
import PixelMosaic from '@dong-gri/pixel-mosaic-lazy-loader';
import '@dong-gri/pixel-mosaic-lazy-loader/style.css';

PixelMosaic.init({
  duration: 1600,
  startDelay: 100,
  steps: 'auto',
  stepCount: 8
});
```

HTML 이미지:

```html
<img
  data-pixel-mosaic
  src="/images/example.gif"
  alt="Animated example"
>
```

---

# 7. CDN 사용 방법

## 7-1. CDN은 따로 등록하지 않음

npm 게시가 성공하면 jsDelivr와 unpkg에서 자동으로 읽어갑니다.

별도의 CDN 프로젝트 생성이나 업로드 절차는 없습니다.

---

## 7-2. jsDelivr 파일 확인

JavaScript:

```text
https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.js
```

CSS:

```text
https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.css
```

ES Module:

```text
https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.mjs
```

브라우저에서 주소를 열었을 때 코드가 보이면 정상입니다.

404가 나오면 다음을 확인합니다.

1. npm 게시가 성공했는지
2. 패키지명이 정확한지
3. 버전이 정확한지
4. `dist` 파일이 npm 패키지에 포함됐는지
5. CDN 반영을 위해 몇 분 정도 기다렸는지

---

## 7-3. unpkg 파일 확인

JavaScript:

```text
https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.js
```

CSS:

```text
https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.css
```

ES Module:

```text
https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.mjs
```

---

## 7-4. jsDelivr 일반 script 방식

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.css"
>

<img
  data-pixel-mosaic
  src="/images/example.gif"
  alt="Animated example"
>

<script src="https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.js"></script>
<script>
  PixelMosaic.init({
    duration: 1600,
    startDelay: 100,
    steps: 'auto',
    stepCount: 8
  });
</script>
```

---

## 7-5. jsDelivr ES Module 방식

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.css"
>

<script type="module">
  import PixelMosaic from 'https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.mjs';

  PixelMosaic.init({
    duration: 1600,
    startDelay: 100,
    steps: 'auto',
    stepCount: 8
  });
</script>
```

---

## 7-6. 버전 고정 권장

운영 사이트에서는 다음처럼 정확한 버전을 고정하는 편이 안전합니다.

```text
@1.3.2
```

다음 주소도 사용할 수 있지만 운영 환경에서는 권장하지 않습니다.

```text
@latest
```

`@latest`는 새 버전을 배포했을 때 기존 사이트까지 예상치 못하게 바뀔 수 있습니다.

권장 방식:

```text
개발·테스트: @latest 또는 명시 버전
운영 사이트: @1.3.2처럼 명시 버전
```

---

# 8. 이후 업데이트 배포

npm에서는 이미 게시된 `패키지명@버전`을 다시 사용할 수 없습니다.

예를 들어 아래 버전이 게시됐다면:

```text
@dong-gri/pixel-mosaic-lazy-loader@1.3.2
```

코드를 수정했더라도 다시 `1.3.2`로 덮어쓸 수 없습니다. 반드시 버전을 올려야 합니다.

---

## 8-1. 업데이트 전 공통 순서

프로젝트 폴더로 이동합니다.

```bash
cd "/프로젝트/경로/Pixel Mosaic Lazy Loader"
```

최신 코드 반영 후 다음을 실행합니다.

```bash
npm run build
npm run check
npm pack --dry-run
```

이 세 단계가 정상이어야 게시합니다.

---

## 8-2. 버그 수정: patch

작은 오류 수정이나 기능 변화가 없는 수정입니다.

예:

```text
1.3.2 → 1.3.3
```

명령:

```bash
npm version patch
npm publish --access public
```

확인:

```bash
npm view "@dong-gri/pixel-mosaic-lazy-loader" version
```

---

## 8-3. 기존 호환성을 유지하는 기능 추가: minor

새 옵션이나 기능을 추가하지만 기존 사용법은 그대로 동작하는 경우입니다.

예:

```text
1.3.2 → 1.4.0
```

명령:

```bash
npm version minor
npm publish --access public
```

---

## 8-4. 호환되지 않는 큰 변경: major

기존 API나 옵션명이 바뀌어 사용자가 코드를 수정해야 하는 경우입니다.

예:

```text
1.3.2 → 2.0.0
```

명령:

```bash
npm version major
npm publish --access public
```

---

## 8-5. 업데이트 권장 전체 명령 순서

### 작은 버그 수정

```bash
npm whoami
npm run build
npm run check
npm pack --dry-run
npm version patch
npm publish --access public
npm view "@dong-gri/pixel-mosaic-lazy-loader" version
```

### 기능 추가

```bash
npm whoami
npm run build
npm run check
npm pack --dry-run
npm version minor
npm publish --access public
npm view "@dong-gri/pixel-mosaic-lazy-loader" version
```

주의: `npm version`을 실행하면 `package.json`과 lock 파일의 버전이 바뀝니다. Git 저장소에서는 커밋과 태그가 함께 생성될 수 있으므로, 변경 전 작업 내용을 먼저 커밋해두는 편이 안전합니다.

---

# 9. GitHub Release도 같이 올리는 경우

npm 배포와 GitHub Release는 별개입니다.

권장 흐름:

```text
코드 수정
→ 빌드·검사
→ 버전 상승
→ GitHub push
→ npm publish
→ GitHub Release 작성
```

예를 들어 `1.3.3`을 배포했다면 Git tag와 Release 이름은 다음처럼 맞추는 편이 좋습니다.

```text
v1.3.3
```

Git 명령 예:

```bash
git status
git add .
git commit -m "Release v1.3.3"
git push
```

`npm version patch`가 이미 커밋과 태그를 만들었다면:

```bash
git push
git push --tags
```

GitHub Release 설명에는 다음을 간단히 적습니다.

```text
## Changes
- Fixed ...
- Improved ...

## Links
- Live Demo: https://git.dongri.me/example/pixel-mosaic-live/
- Blog Post: https://lab.dongri.me/p/pixel-mosaic-lazy-loader
```

---

# 10. 자주 발생하는 오류

## `zsh: command not found: pixel-mosaic-lazy-loader`

원인:

패키지 이름만 터미널에 입력했습니다.

잘못된 입력:

```bash
pixel-mosaic-lazy-loader
```

올바른 예:

```bash
npm view "@dong-gri/pixel-mosaic-lazy-loader"
```

또는:

```bash
npm install @dong-gri/pixel-mosaic-lazy-loader
```

---

## `zsh: command not found: name:`

원인:

`package.json`용 JSON을 터미널에 그대로 입력했습니다.

잘못된 입력:

```json
{
  "name": "@dong-gri/pixel-mosaic-lazy-loader"
}
```

올바른 명령:

```bash
npm pkg set name="@dong-gri/pixel-mosaic-lazy-loader"
```

---

## `E404 Not Found`

### 게시 전 설치했을 때

아직 npm에 패키지가 없으므로 정상적인 오류입니다.

먼저 게시합니다.

```bash
npm publish --access public
```

게시 후 설치합니다.

```bash
npm install @dong-gri/pixel-mosaic-lazy-loader
```

### 게시 후에도 E404가 날 때

확인:

```bash
npm view "@dong-gri/pixel-mosaic-lazy-loader"
```

가능한 원인:

- 패키지 이름 오타
- scope 오타
- 비공개 패키지로 게시됨
- 게시 실패
- 다른 npm 계정으로 로그인됨

---

## `ENEEDAUTH`

로그인이 필요합니다.

```bash
npm login
npm whoami
```

---

## `E403 Forbidden`

가능한 원인:

- scope가 현재 npm 사용자명과 다름
- 이메일 인증 미완료
- 2단계 인증 문제
- 해당 패키지에 게시 권한이 없음
- 이미 다른 사용자가 소유한 패키지 이름

확인:

```bash
npm whoami
npm pkg get name
```

현재 계정이 `dong-gri`라면 이름은 다음 형태여야 합니다.

```text
@dong-gri/pixel-mosaic-lazy-loader
```

---

## `EPUBLISHCONFLICT`

같은 버전이 이미 게시됐습니다.

버전을 올립니다.

```bash
npm version patch
npm publish --access public
```

---

## `You cannot publish over the previously published versions`

이미 사용된 버전 번호를 다시 게시하려고 한 것입니다.

```bash
npm version patch
npm publish --access public
```

---

## `npm ERR! Missing script: build`

현재 폴더가 잘못됐거나 `package.json`에 build 스크립트가 없습니다.

확인:

```bash
pwd
ls
cat package.json
```

`package.json`이 있는 프로젝트 루트에서 실행해야 합니다.

---

## CDN 주소가 404일 때

1. npm 버전 확인

```bash
npm view "@dong-gri/pixel-mosaic-lazy-loader" version
```

2. npm에 포함된 파일 확인

```bash
npm view "@dong-gri/pixel-mosaic-lazy-loader" dist
```

3. 정확한 버전으로 접속

```text
https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.js
```

4. 수분 후 다시 확인

---

# 11. 배포 전 최종 체크리스트

## 최초 배포

- [ ] `package.json`이 있는 폴더인가
- [ ] `npm whoami`가 `dong-gri`로 나오는가
- [ ] registry가 `https://registry.npmjs.org/`인가
- [ ] 패키지명이 `@dong-gri/pixel-mosaic-lazy-loader`인가
- [ ] 버전이 아직 게시되지 않은 버전인가
- [ ] `npm run build`가 성공했는가
- [ ] `npm run check`가 성공했는가
- [ ] `npm pack --dry-run` 목록이 정상인가
- [ ] README의 Live Demo와 Blog Post 링크가 정상인가
- [ ] `npm publish --access public`을 실행했는가
- [ ] npm 웹페이지에서 확인했는가
- [ ] jsDelivr에서 JS·CSS 파일을 열어봤는가
- [ ] 실제 HTML에서 테스트했는가

## 업데이트 배포

- [ ] 변경 내용을 Git에 저장했는가
- [ ] 빌드와 검사를 다시 했는가
- [ ] patch/minor/major 중 맞는 버전을 선택했는가
- [ ] npm 버전을 올렸는가
- [ ] npm 게시가 성공했는가
- [ ] Git tag와 Release 버전이 맞는가
- [ ] 데모 사이트 CDN 버전도 업데이트했는가
- [ ] README 코드의 버전 번호도 업데이트했는가

---

# 12. 복사해서 쓰는 명령어 모음

## 로그인·상태 확인

```bash
npm config get registry
npm whoami
npm pkg get name
npm pkg get version
```

## 최초 배포

```bash
npm pkg set name="@dong-gri/pixel-mosaic-lazy-loader"
npm run build
npm run check
npm pack --dry-run
npm publish --access public
npm view "@dong-gri/pixel-mosaic-lazy-loader" version
```

## 버그 수정 업데이트

```bash
npm run build
npm run check
npm pack --dry-run
npm version patch
npm publish --access public
npm view "@dong-gri/pixel-mosaic-lazy-loader" version
```

## 기능 추가 업데이트

```bash
npm run build
npm run check
npm pack --dry-run
npm version minor
npm publish --access public
npm view "@dong-gri/pixel-mosaic-lazy-loader" version
```

## 큰 호환성 변경

```bash
npm run build
npm run check
npm pack --dry-run
npm version major
npm publish --access public
npm view "@dong-gri/pixel-mosaic-lazy-loader" version
```

---

# 13. 현재 링크 모음

## 프로젝트

- Live Demo: https://git.dongri.me/example/pixel-mosaic-live/
- Blog Post: https://lab.dongri.me/p/pixel-mosaic-lazy-loader
- npm: https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader

## jsDelivr

- JS: https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.js
- CSS: https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.css
- ESM: https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.mjs

## unpkg

- JS: https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.js
- CSS: https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.css
- ESM: https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.2/dist/pixel-mosaic.mjs

> 새 버전을 배포하면 위 CDN 주소의 `1.3.2`를 새 버전 번호로 바꿔야 합니다.
