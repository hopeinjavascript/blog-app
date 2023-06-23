function uploadFile(req, _) {
  // req.files => the properties in the object (ex. mv: [Function: mv]), we get from express-fileupload middleware
  // console.log('upload', req.files, req.body);

  return new Promise(function (resolve, reject) {
    if (!req.files) reject('File not provided');

    const file = req.files.uploadFile,
      // fileName = file.name;
      fileName = req.body.filename; // changing the name because Im prepending date in the name in the FE.

    const filePath = './images/' + fileName;

    console.log({ filePath });

    file.mv(filePath, (err) => {
      if (err) reject(null);

      resolve({
        filePath: `http://localhost:5000/${fileName}`,
      });
    });
  });
}

export default uploadFile;
