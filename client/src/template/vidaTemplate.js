const white = "#FFFFFF";
const gray = "#D8D8D8";
const lightGray = "#F2F2F2";
const yellow = "#FEFF00";
const orange = "#DB3D10";

export const vidaColumns = [
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

export const vidaData = [
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
      backgroundColor: gray,
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
      backgroundColor: gray,
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
      backgroundColor: gray,
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
      value: "Contribución",
    },
    {
      backgroundColor: orange,
      value: "",
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
      value: "Pago de primas empleados",
    },
    {
      backgroundColor: gray,
      value: "No contributiva",
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
      value: "Suma asegurada",
    },
    {
      backgroundColor: gray,
      value: "24 veces el salario mensual",
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
      value: "Minimo",
    },
    {
      backgroundColor: gray,
      value: "No minimo",
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
      value: "Suma libre sin requisitos medicos",
    },
    {
      backgroundColor: gray,
      value: "No suma libre",
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
      value: "Maximo",
    },
    {
      backgroundColor: gray,
      value: "N/A",
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
      value: "Muerte y Desmembramiento Accidental",
    },
    {
      backgroundColor: gray,
      value: "Doble indeminización",
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
      value: "Incapacidad Total y Permanente",
    },
    {
      backgroundColor: gray,
      value: "Incluido",
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
      value:
        "Pago adelantado del seguro de Vida en caso de enfermedad terminal",
    },
    {
      backgroundColor: gray,
      value: "50%",
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
      value: "Adelanto de Gastos Funerarios",
    },
    {
      backgroundColor: gray,
      value: "₡2.000.000,00",
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
      value: "Participación de utilidades / comision por cobranza",
    },
    {
      backgroundColor: gray,
      value: "Incluido",
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
      backgroundColor: gray,
      value: "Periodos de espera/carencia",
      fontWeight: "bold",
    },
    {
      backgroundColor: orange,
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
      backgroundColor: gray,
      value: "Periodos de espera/carencia",
      fontWeight: "bold",
    },
    {
      backgroundColor: orange,
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
      backgroundColor: gray,
      value: "Disputabilidad",
    },
    {
      backgroundColor: lightGray,
      value: "1 año",
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
      backgroundColor: gray,
      value: "Disputabilidad",
    },
    {
      backgroundColor: lightGray,
      value: "1 año",
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
      backgroundColor: gray,
      value: "Suicidio",
    },
    {
      backgroundColor: lightGray,
      value: "1 año",
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
      backgroundColor: gray,
      value: "VIH/SIDA",
    },
    {
      backgroundColor: lightGray,
      value: "8 años",
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
      value: "Covid-19",
    },
    {
      backgroundColor: lightGray,
      value: "Sin periodo de espera",
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
      backgroundColor: orange,
      color: white,
      fontWeight: "bold",
      span: 2,
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
      align: "center",
      backgroundColor: white,
      fontWeight: "bold",
      span: 2,
      value:
        "Corredor de Seguros: Comercial de Seguros Corredores de Seguros S.A.",
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
      align: "center",
      backgroundColor: white,
      fontWeight: "bold",
      span: 2,
      value: "Licencia: 11-111",
    },
  ],
];
