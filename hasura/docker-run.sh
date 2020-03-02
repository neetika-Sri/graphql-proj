#! /bin/bash
docker run -d -p 8080:8080 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://neetika:vP6S6Ief45af2zl3FJ4b@graphql-neetika.cnynbnl8gf9d.us-east-1.rds.amazonaws.com:5432/graphql \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       hasura/graphql-engine:latest