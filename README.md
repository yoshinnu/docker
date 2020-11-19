##簡単な記事登録アプリです

##作成目的　
Dockerでの環境構築、ORMによるDB操作、JWTによる認証の学習のため

##使用言語、環境
node12
mysql
sequelize
jwt
docker

##セットアップ

# touch docker/db/mysqldb.env
mysqldb.env内に以下を記述

MYSQL_ROOT_PASSWORD=?
MYSQL_DATABASE=database
MYSQL_USER=?
MYSQL_PASSWORD=?
※?に任意の値を設定してください

# touch myapp/app.env
app.env内に以下を記述

MYSQL_SERVER= mysqldb
MYSQL_USER=?
MYSQL_PASSWORD=?
MYSQL_DATABASE= database
SECRET_KEY ='任意の値'
JWT_EXP=24h

※?はmyspldb.envに設定した値を

# docker-compose up

# npm i 

# npx sequelize db:migrate

# npm start
localhost:3000でアクセスしてください。
