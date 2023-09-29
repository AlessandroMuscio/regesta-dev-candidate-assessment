import { connect } from "@/utils/mongodb"
import { ProductType, Product } from "@/models/product"
import DropDown from "./DropDown"

export const dynamic = 'force-dynamic'

function sortAndUnify(array: string[]): string[] {
  const sorted = array.sort((elementA, elementB) => elementA > elementB ? 1 : -1)

  let unique = [sorted[0]]
  for (let i = 1; i < sorted.length; i++)
    if (sorted[i] != sorted[i - 1]) unique.push(sorted[i])

  return unique
}

async function getProducts(): Promise<string[]> {
  await connect()
  const products: ProductType[] = await Product.find({}, 'name -_id')

  return sortAndUnify(products.map(product => product.name))
}

export default async function ProductForm({ selected }: { selected: string }) {
  const options = await getProducts()

  return (
    <form>
      <label>Quantity</label>
      <input type='number' name='quantity' />
      <label>Product</label>
      <DropDown selected={selected || ''} options={options} />
    </form>
  )
}