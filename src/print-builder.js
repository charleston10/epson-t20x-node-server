function divisorHeader() {
  return '=================================';
}

function divisorLine() {
  return '---------------------------------';
}

function lineBreak() {
  return '\n';
}

function footer() {
  return ' \n' + ' \n' + ' \n' + ' \n' + ' \n' + ' \n' + ' \n' + '. ';
}

function printBuilder(order) {
  let content = '';
  content += divisorHeader() + lineBreak();
  content += `PEDIDO #${order.orderId} ${order.dateTime}` + lineBreak();
  content += divisorHeader() + lineBreak();
  content += 'ENREGAR EM ' + lineBreak();
  content += `${order.deliveryAddress}` + lineBreak();
  content += divisorLine() + lineBreak();
  content += order.isPaid
    ? 'NAO COBRAR DO CLIENTE'
    : 'COBRAR DO CLIENTE' + lineBreak();
  content +=
    `\n${order.total} ${order.isPaid ? '(PAGO)' : '(NAO PAGO)'}` + lineBreak();
  content += divisorLine() + lineBreak();
  order.products.forEach((product) => {
    content +=
      `${product.quantity} ${product.name} ${product.total}` + lineBreak();
  });
  content += footer();

  return removeDiacritics(content);
}

/*
    Diacritics, often loosely called `accents', are the various little dots and squiggles which,
    in many languages, are written above, below or on top of certain letters of the alphabet
    to indicate something about their pronunciation.
 */
function removeDiacritics(text) {
  return text
    .normalize('NFD') //Decompose compound characters
    .replace(/[\u0300-\u036f]/g, ''); //Remove diacritical characters
}

module.exports = {
  printBuilder,
};
