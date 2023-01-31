use std::fs::File;
use std::io::Write;

use axum::extract::Multipart;
use axum::http::Uri;
use urlencoding::decode;

pub async fn upload_file(uri: Uri, mut multipart: Multipart) {
    let path = decode(uri.path()).unwrap();
    let path: Vec<_> = path.split('/').skip(3).collect();

    let mut path_text = "".to_string();

    for path_element in path {
        path_text += "/";
        path_text += path_element;
    }

    while let Some(field) = multipart.next_field().await.unwrap() {
        let name = field.file_name().unwrap().to_string();
        let data = field.bytes().await.unwrap();

        println!("Length of `{}` is {} bytes", name, data.len());

        let path = "./file".to_string() + &path_text + "/" + &name;
        println!("{}", path);

        let mut file = File::create(path).expect("TODO: panic message");
        file.write_all(&data).unwrap();
    }
}
