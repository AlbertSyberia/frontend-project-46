install: #установка зависимостей
	npm ci
lint: #проверка кода на соответствие стандарту
	npx eslint .
test: #запуск теста
	npm test
test-coverage: #запуск тестов с генерацией покрытия
	npx vitest run --coverage
link: #установка связей
	npm link
