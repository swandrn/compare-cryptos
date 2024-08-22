# Compare Cryptos

Compare crypto percent changes over two years.
## Tech

- PHP backend
- MySQL database
- Docker containerization
## Launch Webapp
Create a .env file placed at the root of the project directory with:
- DB_ADDR="historical-data-db"
- DB_USER=<your_mysql_username>
- DB_PWD=<your_mysql_password>
- DB_NAME=<name_of_database>

The only requirement is Docker

In the root of the project directory, run:
```bash
docker-compose up compose.yaml
```