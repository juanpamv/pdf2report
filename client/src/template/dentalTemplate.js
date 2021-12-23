const white = "#FFFFFF";
const gray = "#D8D8D8";
const lightGray = "#F2F2F2";
const yellow = "#FEFF00";
const orange = "#DB3D10";

export const dentalColumns = [
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
  {
    width: 50,
  },
];

export const dentalData = [
  // Row #1
  [],
  // Row #2
  [],
  // Row #3
  [
    {
      value: "",
    },
    {
      value: "",
    },
    {
      backgroundColor: orange,
      color: white,
      fontWeight: "bold",
      span: 2,
      value: "BENEFICIOS ACTUALES",
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
      backgroundColor: gray,
      fontWeight: "bold",
      value: "Nombre del cliente",
    },
    {
      backgroundColor: gray,
      fontWeight: "bold",
      value: "N/A",
    },
    {
      value: "",
    },
    {
      span: 2,
      value:
        "En caso de tener clientes con cobertura para dependientes por favor indicarlos en el cuadro 'comentarios'",
    },
    {
      value: "",
    },
    {
      align: "center",
      backgroundColor: orange,
      fontWeight: "bold",
      span: 2,
      value: "OTROS DATOS",
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
      backgroundColor: gray,
      value: "Industria",
    },
    {
      backgroundColor: lightGray,
      value: "N/A",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "CANTIDAD DE EMPLEADOS ACTIVOS",
      borderColor: "#000000",
    },
    {
      borderColor: "#000000",
      backgroundColor: yellow,
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
      backgroundColor: gray,
      value: "Aseguradora Actual",
    },
    {
      backgroundColor: lightGray,
      value: "N/A",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "CANTIDAD DE EMPLEADOS ASEGURADOS",
      borderColor: "#000000",
    },
    {
      borderColor: "#000000",
      backgroundColor: yellow,
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
      backgroundColor: gray,
      value: "Primas",
    },
    {
      backgroundColor: orange,
      color: white,
      fontWeight: "bold",
      value: "Indicar tarifa mensual por millar",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "CANTIDAD DE VIDAS CUBIERTAS",
      borderColor: "#000000",
    },
    {
      borderColor: "#000000",
      backgroundColor: yellow,
    },
  ],
  // Row #8
  [
    {
      value: "",
    },
    {
      value: "",
    },
    {
      backgroundColor: gray,
      value: "Asegurado solo",
    },
    {
      backgroundColor: lightGray,
      value: "Incluido en la tarifa de GM",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value:
        "Este espacio es para validar si todos los empleados están asegurados, o bien, si existen diferencias, porque. ",
      span: 2,
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
      backgroundColor: gray,
      value: "Asegurado solo + 1",
    },
    {
      backgroundColor: lightGray,
      value: "Incluido en la tarifa de GM",
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
      backgroundColor: gray,
      value: "Asegurado solo + 2 o mas",
    },
    {
      backgroundColor: lightGray,
      value: "Incluido en la tarifa de GM",
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
      backgroundColor: gray,
      value: "Contribución",
    },
    {
      backgroundColor: orange,
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
      backgroundColor: gray,
      value: "Pago de primas empleados",
      fontWeight: "bold",
    },
    {
      backgroundColor: lightGray,
      value:
        "No contributiva / Contributiva (indicar % pagado por el empleado)",
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
      backgroundColor: gray,
      value: "Pago de primas Dependientes",
      fontWeight: "bold",
    },
    {
      backgroundColor: lightGray,
      value:
        "No contributiva / Contributiva (indicar % pagado por el empleado)",
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
      backgroundColor: gray,
      value: "Suma asegurada",
    },
    {
      backgroundColor: lightGray,
      value: "$1.000,00",
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
      backgroundColor: gray,
      value: "Deducible",
    },
    {
      backgroundColor: lightGray,
      value: "Mismo que el de GM, un solo deducible",
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
      backgroundColor: gray,
      value: "Tipo I - Preventivo",
    },
    {
      backgroundColor: lightGray,
      value: "Coberturas al 80%. Ortodoncia al 50%",
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
      backgroundColor: gray,
      value: "Tipo II - Restaurativo",
    },
    {
      backgroundColor: lightGray,
      value: "Coberturas al 80%. Ortodoncia al 50%",
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
      backgroundColor: gray,
      value: "Tipo III - Servicios Mayores",
    },
    {
      backgroundColor: lightGray,
      value: "Coberturas al 80%. Ortodoncia al 50%",
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
      backgroundColor: gray,
      value: "Tipo IV - Ortodoncia",
    },
    {
      backgroundColor: lightGray,
      value: "Coberturas al 80%. Ortodoncia al 50%",
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
      backgroundColor: orange,
      color: white,
      fontWeight: "bold",
      span: 2,
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
      backgroundColor: white,
      fontWeight: "bold",
      span: 2,
      value:
        "Corredor de Seguros: Comercial de Seguros Corredores de Seguros S.A.",
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
      backgroundColor: white,
      fontWeight: "bold",
      span: 2,
      value: "Licencia: 11-111",
    },
  ],
];
