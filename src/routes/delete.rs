use axum::http::Uri;
use tokio::fs::{remove_dir, remove_file};
use urlencoding::decode;

pub async fn delete_file(uri: Uri) {
    let path = decode(uri.path()).unwrap();
    let path: Vec<_> = path.split('/').skip(2).collect();

    let mut path_text = "".to_string();

    for path_element in path {
        path_text += "/";
        path_text += path_element
    }

    println!("{}", path_text);

    if remove_file(format!("file{}", path_text)).await.is_err() {
        remove_dir(format!("file{}", path_text)).await.unwrap();
    }
}
