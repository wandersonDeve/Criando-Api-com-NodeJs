## Criar uma migration

`yarn typeorm migration:create -n `

## Rodar as migrations

`docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/database`
