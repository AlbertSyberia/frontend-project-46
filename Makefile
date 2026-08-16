install: #установка зависимостей
	npm ci
lint: #проверка кода на соответствие стандарту
	npx eslint .
test: #запуск теста
	npm test
link: #установка связей
	npm link
