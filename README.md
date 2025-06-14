# hotel-example-site

[![selenium4-java-en-us](https://github.com/takeyaqa/hotel-example-selenium4-java-en-us/actions/workflows/test.yml/badge.svg)](https://github.com/takeyaqa/hotel-example-selenium4-java-en-us/actions/workflows/test.yml)
[![selenium4-java-ja](https://github.com/takeyaqa/hotel-example-selenium4-java-ja/actions/workflows/test.yml/badge.svg)](https://github.com/takeyaqa/hotel-example-selenium4-java-ja/actions/workflows/test.yml)

---

## Domain Migration Notice

> [!IMPORTANT]
> This website has moved to a new domain, [https://hotel-example-site.takeyaqa.dev/](https://hotel-example-site.takeyaqa.dev/), as of December 1, 2024.

---

## This site is a sandbox to practice test automation.

This site aims to learn browser automation with running automation scripts against this site as the system under test.

You can refer to this site from any places such as books and blogs under [MIT License](https://github.com/takeyaqa/hotel-example-site/blob/master/LICENSE).

It is made for learning test automation, but you can also use it to learn test design and technique.

### Site Structure

This site provides mocked booking hotel feature. It has input forms to log in, sign up, and reserve a room. The layout is mobile friendly by responsive design.

#### Terms of Use

* We confirmed sample code worked with the latest Google Chrome in June 2020.
* This site is working on GitHub pages.
* About input data
  * The data is stored in the browser's Cookie, Session Storage and Local Storage.
  * The data is NOT stored in the server side such as database.
  * Due to the specification of HTML, the contents of the form are sent as the last part of the URL. Please note that it may be left in the GitHub server's logs and other records.
* Do NOT use this site for stress testing.
* We do not take any responsibilities by using this site.

### Running Server

For development, you can serve this site locally using webpack.

#### Prerequisites

Make sure you have Node.js installed, then install dependencies:
```bash
npm install
```

#### Build and Start Server

First, build the project:
```bash
npm run build
```

This will create a `dist` folder with the built assets.

Then start the webpack development server:
```bash
npm run start
```

After starting the server, open your browser and navigate to:
- `http://localhost:8080/ja/` for the Japanese version
- `http://localhost:8080/en-US/` for the English version


### Changelog

<https://github.com/takeyaqa/hotel-example-site/releases>
