#### Подготовка окружения
````
1 cd ~
2 curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
3 sudo bash nodesource_setup.sh
4 sudo apt-get install nodejs
5 sudo apt-get install build-essential
````

#### Инструкция для разработчика
````
1 склонировать проект:  https://dariya_maslyukova@bitbucket.org/vladimixz/hydra-calendar.git
2 установить глобально nodemon: npm install -g nodemon
2 перейти в папку с проектом
3 npm install
4 npm run dev-server
5 открыть в браузере по адресу http://localhost:9000/
````
#### Подключение к БД
````
1 бэкап базы данных REACTSTORE.DB находится в папке с проектом 
2 запустить сервер mongod (Для Linux: sudo service mongod start)
4 mongo
5 use reactsore
6 db.users.find()  - коллекция зарегистрированных пользователей 
```` 
#### API
````
1 добавить пользователя в БД (зарегистрировать): POST http://localhost:9000/api/users/singup
2 войти: POST http://localhost:9000/api/users/singin
3 логин facebook: POST http://localhost:9000/api/users/oauth/facebook
4 логин twitter: POST http://localhost:9000/api/users/oauth/twitter
5 проверить получен ли token: GET http://localhost:9000/api/users/secret (HEADERS: Authorization, VALUE: key) => положительный результат: {success: token}
5 все пользователи календаря: GET http://localhost:9000/api/employers
```` 

#### Production инструкция
````
1 склонировать проект
2 перейти в папку с проектом
3 npm install
4 node_modules/webpack/bin/webpack.js --optimize-minimize --define process.env.NODE_ENV="'production'"
5 webroot для сервера  - папка public
````

#### Структура проекта

* public - картинки, шрифты, скомпилированый js файл
* src - react приложение
  * bundles - компоненты приложения
  * Elements - небольшие элементы которые будут повторяться
  * Layout - общие части шаблонов страниц(header, footer, content)
  * Pages - старицы приложения

