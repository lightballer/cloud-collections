FROM postgres:latest

ENV POSTGRES_USER user
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DB cloud_collections_db

COPY ./db/schema.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

CMD ["postgres"]
