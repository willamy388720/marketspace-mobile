export type PaymentMethodsDTO =
  | { key: "pix"; name: "Pix" }
  | { key: "card"; name: "Cartão de Crédito" }
  | { key: "deposit"; name: "Depósito Bancário" }
  | { key: "cash"; name: "Dinheiro" }
  | { key: "boleto"; name: "Boleto" };
