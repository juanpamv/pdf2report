import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";
import writeXlsxFile from "write-excel-file";

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

    const columns = [
      {
        width: 10,
      },
      {
        width: 10,
      },
      {
        width: 50,
      },
      {
        width: 50,
      },
      {
        width: 10,
      },
      {
        width: 50,
      },
      {
        width: 15,
      },
    ];

    const white = "#FFFFFF";
    const gray = "#D8D8D8";
    const lightGray = "#F2F2F2";
    const yellow = "#FEFF00";
    const orange = "#DB3D10";

    const data = [
      // Row #1
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          align: "center",
          backgroundColor: orange,
          color: white,
          fontWeight: "bold",
          span: 2,
          value: "BENEFICIOS ACTUALES",
        },
      ],
      // Row #2
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Nombre del cliente",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          value: "N/A",
          backgroundColor: lightGray,
        },
        {
          value: "",
        },
        {
          align: "center",
          backgroundColor: orange,
          color: white,
          fontWeight: "bold",
          span: 2,
          value: "OTROS DATOS",
          borderColor: "#000000",
        },
      ],
      // Row #3
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Industria",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          value: "N/A",
          backgroundColor: lightGray,
        },
        {
          value: "",
        },
        {
          value: "CANTIDAD DE EMPLEADOS ACTIVOS",
          borderColor: "#000000",
        },
        {
          backgroundColor: yellow,
          borderColor: "#000000",
        },
      ],
      // Row #4
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Aseguradora Actual",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          value: "INS",
          backgroundColor: lightGray,
        },
        {
          value: "",
        },
        {
          value: "CANTIDAD DE EMPLEADOS ASEGURADOS",
          borderColor: "#000000",
        },
        {
          backgroundColor: yellow,
          borderColor: "#000000",
        },
      ],
      // Row #5
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Esta asegurado todo el personal o solo ciertas clases?",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          value: "Todo el personal",
          backgroundColor: lightGray,
        },
        {
          value: "",
        },
        {
          value: "CANTIDAD DE VIDAS CUBIERTAS",
          borderColor: "#000000",
        },
        {
          backgroundColor: yellow,
          borderColor: "#000000",
        },
      ],
      // Row #6
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Tiene este clientes varios 'planes/clases' ?",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          value: "No",
          backgroundColor: lightGray,
        },
        {
          value: "",
        },
        {
          value:
            "Este espacio es para validar si todos los empleados están asegurados, o bien, si existen diferencias, porque.",
        },
      ],
      // Row #7
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Clase",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          value: "Todo el personal",
          backgroundColor: lightGray,
        },
      ], // Row #8
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Primas",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: orange,
          color: white,
          value: "Indicar primas mensuales",
        },
      ],
      // Row #9
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Asegurado solo",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: yellow,
        },
      ],
      // Row #10
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Asegurado + conyugue",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: yellow,
        },
      ],
      // Row #11
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Asegurado + conyugue + 1 hijo",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: yellow,
        },
      ],
      // Row #12
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Asegurado + conyugue + 2 hijo",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: yellow,
        },
      ],
      // Row #13
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Asegurado + hijo",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: yellow,
        },
      ],
      // Row #14
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Contribución",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: orange,
        },
      ],
      // Row #15
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Pago de primas empleados",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: yellow,
        },
      ],
      // Row #16
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Elegibilidad de dependientes",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: yellow,
        },
      ],
      // Row #17
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Pago de primas Dependientes",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: yellow,
        },
      ],
      // Row #18
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Periodo de espera para ingreso a la poliza",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: yellow,
        },
      ],
      // Row #19
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Generales",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: orange,
        },
      ],
      // Row #20
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Area geografica de cobertura",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: orange,
          backgroundColor: lightGray,
        },
      ],
      // Row #21
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Suma asegurada anual renovable",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #22
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Co-aseguros",
          backgroundColor: gray,
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #23
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Stop Loss",
          fontWeight: "bold",
          backgroundColor: gray,
        },
        {
          backgroundColor: orange,
        },
      ],
      // Row #24
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Local",
          backgroundColor: gray,
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #25
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "International",
          backgroundColor: gray,
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #26
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Deducible",
        },
        {
          backgroundColor: orange,
        },
      ],
      // Row #27
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "Local",
          backgroundColor: gray,
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #28
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "International",
          backgroundColor: gray,
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #29
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Cargos de Hospital",
        },
        {
          backgroundColor: orange,
        },
      ],
      // Row #30
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Cuarto y Alimentación diario Local",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #31
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Cuarto y Alimentación diario Internacional",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #32
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Cuidados  Intensivos Local",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #33
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Cuidados  Intensivos Internacional",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #34
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Servicios de Hospital (Misceláneos)",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #35
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Honorarios del Cirujano",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #36
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Honorarios  de Cirujano Asistente",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #37
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Honorarios de Anestesia",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #38
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Visitas médicas en el hospital- Cuarto Normal",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #39
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Visitas médicas en el hospital- UCI",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #40
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Urgencias",
        },
        {
          backgroundColor: orange,
        },
      ],
      // Row #41
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Urgencia por Accidente",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #42
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Urgencia por Enfermedad Critico Detallada",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #43
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Urgencia por Enfermedad Critico NO Detallada",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #44
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Gastos Ambulatorios",
        },
        {
          backgroundColor: orange,
        },
      ],
      // Row #45
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Medico General",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #46
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Medico Especialista",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #47
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Medicinas Recetadas",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #48
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Rayos X y Laboratorios",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #49
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Atención Medica Primaria",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #50
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Maternidad",
        },
        {
          backgroundColor: orange,
        },
      ],
      // Row #51
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Periodo de Espera",
        },
        {
          backgroundColor: yellow,
        },
      ],
      // Row #52
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Cesárea",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #53
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Parto Normal",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #54
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Aborto Espontaneo",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #55
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Amenaza de Aborto",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #56
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Complicaciones del embarazo",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #57
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Cuidado Critico Neonatal",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #58
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Prematurez",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #59
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Enfermedades Congenitas del recien nacido",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #60
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Elegibilidad del recién nacido sano o no",
        },
        {
          backgroundColor: lightGray,
        },
      ],
      // Row #61
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Medicina Preventiva",
        },
        {
          backgroundColor: orange,
        },
      ],
      // Row #62
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Control de Niño Sano",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #63
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Control urologico",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #64
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Control ginecologico",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #65
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Estudios Detección de Diabetes",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #66
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Salpingectomia",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #67
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Vasectomía",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #68
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Chequeo Médico General",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #69
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Cobertura Dental",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #70
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Chequeo Óptico (lentes)",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #71
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Chequeo Oftalmológico (fonde de ojo)",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #72
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Vacuna contra la influenza",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #73
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Plan Wellness",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #74
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Wellbing",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #75
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Employee Assitance Program (EAP)",
        },
        {
          backgroundColor: yellow,
          value: "ENCUESTA",
        },
      ],
      // Row #76
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          fontWeight: "bold",
          value: "Otros Beneficios",
        },
        {
          backgroundColor: orange,
        },
      ],
      // Row #77
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Transporte Ambulancias Terrestre",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #78
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Transporte Ambulancias Aérea Local",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #79
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Transporte Ambulancias Aérea Internacional",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #80
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Terapias Físicas",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #81
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Tratamiento de Alergias",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #82
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Zapatos Ortopédicos",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #83
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Extracción de Terceras Molares",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #84
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Trasplante de Órganos",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #85
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Beneficio de Psiquiatría",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #86
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Beneficio de Psicología",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #87
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Apnea del sueño",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #88
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Anticonceptivos",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #89
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Enfermedades epidémicas o pandémicas",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #90
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Práctica recreativa de buceo",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #91
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Práctica recreativo de fútbol",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #92
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Deportes",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #93
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Prótesis quirúrgicas",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #94
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value:
            "Continuidad de cobertura para dependientes por fallecimiento del titular.",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #95
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Medicina preventiva ",
          fontWeight: "bold",
        },
        {
          backgroundColor: orange,
          value: "N/A",
        },
      ],
      // Row #96
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Tratamiento por alcohol y drogas",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #97
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Enfermedades de transmision sexual",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #98
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Aparatos / Equipo ortopedico",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #99
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Protesis",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #100
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Enfermería en el hogar",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #101
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Preexistencias",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #102
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Cobertura de VIH Vitalicio",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #103
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          backgroundColor: gray,
          value: "Participación de utilidades / comision por cobranza",
        },
        {
          backgroundColor: lightGray,
          value: "N/A",
        },
      ],
      // Row #104
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          align: "center",
          backgroundColor: orange,
          color: white,
          fontWeight: "bold",
          span: 2,
        },
      ],
      // Row #105
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          align: "center",
          backgroundColor: white,
          color: white,
          fontWeight: "bold",
          span: 2,
        },
      ],
      // Row #106
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          align: "center",
          backgroundColor: white,
          color: white,
          fontWeight: "bold",
          span: 2,
          value:
            "Corredor de Seguros: Comercial de Seguros Corredores de Seguros S.A.",
        },
      ],
      // Row #107
      [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          align: "center",
          backgroundColor: white,
          color: white,
          fontWeight: "bold",
          span: 2,
          value: "Licencia: 11-111",
        },
      ],
    ];

    await writeXlsxFile(data, {
      columns,
      fileName: "file.xlsx",
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
