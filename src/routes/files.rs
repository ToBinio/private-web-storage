use async_recursion::async_recursion;
use axum::Json;
use axum::{
    body::{boxed, Body, BoxBody},
    http::{Request, Response, StatusCode, Uri},
};
use serde::Serialize;
use tokio::fs;
use tower::ServiceExt;
use tower_http::services::ServeDir;

#[derive(Serialize)]
pub struct Dir {
    name: String,
    files: Vec<String>,
    dirs: Vec<Dir>,
}

pub async fn files() -> Json<Dir> {
    Json::from(read_dir("./file".to_string(), ".".to_string()).await)
}

#[async_recursion]
pub async fn read_dir(path: String, name: String) -> Dir {
    let mut dir = Dir {
        name,
        files: vec![],
        dirs: vec![],
    };

    let mut entries = fs::read_dir(path.clone()).await.unwrap();

    while let Some(entry) = entries.next_entry().await.unwrap() {
        let file_name = entry.file_name().to_str().unwrap().to_string();

        if entry.file_type().await.unwrap().is_dir() {
            dir.dirs
                .push(read_dir(format!("{}/{}", path, file_name).to_string(), file_name).await);
        } else {
            dir.files.push(file_name);
        }
    }

    dir
}

pub async fn get_file(uri: Uri) -> Result<Response<BoxBody>, (StatusCode, String)> {
    let res = get_static_file(uri.clone()).await?;
    println!("{:?}", res);

    Ok(res)
}

async fn get_static_file(uri: Uri) -> Result<Response<BoxBody>, (StatusCode, String)> {
    println!("{}", uri);

    let req = Request::builder().uri(uri).body(Body::empty()).unwrap();

    match ServeDir::new(".").oneshot(req).await {
        Ok(res) => Ok(res.map(boxed)),
        Err(err) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Something went wrong: {}", err),
        )),
    }
}
