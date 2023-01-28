interface VeiculoInterface {
  tipo_veiculo: Carro | Aviao;
  locomover: () => void;
}

interface Carro {
  locomover: () => void;
}
interface Aviao {
  locomover: () => void;
}

class Veiculo implements VeiculoInterface {
  tipo_veiculo: Carro | Aviao;
  constructor(tipo_veiculo: Carro | Aviao) {
    this.tipo_veiculo = tipo_veiculo;
  }

  locomover = () => this.tipo_veiculo.locomover;
}
