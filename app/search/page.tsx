import GoBackButton from "@/components/GoBackButton"
import SuppliersSection from "@/components/SuppliersSection"

export default function Search({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const productNameSearch = searchParams?.productName ?? ''
  const quantitySearch = searchParams?.quantity ?? ''

  let error: boolean
  let productName: string = ''
  let quantity: number = -1
  if (productNameSearch.length !== 0 && quantitySearch.length !== 0) {
    productName = Array.isArray(productNameSearch) ? productNameSearch[0] : productNameSearch
    quantity = parseInt(Array.isArray(quantitySearch) ? quantitySearch[0] : quantitySearch, 10)

    error = productName.length <= 3 || quantity <= 0
  } else {
    error = true
  }

  return (
    <main>
      {error ? (
        <div className="text-center">
          <p>Something went wrong with your search :(</p>
          <p>
            Please check if you provided a correct product name and remember that the quantity must be greater than zero.
          </p>
        </div>
      ) : (
        <>
          <nav>
            <div>
              <h2>Search Results</h2>
              <p><small>Searched for product: {productName}</small></p>
            </div>
          </nav>
          <SuppliersSection quantity={quantity} productName={productName} />
        </>
      )}

      <GoBackButton />
    </main>
  )
}