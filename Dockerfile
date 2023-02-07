FROM node as client
ADD /client /client
WORKDIR /client
RUN npm i
RUN npm run build

FROM rust as server
ADD Cargo.toml .
ADD /src /src
RUN cargo build --release

FROM ubuntu as runner
WORKDIR /server
COPY --from=client /client/dist/public ./public
COPY --from=server /target/release/private-web-storage ./
EXPOSE 3000
ENTRYPOINT ./private-web-storage