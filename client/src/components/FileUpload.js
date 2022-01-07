import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";
import writeXlsxFile from "write-excel-file";

import {
  gastosMedicosData,
  gastosMedicosData2,
  columns,
} from "../template/gastosTemplate";
import { dentalData, dentalColumns } from "../template/dentalTemplate";
import { vidaData, vidaColumns } from "../template/vidaTemplate";

const FileUpload = () => {
  const [file, setFile] = useState([]);
  const [filename, setFilename] = useState("Escoger archivo");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [disableGenerateFile, setDisableGenerateFile] = useState(true);

  const [parsedfFiles, setParsedFiles] = useState([]);
  const [fileType, setFileType] = useState(1);

  const onChange = (e) => {
    if (e.target.files[0]) {
      const files = [...file, e.target.files[0]];
      setFile(files);
      setFilename(e.target.files[0].name);
    }
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

      Promise.all(promiseArray).then((data) => {
        console.log("ahora si");
        setParsedFiles([...data]);
        setDisableGenerateFile(false);
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
      { id: 19, key: "Ámbito de Cobertura", value: "N/A" }, //  19
      { id: 20, key: "Beneficio máximo anual por persona", value: "N/A" }, // 20
      { id: 21, key: "Se aplica un coaseguro del ", value: "N/A" }, // 21
      { id: 29, key: "Tarifa diaria máxima por cuarto normal", value: "N/A" }, // 29
      {
        id: 30,
        key: "Tarifa diaria máxima en unidad de cuidados intensivos",
        value: "N/A",
      }, // 30
      { id: 31, key: "Tarifa diaria máxima por cuarto normal", value: "N/A" }, // 31, tercera vez que aparece
      {
        id: 32,
        key: "Tarifa diaria máxima en unidad de cuidados intensivos",
        value: "N/A",
      }, // 32, tercera vez que aparece
      {
        id: 44,
        key: "Copago para consulta externa (por cada consulta y por asegurado):",
        value: "N/A",
      }, // 44
      {
        id: 45,
        key: "Copago para consulta externa (por cada consulta y por asegurado):",
        value: "N/A",
      }, // 45
      { id: 71, key: "(Sólo Asegurados Directos)", value: "N/A" }, // 71
      { id: 78, key: "Transporte en ambulancia aérea", value: "N/A" }, // 78
      { id: 80, key: "Terapias", value: "N/A" }, // 80
      { id: 81, key: "Tratamiento de Alergias", value: "N/A" }, // 81
      { id: 84, key: "Trasplante de órganos (Monto Vitalicio)", value: "N/A" }, // 84
      { id: 89, key: "Enfermedades epidémicas o pandémicas", value: "N/A" }, // 89
      { id: 90, key: "Práctica recreativa de buceo", value: "N/A" }, // 90
      { id: 91, key: "Práctica recreativo de fútbol ", value: "N/A" }, // 91
      { id: 92, key: "Deportes", value: "N/A" }, // 92
      { id: 93, key: "h. Prótesis quirúrgicas", value: "N/A" }, // 93
      { id: 98, key: "Aparatos de apoyo", value: "N/A" }, // 98
      { id: 100, key: "Cuidados en el Hogar", value: "N/A" }, // 100
    ];

    const keys2 = [
      { id: 22, key: "Beneficio máximo anual por persona", value: "N/A" }, // 22
      {
        id: 23,
        key: "Superado el deducible los gastos se pagan a un",
        value: "N/A",
      }, // 23
      { id: 25, key: "Costa Rica y Centroamérica", value: "N/A" }, //  25
      { id: 31, key: "Tarifa diaria máxima por cuarto normal", value: "N/A" }, // 31
      {
        id: 32,
        key: "Tarifa diaria máxima en unidad de cuidados intensiv",
        value: "N/A",
      }, // 32
      { id: 33, key: "Tarifa diaria máxima por cuarto normal", value: "N/A" }, // 33
      {
        id: 34,
        key: "Tarifa diaria máxima en unidad de cuidados intensiv",
        value: "N/A",
      }, // 34
      {
        id: 42,
        key: "Gastos ambulatorios por accidentes (primeras 24hora",
        value: "N/A",
      }, // 42
      {
        id: 50,
        key: "Gastos por Red de Atención Médica Primaria según an",
        value: "N/A",
      }, // 50
      { id: 53, key: "Cesárea o parto múltiple", value: "N/A" }, // 53
      { id: 54, key: "Parto normal, aborto", value: "N/A" }, // 54
      { id: 57, key: "Complicaciones durante el embarazo", value: "N/A" }, // 57
      { id: 60, key: "Prematurez", value: "N/A" }, // 60
      {
        id: 61,
        key: "Enfermedades congénitas del recién nacido",
        value: "N/A",
      }, // 61
      { id: 68, key: "empleadas aseguradas.", value: "N/A" }, // 68 salpingectomia
      { id: 69, key: "empleados asegurados.", value: "N/A" }, // 69 vasectomia
      { id: 70, key: " del asegurado en la póliza.", value: "N/A" }, // 70
      { id: 73, key: "asegurado en la póliza.", value: "N/A" }, // 73
      { id: 79, key: "Ambulancia terrestre", value: "N/A" }, // 79
      { id: 80, key: "el costo razonable y acostumbrado.", value: "N/A" }, // 80 alergias
      { id: 80, key: "Transporte en ambulancia aérea", value: "N/A" }, // 80
      {
        id: 82,
        key: "Tratamiento de fisioterapia o terapias afines",
        value: "N/A",
      }, // 82
      { id: 91, key: "Enfermedades pandémicas y epidémicas", value: "N/A" }, // 91
      { id: 92, key: "Práctica recreativa de buceo", value: "N/A" }, // 92
      { id: 93, key: "Práctica recreativo de fútbol", value: "N/A" }, // 93
      { id: 94, key: "Deportes (indicados en contrato)", value: "N/A" }, //94
      {
        id: 102,
        key: "Cuidados a domicilio por personal de enfermería",
        value: "N/A",
      }, // 102
    ];

    if (fileType === 1) {
      keys.map((key, index) => {
        keys[index].value = getValue(key) || "N/A";
        return [key.key, getValue(key)];
      });

      console.log(keys);
      return keys;
    } else {
      keys2.map((key, index) => {
        keys2[index].value = getValue(key) || "N/A";
        return [key.key, getValue(key)];
      });

      console.log(keys2);
      return keys2;
    }
  };

  const mapVidaData = () => {
    const vidaKeys = [
      { id: 8, key: "Tarifa final", value: "N/A" },
      { id: 10, key: "Modalidad No Contributiva", value: "N/A" },
      { id: 11, key: "Monto uniforme: ", value: "N/A" },
      {
        id: 18,
        key: "será de ",
        value: "N/A",
      },
      { id: 21, key: "Más de ¢5.000.000 ", value: "N/A" },
      { id: 23, key: "Más de ¢75.000.000 ", value: "N/A" },
    ];

    const vidaKeys2 = [
      { id: 8, key: "Tarifa final", value: "N/A" },
      { id: 10, key: "Modalidad No Contributiva", value: "N/A" },
      { id: 11, key: "Salarios: Equivalente a ", value: "N/A" },
      {
        id: 14,
        key: "En  caso  de  siniestro  la  indemnización  respecto  a  cada  Asegurado  será  hasta  por  la  suma  de",
        value: "N/A",
      },
      {
        id: 18,
        key: "Para la cobertura básica de Muerte Plus, el porcentaje a indemnizar para los gastos funerarios ",
        value: "N/A",
      },
      { id: 21, key: "Más de US$10.000  ", value: "N/A" },
      { id: 23, key: "Más de US $100.000", value: "N/A" },
    ];

    if (fileType === 1) {
      vidaKeys.map((key, index) => {
        vidaKeys[index].value = getValue(key) || "N/A";
        return [key.key, getValue(key)];
      });

      return vidaKeys;
    } else {
      vidaKeys2.map((key, index) => {
        vidaKeys2[index].value = getValue(key) || "N/A";
        return [key.key, getValue(key)];
      });
      return vidaKeys2;
    }
  };

  const getValue = (key) => {
    let arr = [];

    parsedfFiles.map((item) => {
      item.map((subItem) => {
        arr = [...arr, ...subItem];
      });
    });

    const index = arr.findIndex((cell, index) => {
      return cell.includes(key.key);
    });

    if (
      key.key === "Tarifa diaria máxima en unidad de cuidados intensiv" &&
      key.id === 34
    ) {
      let counter = 0;
      for (let index = 0; index < arr.length; index++) {
        if (
          arr[index] === "Tarifa diaria máxima en unidad de cuidados intensiv"
        ) {
          if (counter === 1) {
            return arr[index + 2];
          }
          counter++;
        }
      }
    }

    if (key.key === "Tarifa diaria máxima por cuarto normal" && key.id === 33) {
      let counter = 0;
      for (let index = 0; index < arr.length; index++) {
        if (arr[index] === "Tarifa diaria máxima por cuarto normal") {
          if (counter === 1) {
            return arr[index + 1];
          }
          counter++;
        }
      }
    }

    if (key.key === "Tarifa diaria máxima por cuarto normal" && key.id === 31) {
      let counter = 0;
      for (let index = 0; index < arr.length; index++) {
        if (arr[index] === "Tarifa diaria máxima por cuarto normal") {
          if (counter === 2) {
            return arr[index + 1];
          }
          counter++;
        }
      }
    }

    if (
      key.key === "Tarifa diaria máxima en unidad de cuidados intensivos" &&
      key.id === 32
    ) {
      let counter = 0;
      for (let index = 0; index < arr.length; index++) {
        if (
          arr[index] === "Tarifa diaria máxima en unidad de cuidados intensivos"
        ) {
          if (counter === 2) {
            return arr[index + 1];
          }
          counter++;
        }
      }
    }

    if (index === -1) {
      return "N/A";
    }

    if (key.key === "Modalidad No Contributiva") {
      return "No Contributiva";
    }
    if (key.key === "será de ") {
      return arr[index + 1].split("¢")[1].split(" (")[0];
    }
    if (key.key === "Salarios: Equivalente a ") {
      return arr[index + 1] + " veces el salario mensual";
    }

    if (
      key.key === "Tarifa diaria máxima en unidad de cuidados intensiv" ||
      key.key === "Gastos ambulatorios por accidentes (primeras 24hora" ||
      key.key === "Gastos por Red de Atención Médica Primaria según an" ||
      key.key === "Gastos por Red de Atención Médica Primaria según an"
    ) {
      return arr[index + 2];
    }
    return arr[index + 1];
  };

  const onMapClick = async (e) => {
    e.preventDefault();
    const fileData = mapData();
    const vidaProcesedData = mapVidaData();

    let gastosMedicos = gastosMedicosData2;
    let vida = vidaData;

    if (fileType !== 1) {
      gastosMedicos = gastosMedicosData;
    }

    gastosMedicos.map((data, index) => {
      fileData.map((fileRecord) => {
        if (fileRecord.id === index + 2) {
          if (gastosMedicos[index][3]) {
            gastosMedicos[index][3].value = fileRecord.value;
          }
        }
      });

      return;
    });

    vida.map((data, index) => {
      vidaProcesedData.map((fileRecord) => {
        if (fileRecord.id === index + 1) {
          if (vida[index][3]) {
            vida[index][3].value = fileRecord.value;
          }
        }
      });

      return;
    });

    await writeXlsxFile([gastosMedicos, vida, dentalData], {
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
            disabled={file.length < 2}
            type="submit"
            value="Subir archivos"
            className="btn btn-primary btn-block mt-4 mr-1"
          />
          <button
            disabled={disableGenerateFile}
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
