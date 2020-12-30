const {getCustomBill, getTaxedBill, billTypesEnum, taxRates} = require('./utils')
let totalTaxedBill = 0,
  totalDiscountRate = 0

const discountRates = {
  price: 1000,
  rate: 5
}

for (let billCategory of Object.keys(billTypesEnum)) {
  const bill = getCustomBill(billCategory)
  const taxedBill = getTaxedBill(bill, billCategory)
  totalTaxedBill += taxedBill
}

if (totalTaxedBill > discountRates.price) {
  totalDiscountRate = discountRates.rate
  totalTaxedBill -= (totalTaxedBill * totalDiscountRate) / 100
}
console.log('Total taxed bill is:', totalTaxedBill)
