import { connect } from "@/utils/mongodb"
import { ProductType, Product } from "@/models/product"
import DropDown from "./DropDown"
import { redirect } from 'next/navigation'

// Extremely important!!
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

async function sendForm(formData: FormData) {
  'use server'

  let index = 0
  let query = '?'
  for (const [name, value] of formData.entries()) {
    query += `${index > 0 ? '&' : ''}${name}=${encodeURIComponent(value.toString())}`

    index++
  }

  redirect(`/search${query}`)
}

export default async function ProductForm({ selected }: { selected: string }) {
  const options = await getProducts()

  return (
    <form action={sendForm}>
      <label>Quantity</label>
      <input type='number' name='quantity' />
      <label>Product</label>
      <DropDown selected={selected || ''} options={options} />
      <br />
      <button type="submit" className="btn-primary">Search</button>
    </form>
  )
}