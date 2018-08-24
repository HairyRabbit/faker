faker
----

[WIP] Available apis:

- basic
  - [x] `boolean()`
- number
  - [x] `number({ min, max float })`
  - [x] `float({ min, max, fixed })`
  - [x] `integer({ min, max })`
  - [x] `natural({ min, max })`
- string
  - [x] `char()`
  - [x] `string({ min, max })`
  - [x] `letter({ upcase })`
  - [x] `symbol()`
- text
  - [x] `char({ upcase })`
  - [x] `word({ locale, min, max })`
  - [x] `sentence({ locale, min, max })`
  - [x] `title({ locale, min, max })`
  - [x] `paragraph({ locale, min, max })`
  - [x] `password({ locale, min, max })`
- date
  - [x] `date({ min, max })`
- person
  - [x] `firstname({ locale })`
  - [x] `lastname({ locale, sex, len })`
  - [x] `fullname({ firstname, lastname, locale, gender, length })`
  - [x] `avatar()`
- phone
  - [x] `teloperators()`
  - [x] `phone({ operator, country, network, area, user, format })`
- location
  - [x] `province()`
  - [x] `prefecture({ province, full, format})`
  - [x] `country({ province, prefecture, full, format})`
  - [x] `address({ province, prefecture, county, street, road, format})`
- web
  - [x] `email({ local, domain })`
