use axum::extract::DefaultBodyLimit;
use axum::routing::{delete, get, post};
use axum::Router;
use tower_http::cors::CorsLayer;

use crate::routes::add_dir::add_dir;
use crate::routes::delete::delete_file;
use crate::routes::files::{files, get_file};
use crate::routes::index::file_handler;
use crate::routes::upload::upload_file;

mod add_dir;
mod delete;
mod files;
mod index;
mod upload;

pub fn create_routes() -> Router<()> {
    Router::new()
        .route("/file/dir/*path", post(add_dir))
        .route("/file/file/", post(upload_file))
        .route("/file/file/*path", post(upload_file))
        .route("/file/*path", get(get_file))
        .route("/file/*path", delete(delete_file))
        .route("/files", get(files))
        .fallback(file_handler)
        .layer(CorsLayer::permissive())
        .layer(DefaultBodyLimit::disable())
}
