faker
----

[WIP] Available apis:

- basic
  - [x] `boolean()`
  - [x] `number({ min, max float })`
- number
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
  - [x] `word({ locale })`
  - [x] `sentence({ locale })`
  - [x] `paragraph({ locale })`
- person
  - [x] `firstname({ locale })`
  - [x] `lastname({ locale, sex, len })`
  - [x] `fullname({ firstname, lastname, locale, gender, len })`
- other
  - [x] `avatar()`
