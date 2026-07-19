# npm 및 CDN 첫 배포 가이드

이 문서는 `@dong-gri/pixel-mosaic-lazy-loader` **v1.3.4**을 처음 npm에 공개하고, jsDelivr와 unpkg에서 확인하는 순서입니다.

- Live Demo: https://git.dongri.me/example/pixel-mosaic-live/
- Blog Post: https://lab.dongri.me/p/pixel-mosaic-lazy-loader

## 1. 준비물

- npm 계정
- 이메일 인증 완료
- npm 게시에 사용할 2단계 인증 설정
- Node.js와 npm이 설치된 터미널
- 이 저장소의 패키지 루트 폴더

## 2. 현재 폴더 확인

아래 파일이 보이는 폴더에서 명령을 실행해야 합니다.

```text
package.json
README.md
dist/
scripts/
```

```bash
pwd
ls
```

## 3. npm 로그인

```bash
npm login
npm whoami
```

`npm whoami` 결과로 본인의 npm 사용자명이 표시되어야 합니다.

## 4. 레지스트리 확인

```bash
npm config get registry
```

다음 주소가 나오는 것이 정상입니다.

```text
https://registry.npmjs.org/
```

다른 주소가 나오면 다음 명령으로 되돌립니다.

```bash
npm config set registry https://registry.npmjs.org/
```

## 5. 패키지 이름 확인

```bash
npm view pixel-mosaic-lazy-loader
```

패키지가 없다는 `E404`가 나오면 일반적으로 사용할 수 있는 이름입니다. 이미 다른 사람이 사용 중이면 `package.json`의 `name`을 npm 사용자 scope 형태로 변경하세요.

```json
{
  "name": "@YOUR_NPM_USERNAME/pixel-mosaic-lazy-loader"
}
```

scope 패키지는 공개 배포할 때 `--access public`이 필요합니다.

## 6. 배포 전 빌드와 검사

```bash
npm run build
npm run check
npm pack --dry-run
```

`npm pack --dry-run` 결과에서 `dist/`, `README.md`, `docs/readme/`, `LICENSE`, `package.json`만 포함되는지 확인합니다.

실제 압축 파일도 만들어 확인할 수 있습니다.

```bash
npm pack
```

## 7. 로컬 설치 테스트

테스트용 빈 폴더를 만든 뒤 생성된 `.tgz`를 설치해 볼 수 있습니다.

```bash
mkdir ../pixel-mosaic-package-test
cd ../pixel-mosaic-package-test
npm init -y
npm install ../pixel-mosaic-live/pixel-mosaic-lazy-loader-1.3.4.tgz
```

## 8. 최초 공개 배포

패키지 루트로 돌아와 실행합니다.

```bash
npm publish --access public
```

2단계 인증 또는 보안 키 확인 창이 나타나면 인증을 완료합니다.

## 9. npm 배포 확인

```bash
npm view pixel-mosaic-lazy-loader version
npm view pixel-mosaic-lazy-loader dist-tags
```

패키지 웹페이지에서도 확인합니다.

```text
https://www.npmjs.com/package/pixel-mosaic-lazy-loader
```

## 10. jsDelivr 확인

npm 배포 후 별도의 CDN 등록은 필요하지 않습니다. 다음 주소를 브라우저에서 열어 파일이 보이는지 확인합니다.

```text
https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.js
https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.css
https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.mjs
```

## 11. unpkg 확인

```text
https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.js
https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.css
```

## 12. 다음 버전 배포

작은 버그 수정은 patch 버전을 올립니다.

```bash
npm version patch
npm publish --access public
```

새 기능이 추가되지만 기존 사용법이 깨지지 않으면 minor 버전을 올립니다.

```bash
npm version minor
npm publish --access public
```

기존 사용법과 호환되지 않는 변경은 major 버전을 올립니다.

```bash
npm version major
npm publish --access public
```

이미 게시된 `패키지명@버전` 조합은 다시 사용할 수 없습니다.
