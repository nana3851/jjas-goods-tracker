# JJAS Goods Tracker

JJAS 주짓수 동아리의 굿즈 수령 현황과 사이즈 일치 여부를 관리하기 위한 웹 애플리케이션입니다.

## 1. Project Overview

동아리 굿즈 배부 과정에서 수령 여부를 정확하게 기록하지 못하고, 일부 회원에게 잘못된 사이즈가 전달되는 문제가 발생했습니다.

이 문제를 해결하기 위해 회원이 자신의 주문 내역을 직접 조회하고, 수령 상태와 실제 수령 사이즈를 기록할 수 있는 웹앱을 개발했습니다.

## 2. Key Features

- 이름 기반 주문 내역 검색
- 굿즈 종류, 주문 사이즈, 주문 수량 확인
- 굿즈별 수령 여부 기록
- 주문 사이즈와 실제 수령 사이즈 비교
- 사이즈 불일치 시 실제 수령 사이즈 입력
- 기존 응답 조회 및 수정
- Google Sheets를 통한 데이터 관리
- 모바일 브라우저 지원

## 3. Tech Stack

| Category | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Google Apps Script |
| Database | Google Sheets |
| Deployment | Google Apps Script Web App |

## 4. System Architecture

1. 사용자가 웹페이지에 접속해 이름을 검색합니다.
2. Google Apps Script가 Google Sheets에서 해당 주문 내역을 조회합니다.
3. 사용자가 굿즈별 수령 상태와 사이즈 확인 결과를 입력합니다.
4. 입력된 정보가 Google Sheets에 저장됩니다.
5. 재접속 시 저장된 정보를 다시 불러와 수정할 수 있습니다.

## 5. Project Structure

- `Code.gs`: Google Sheets 연동 및 데이터 처리
- `Index.html`: 사용자 인터페이스 및 클라이언트 로직
- `screenshots/`: 웹페이지 실행 화면

## 6. Development Background

본 프로젝트는 동아리 굿즈 구매 및 배부 총괄 과정에서 발생한 실제 운영 문제를 해결하기 위해 개발되었습니다.

복잡한 로그인이나 별도의 데이터베이스 서버를 구축하지 않고, Google Sheets와 Google Apps Script를 연동해 간단하게 배포하고 운영할 수 있도록 설계했습니다.

## 7. Screenshots

웹페이지 실행 화면.

## 8. 실행 환경 (Execution Environment)

본 프로젝트는 Google Apps Script 기반 웹 애플리케이션으로, Google Sheets를 데이터 저장소로 사용합니다.

- `Code.gs`: 서버 측 로직 처리 및 Google Sheets 연동
- `Index.html`: 사용자 인터페이스 및 클라이언트 측 로직
- `Google Sheets`: 굿즈 주문 내역 및 수령 정보 저장
- `google.script.run`: 클라이언트와 서버 간 함수 호출 및 데이터 전달

본 GitHub 저장소는 프로젝트의 소스코드 보관 및 버전 관리를 목적으로 합니다.

실제 웹 애플리케이션은 Google Apps Script 환경에서 실행되며, 로컬에서 `Index.html` 파일을 직접 열어 실행할 경우 Google Apps Script 전용 기능이 작동하지 않습니다.

### 버전 관리 (Version Management)

현재 Google Apps Script 프로젝트와 GitHub 저장소는 별도로 관리하고 있으며, 두 환경 간 자동 동기화는 설정되어 있지 않습니다.

따라서 Google Apps Script에서 코드를 수정하더라도 GitHub 저장소에는 자동으로 반영되지 않으며, 변경된 코드를 별도로 업데이트해야 합니다.