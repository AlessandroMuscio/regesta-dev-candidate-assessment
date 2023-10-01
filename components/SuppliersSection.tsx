import { Discount, DiscountType } from '@/models/discount'
import { Product, ProductType } from '@/models/product'
import { Supplier, SupplierType } from '@/models/supplier'
import { connect } from '@/utils/mongodb'
import { Schema } from 'mongoose'

interface Card {
  supplierName: string,
  cost: string,
  minDaysShipping: number
}

interface OrderTotal {
  minOrderTotal: number
}

interface Quantity {
  minQuantity: number
}

interface Seasonal {
  startDate: Date
  endDate: Date
}

function calculateDiscountedCost(quantity: number, initialCost: number, discounts: DiscountType[]): string {
  let discountedCost = initialCost

  let maxOrderTotalIndex: number = -1
  let maxQuantityIndex: number = -1
  let maxSeasonalIndex: number = -1

  for (let i = 0; i < discounts.length; i++) {
    switch (discounts[i].type) {
      case 'OrderTotal':
        let currentOrderTotalCondition = discounts[i].conditions as OrderTotal

        if (initialCost <= currentOrderTotalCondition.minOrderTotal) break

        if (maxOrderTotalIndex === -1) {
          maxOrderTotalIndex = i
          break
        }

        if (discounts[i].value > discounts[maxOrderTotalIndex].value)
          maxOrderTotalIndex = i

        break

      case 'Quantity':
        let currentQuantityCondition = discounts[i].conditions as Quantity

        if (quantity <= currentQuantityCondition.minQuantity) break

        if (maxQuantityIndex === -1) {
          maxQuantityIndex = i
          break
        }

        if (discounts[i].value > discounts[maxQuantityIndex].value)
          maxQuantityIndex = i

        break

      case 'Seasonal':
        let currentSeasonalCondition = discounts[i].conditions as Seasonal
        let today = new Date()

        if (today < currentSeasonalCondition.startDate || today > currentSeasonalCondition.endDate) break

        if (maxSeasonalIndex === -1) {
          maxSeasonalIndex = i
          break
        }

        if (discounts[i].value > discounts[maxSeasonalIndex].value)
          maxSeasonalIndex = i

        break

      default:
        break;
    }
  }

  if (maxOrderTotalIndex !== -1)
    discountedCost -= discountedCost * (discounts[maxOrderTotalIndex].value / 100)

  if (maxQuantityIndex !== -1)
    discountedCost -= discountedCost * (discounts[maxQuantityIndex].value / 100)

  if (maxSeasonalIndex !== -1)
    discountedCost -= discountedCost * (discounts[maxSeasonalIndex].value / 100)

  return discountedCost.toFixed(2)
}

async function getDiscounts(discountsIDs: Schema.Types.ObjectId[]): Promise<DiscountType[]> {
  return await Discount.find({
    _id: { $in: discountsIDs }
  })
}

async function getSupplier(id: Schema.Types.ObjectId): Promise<SupplierType> {
  return (await Supplier.find({
    _id: id
  }))[0]
}

async function getProducts(quantity: number, productName: string): Promise<ProductType[]> {
  return await Product.find({
    name: productName,
    quantity: { $gte: quantity }
  })
}

async function getCards(quantity: number, productName: string): Promise<Card[]> {
  await connect()
  const products: ProductType[] = await getProducts(quantity, productName)

  let cards: Card[] = []
  for (const product of products) {
    const supplier = await getSupplier(product.supplier)
    const discounts = await getDiscounts(product.discounts)
    const cost = calculateDiscountedCost(quantity, quantity * product.pricePerUnit, discounts)

    cards.push({
      supplierName: supplier.name,
      cost: cost,
      minDaysShipping: supplier.minDaysShipping
    })
  }

  return cards
}

export default async function SuppliersSection({ quantity, productName }: { quantity: number, productName: string }) {
  const cards: Card[] = (await getCards(quantity, productName)).sort(
    (a, b) => a.cost > b.cost ? 1 : -1
  )

  return (
    <>
      {cards.length === 0 ? (
        <div>
          No supplier was found!<br />
          Try looking for another quantity or maybe check later to see if our suppliers have restocked.
        </div>
      ) : cards.map((card, i) => (
        <div key={i} className={`card${i !== 0 ? '' : ' highlighted'}`}>
          <h3>{card.supplierName}</h3>
          <p>
            This supplier will give you the products for <strong>{card.cost} €</strong> in <strong>{card.minDaysShipping}</strong> shipping days.
          </p>
        </div>
      ))}
    </>
  )
}
