## Criar uma migration

`yarn typeorm migration:create src/database/migrations/CreateCategories`

## Rodar as migrations

`docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/database`
