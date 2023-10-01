import ProductForm from '@/components/ProductForm'

export default function Home({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const selectedSearch = searchParams?.selected ?? ''
  const selected = Array.isArray(selectedSearch) ? selectedSearch[0] : selectedSearch

  return (
    <main>
      <ProductForm selected={selected} />
    </main>
  )
}
