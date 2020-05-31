/**
 * Retorna uma lista de utilizadores filtrados com base no nivel
 * @param {Array} utilizadores Lista com todos os utilizadores
 * @param {number} nivel Nível a filtra
 * @param {string} operador Operador de filtragem da lista
 * @returns {["=", "<", ">", "<=", ">="]} Lista com os utilizadores filtrados
 */
export function filtraNivel(utilizadores, nivel, operador = "=") {
  let utilizadoresFiltrados = [];

  switch (operador) {
    case "=":
      utilizadoresFiltrados = utilizadores.filter(
        utilizador => utilizador.level == nivel
      );
      break;
    case "<":
      utilizadoresFiltrados = utilizadores.filter(
        utilizador => utilizador.level < nivel
      );
      break;
    case ">":
      utilizadoresFiltrados = utilizadores.filter(
        utilizador => utilizador.level > nivel
      );
      break;
    case "<=":
      utilizadoresFiltrados = utilizadores.filter(
        utilizador => utilizador.level <= nivel
      );
      break;
    case ">=":
      utilizadoresFiltrados = utilizadores.filter(
        utilizador => utilizador.level >= nivel
      );
      break;
    default:
      break;
  }
  return utilizadoresFiltrados;
}

export default {
  filtraNivel
};
