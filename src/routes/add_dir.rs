use axum::http::Uri;
use tokio::fs::create_dir;
use urlencoding::decode;

pub async fn add_dir(uri: Uri) {
    let path = decode(uri.path()).unwrap();
    let path: Vec<_> = path.split('/').skip(3).collect();

    let mut path_text = "".to_string();

    for path_element in path {
        path_text += "/";
        path_text += path_element;
    }

    create_dir(format!("file{}", path_text)).await.unwrap();
}
