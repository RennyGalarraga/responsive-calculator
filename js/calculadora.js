/* PANTALLA */
class Pantalla {
  constructor(pantallaValorAnterior, pantallaValorActual) {
    this.pantallaValorAnterior = pantallaValorAnterior;
    this.pantallaValorActual = pantallaValorActual;
    this.calculador = new Calculadora();
    this.tipoOperacion = undefined;
    this.valorActual = "";
    this.valorAnterior = "";
    this.signos = {
      sumar: "+",
      restar: "-",
      multiplicar: "×",
      dividir: "÷",
      porcentaje: "%",
    };
  }

  agregarNumero(numero) {
    if (numero === "." && this.valorActual.includes(".")) {
      return;
    }
    this.valorActual = this.valorActual.toString() + numero.toString();
    this.mostrarValores();
  }

  mostrarValores() {
    if (this.tipoOperacion === "inversor") {
      this.pantallaValorActual.textContent = this.valorActual * -1;
    } else if (this.tipoOperacion === "porcentaje") {
      this.pantallaValorActual.textContent = this.valorAnterior / 100;
      this.pantallaValorAnterior.textContent = `${this.valorActual + "%"}`;
    } else {
      this.pantallaValorActual.textContent = this.valorActual;
      this.pantallaValorAnterior.textContent = `${this.valorAnterior} ${
        this.signos[this.tipoOperacion] || ""
      }`;
    }
  }

  borrar() {
    this.valorActual = this.valorActual.toString().slice(0, -1);
    this.mostrarValores();
  }

  borrarTodo() {
    this.valorActual = "";
    this.valorAnterior = "";
    this.tipoOperacion = undefined;
    this.mostrarValores();
  }

  procesar(tipo) {
    this.tipoOperacion !== "igual" && this.calcular();
    this.tipoOperacion = tipo;

    if (tipo === "inversor") {
      this.valorActual = this.valorActual;
      this.mostrarValores();
    } else if (tipo === "porcentaje") {
      this.valorAnterior = this.valorActual || this.valorAnterior;
      this.valorActual = this.valorActual;
      this.mostrarValores();
    } else {
      this.valorAnterior = this.valorActual.toString() || this.valorAnterior;
      this.valorActual = "";
      this.mostrarValores();
    }
  }

  calcular() {
    const valorAnterior = parseFloat(this.valorAnterior);
    const valorActual = parseFloat(this.valorActual);

    if (this.valorActual && this.tipoOperacion === "inversor") {
      this.valorActual = this.calculador[this.tipoOperacion](valorActual);
    } else if (isNaN(valorActual) || isNaN(valorAnterior)) {
      return;
    } else {
      this.valorActual = this.calculador[this.tipoOperacion](
        valorAnterior,
        valorActual
      );
    }
  }
}

/* CALCULADORA JS */
class Calculadora {
  sumar(num1, num2) {
    return num1 + num2;
  }

  restar(num1, num2) {
    return num1 - num2;
  }

  multiplicar(num1, num2) {
    return num1 * num2;
  }

  dividir(num1, num2) {
    return num1 / num2;
  }

  porcentaje(num) {
    return num / 100;
  }

  inversor(num) {
    if (num === 0) {
      return num;
    } else {
      return -num;
    }
  }
}

/* INDEX JS */
const pantallaValorAnterior = document.getElementById("valor-anterior");
const pantallaValorActual = document.getElementById("valor-actual");
const botonesNumeros = document.querySelectorAll(".numero");
const botonesOperadores = document.querySelectorAll(".operador");

const pantalla = new Pantalla(pantallaValorAnterior, pantallaValorActual);

botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", () => {
    pantalla.agregarNumero(boton.innerHTML);
  });
});

botonesOperadores.forEach((boton) => {
  boton.addEventListener("click", () => pantalla.procesar(boton.value));
});

/* MODO DARK */
const botonModo = document.getElementById("toogle");
const bodyModo = document.body;
const switchModo = document.getElementById("switch");
const calcuModo = document.getElementById("calculadora");
const teclasGris = document.querySelectorAll(".bt-gris");
const teclasAzules = document.querySelectorAll(".bt-azul");

botonModo.addEventListener("click", () => {
  bodyModo.classList.toggle("dark");
  botonModo.classList.toggle("toggle");
  botonModo.classList.toggle("toggle-on");
  switchModo.classList.toggle("switch");
  switchModo.classList.toggle("switch-on");
  calcuModo.classList.toggle("dark");
  teclasGris.forEach((btGris) => {
    btGris.classList.toggle("gris");
    btGris.classList.toggle("gris-dk");
  });
  teclasAzules.forEach((btAzul) => {
    btAzul.classList.toggle("azul");
    btAzul.classList.toggle("azul-dk");
  });
});
