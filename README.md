# hotel-example-site

[![selenium4-java-en-us](https://github.com/takeyaqa/hotel-example-selenium4-java-en-us/actions/workflows/test.yml/badge.svg)](https://github.com/takeyaqa/hotel-example-selenium4-java-en-us/actions/workflows/test.yml)
[![selenium4-java-ja](https://github.com/takeyaqa/hotel-example-selenium4-java-ja/actions/workflows/test.yml/badge.svg)](https://github.com/takeyaqa/hotel-example-selenium4-java-ja/actions/workflows/test.yml)

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

### Changelog

#### v2.1.1 (2021-02-28)

* [#31](https://github.com/takeyaqa/hotel-example-site/pull/31) Add rel=opener

#### v2.1.0 (2020-08-31)

* Remove old Japanese pages
* Update dependencies

#### v2.0.0 (2020-07-27)

* Add English version
* Move Japanese version

#### v1.1.0 (2020-04-29)

* Add example codes using Selenide and Capybara

#### v1.0.0 (2020-04-14)

* First release
