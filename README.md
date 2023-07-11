# Сайт-приложение check-user

## Техническое задание

### Задача:

Есть следующий JSON файл:

    [{
    email: ‘jim@gmail.com’,
    number: ‘221122’
    }, {
    email: ‘jam@gmail.com’,
    number: ‘830347’
    }, {
    email: ‘john@gmail.com’,
    number: ‘221122’
    }, {
    email: ‘jams@gmail.com’,
    number: ‘349425’
    }, {
    email: ‘jams@gmail.com’,
    number: ‘141424’
    }, {
    email: ‘jill@gmail.com’,
    number: ‘822287’
    }, {
    email: ‘jill@gmail.com’,
    number: ‘822286’
    }]

Напишите приложение с одной страницей, на котором находится форма с двумя полями
email (обязательное) и number (опциональное)
и кнопка submit
при нажатии на submit запрос уходит на бек где нужно в JSON найти подходящих под поисковый запрос пользователей
отобразить найденные данные на клиенте под формой

Условия:

- нужно на беке добавить задержку обработки запроса в 5 секунд (имитация долгой обработки ответа). При повторном запросе с фронта, отменять прошлый запрос.
- обязательная валидация полей email и number. Можно сделать либо на фронте либо на беке, будьте готовы объяснить выбранный подход
- на фронте на поле number нужно добавить маску, чтобы номер отображался с дефисами каждые два знака. например 22-11-22, 83-03-47

Тех. требования:

- фронт react или vue (типизация на выбор)
- бек nodejs (типизация обязательна)
- библиотеки на ваше усмотрение
- деплой не обязателен, подойдёт и Readme с инструкцией

## Stack используемых технологий

- SPA
- React с использованием функциональных компонентов и хуков
- клиентская часть архитектура FSD
- generate-react-cli шаблон компонентов для клиента
- React-text-mask
- Typescript
- Effector / Effector-react
- Scss / Scss-modules
- Node js
- Express js

## Getting Started

### Для начало клонируйте репозиторий:

    $ git clone https://github.com/Mikhail39yanov/check-user

## Getting Started Beckend

### Перейдите в директорию beckend:

    $ cd beckend/

### First install the dependencies:

    $ npm install

### Запустите сервер в режиме разработки (в режиме разработки работает nodemon) или в режиме производственной сборки:s

    $ npm run dev

    or

    $ npm run build
    $ npm run start

## Getting Started Frontend

    $ cd frontend/

### First install the dependencies:

    $ npm install

### Запустите клиентскую часть в режиме разработки или в режиме производственной сборки:

    $ npm run start

    or

    $ npm run build
    $ npm run start

## Используйте приложение

### Список доступных клиентов:

    {
    "email": "jim@gmail.com",
    "number": "221122"
    },
    {
    "email": "jam@gmail.com",
    "number": "830347"
    },
    {
    "email": "john@gmail.com",
    "number": "221122"
    },
    {
    "email": "jams@gmail.com",
    "number": "349425"
    },
    {
    "email": "jams@gmail.com",
    "number": "141424"
    },
    {
    "email": "jill@gmail.com",
    "number": "822287"
    },
    {
    "email": "jill@gmail.com",
    "number": "822286"
    }

## Utils for Frontend

### При работе на клиентской части можно использовать шаблон для построения компонентов (компонент попадет в директорию templates) далее вы можете его перенести куда нужно:

    $ npm run component <NameComponent>

### Для отслеживания состояние на клиенте установить в браузере Extensions - Redux DevTools(на клиенте установлен адаптер и адаптирован пот Effector):
