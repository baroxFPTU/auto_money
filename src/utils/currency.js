const formatCurrencies = (amount) => {
  if (amount < 1) {
    return amount;
  }
  if (typeof amount === 'number') amount += '';
  return amount.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const getOriginal = (amount) => {
  return +amount.replaceAll('.', "");
}

export {
  formatCurrencies,
  getOriginal
}