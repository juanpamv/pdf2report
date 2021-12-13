import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState([]);
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [parsedfFiles, setParsedFiles] = useState([]);

  const onChange = (e) => {
    const files = [...file, e.target.files[0]];
    setFile(files);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let index = 0; index < file.length; index++) {
      formData.append(`file${0}`, file[index]);
    }

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });

      setMessage("File uploaded");

      let promiseArray = [];

      res.data.map((file) => {
        const { fileName, filePath } = file;

        promiseArray.push(
          fetch(`/text/${filePath.replaceAll("/", "-")}`).then((res) => {
            return res.json();
          })
        );
      });

      Promise.all(promiseArray).then((data) => setParsedFiles([...data]));
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem witht he server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  const matchData = (array) => {
    console.log(parsedfFiles[0][0]);

    /*if Array.isArray(parsedfFiles)){

    }*/

    console.log(
      parsedfFiles[0][1].findIndex((cell) => {
        console.log(cell);
        return cell === "Costa Rica y Centroamérica";
      })
    );
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {file.length > 0 && (
        <ul>
          {file.map((item) => {
            return <li key={item.name.replaceAll(" ", "")}>{item.name}</li>;
          })}
        </ul>
      )}
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto"></div>
          <h3 classNAme="text-center">{uploadedFile.fileName}</h3>
          <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          <button onClick={matchData}>Match Data</button>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
