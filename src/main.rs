use crate::routes::create_routes;

mod routes;

#[tokio::main]
async fn main() {
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(create_routes().into_make_service())
        .await
        .unwrap()
}
