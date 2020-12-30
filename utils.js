const billTypesEnum = {
  Clothes: 'Clothes',
  Medicine: 'Medicine',
  Book: 'Book',
  Imported: 'Imported',
  Food: 'Food'
}
const {billMetadata} = require('./bill')

console.log('bill is', billMetadata)

const getCustomBill = (billType) => {
  return billMetadata.filter((item) => {
    return item.itemCategory == billType
  })
}

const getTaxedBill = (bill, billType) => {
  console.log('--------------')
  let totalCost = 0
  let taxRate = 0
  bill.map((item) => {
    totalCost += item.price * item.quantity
  })
  const taxCategory = taxRates[billType]
  if (!taxCategory.isSpecial) {
    taxRate = taxCategory.rate
  } else {
    if (totalCost < taxCategory.rate[0]) {
      taxRate = taxCategory.rate[1]
    } else {
      taxRate = taxCategory.rate[2]
    }
  }
  console.log('non taxed bill for ', billType, totalCost)
  const taxedPrice = (totalCost * taxRate) / 100 + totalCost
  console.log('non taxed bill for ', billType, totalCost, taxedPrice, taxRate)

  return taxedPrice
}

const taxRates = {
  Medicine: {isSpecial: false, rate: 5},
  Clothes: {
    isSpecial: true,
    rate: [1000, 5, 12]
  },
  Entertainment: {isSpecial: false, rate: 3},
  Imported: {isSpecial: false, rate: 18},
  Food: {isSpecial: false, rate: 5},
  Book: {isSpecial: false, rate: 5}
}

module.exports = {
  taxRates,
  getCustomBill,
  getTaxedBill,
  billTypesEnum
}
