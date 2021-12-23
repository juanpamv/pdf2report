import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";
import writeXlsxFile from "write-excel-file";

import { gastosMedicosData, columns } from "../template/gastosTemplate";
import { dentalData, dentalColumns } from "../template/dentalTemplate";
import { vidaData, vidaColumns } from "../template/vidaTemplate";

const FileUpload = () => {
  const [file, setFile] = useState([]);
  const [filename, setFilename] = useState("Escoger archivo");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [parsedfFiles, setParsedFiles] = useState([]);
  const [fileType, setFileType] = useState(1);

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

        console.log({ fileName, filePath });

        promiseArray.push(
          fetch(`/text/${filePath.replaceAll("/", "-")}`).then((res) => {
            return res.json();
          })
        );
      });

      Promise.all(promiseArray).then((data) => {
        console.log("ahora si");
        console.log(data);
        setParsedFiles([...data]);
      });
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem witht he server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  const mapData = () => {
    const keys = [
      "Ámbito de Cobertura", //  19
      "Beneficio máximo anual por persona", // 20
      "Se aplica un coaseguro del ", // 21
      "Tarifa diaria máxima por cuarto normal", // 29
      "Tarifa diaria máxima en unidad de cuidados intensivos", // 30
      "Tarifa diaria máxima por cuarto normal", // 31, tercera vez que aparece
      "Tarifa diaria máxima en unidad de cuidados intensivos", // 32, tercera vez que aparece
      "Copago para consulta externa (por cada consulta y por asegurado):", // 44
      "Copago para consulta externa (por cada consulta y por asegurado):", // 45
      "(Sólo Asegurados Directos)", // 71
      "Transporte en ambulancia aérea", // 78
      "Terapias", // 80
      "Tratamiento de Alergias", // 81
      "Costa Rica y Centroamérica",
      "Se aplica un coaseguro del",
      "Tarifa diaria máxima en unidad de cuidados intensivos",
      "Trasplante de órganos (Monto Vitalicio)", // 84
      "Enfermedades epidémicas o pandémicas", // 89
      "Práctica recreativa de buceo", // 90
      "Práctica recreativo de fútbol ", // 91
      "h. Prótesis quirúrgicas", // 93
      "Aparatos de apoyo", // 98
      "Cuidados en el Hogar", // 100
    ];

    const keys2 = [
      "Beneficio máximo anual por persona", // 22
      "Superado el deducible los gastos se pagan a un", // 23
      "Costa Rica y Centroamérica", //  25
      "Tarifa diaria máxima por cuarto normal", // 33
      "Tarifa diaria máxima en unidad de cuidados intensiv", // 34
      "Gastos ambulatorios por accidentes (primeras 24hora", // 42
      "Gastos por Red de Atención Médica Primaria según an", // 50
      "Cesárea o parto múltiple", // 53
      "Parto normal, aborto", // 54
      "Complicaciones durante el embarazo", // 57
      "Prematurez", // 60
      "Enfermedades congénitas del recién nacido", // 61
      "empleadas aseguradas.", // 68 salpingectomia
      "empleados asegurados.", // 69 vasectomia
      " del asegurado en la póliza.", // 70
      "asegurado en la póliza.", // 73
      "Ambulancia terrestre", // 79
      "el costo razonable y acostumbrado.", // 80 alergias
      "Transporte en ambulancia aérea", // 80
      "Tratamiento de fisioterapia o terapias afines", // 82
      "Enfermedades pandémicas y epidémicas", // 91
      "Práctica recreativa de buceo", // 92
      "Práctica recreativo de fútbol", // 93
      "Deportes (indicados en contrato)", //94
      "Cuidados a domicilio por personal de enfermería", // 102
    ];

    let map;

    if (fileType === 1) {
      map = keys.map((key) => {
        return [key, getValue(key)];
      });
    } else {
      map = keys2.map((key) => {
        return [key, getValue(key)];
      });
    }

    console.log(map);
  };

  const getValue = (string) => {
    let arr = [];

    parsedfFiles.map((item) => {
      item.map((subItem) => {
        arr = [...arr, ...subItem];
      });
    });

    console.log(arr);

    const index = arr.findIndex((cell, index) => {
      return cell.includes(string);
    });

    if (index === -1) {
      return "N/A";
    }

    if (
      string === "Tarifa diaria máxima en unidad de cuidados intensiv" ||
      string === "Gastos ambulatorios por accidentes (primeras 24hora" ||
      string === "Gastos por Red de Atención Médica Primaria según an"
    ) {
      return arr[index + 2];
    }
    return arr[index + 1];
  };

  const onMapClick = async (e) => {
    e.preventDefault();
    //mapData();

    await writeXlsxFile([gastosMedicosData, vidaData, dentalData], {
      columns: [columns, vidaColumns, dentalColumns],
      fileName: "Detalle De Coberturas.xlsx",
      sheets: ["Gastos Medicos", "Vida", "Dental"],
    }).then((data) => console.log(data));
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

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">
              Formato
            </label>
          </div>
          <select
            class="custom-select"
            id="inputGroupSelect01"
            onChange={(e) => setFileType(e.target.value)}
          >
            <option selected value="1">
              Formato 1
            </option>
            <option value="2">Formato 2</option>
          </select>
        </div>

        <Progress percentage={uploadPercentage} />
        <div className="d-flex flex-row justify-content-between">
          <input
            disabled={file.length < 1}
            type="submit"
            value="Subir archivos"
            className="btn btn-primary btn-block mt-4 mr-1"
          />
          <button
            onClick={onMapClick}
            className="btn btn-secondary btn-block mt-4 ml-1"
          >
            Generar XLS
          </button>
        </div>
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
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
