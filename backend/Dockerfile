FROM postgres:latest

COPY ./db/schema.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER user
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DATABASE cloud_collections_db

EXPOSE 5432

CMD ["postgres"]
