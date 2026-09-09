# Вычислитель отличий (JS)

### Hexlet tests and linter status:
[![Actions Status](https://github.com/AlbertSyberia/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/AlbertSyberia/frontend-project-46/actions)
[![GitHub Actions Demo](https://github.com/AlbertSyberia/frontend-project-46/actions/workflows/github-actions-demo.yml/badge.svg?branch=main&event=create)](https://github.com/AlbertSyberia/frontend-project-46/actions/workflows/github-actions-demo.yml)


# Описание:

«Вычислитель отличий» — программа, которая определяет разницу между двумя структурами данных.

* Поддержка разных входных форматов: YAML, JSON
* Генерация отчёта в форматах plain text, stylish и JSON

# Установка

```sh
$ npm ci
```
или

```sh
$ make install
```
# Запуск 

```sh
$ gendiff ./filepath1.json ./filepath2.json
```
где ./filepath1.json и ./filepath2.json пути к файлам которые необходимо сравнить. 

По умолчанию отчет генерируется в формате 'stylish'. Для того чтобы сменить формат отчета необходимо запустить вычислитель с флагом '-f' или '--format' с указанием одного из форматов 'plain', 'stylish' или 'json'.

```sh
# Пример: 
$ gendiff -f plain ./filepath1.json ./filepath2.json
```

Ниже представленны аскинемы с примерами работы программы:

# Gendiff demonstration of JSON files
[![asciicast](https://asciinema.org/a/FNFkmC9bwLr0e4yA.svg)](https://asciinema.org/a/FNFkmC9bwLr0e4yA)

# Gendiff demonstration of yaml files and testing
[![asciicast](https://asciinema.org/a/ncivPVTkvr3R4S3s.svg)](https://asciinema.org/a/ncivPVTkvr3R4S3s)

# Comparing nested files and passing tests
[![asciicast](https://asciinema.org/a/GEm72mxFtSKYK6tc.svg)](https://asciinema.org/a/GEm72mxFtSKYK6tc)

# Gendiff flat format
[![asciicast](https://asciinema.org/a/sAc89jvrUeWTihYH.svg)](https://asciinema.org/a/sAc89jvrUeWTihYH)

# Gendiff json format
[![asciicast](https://asciinema.org/a/DetfA0FzXRtLyXh6.svg)](https://asciinema.org/a/DetfA0FzXRtLyXh6)