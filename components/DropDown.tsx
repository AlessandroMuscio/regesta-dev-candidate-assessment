'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ChangeEvent } from 'react'

export default function DropDown({ selected, options }: { selected: string, options: string[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const current = new URLSearchParams(searchParams)
    const newSelectedValue = event.target.value.trim()

    if (!newSelectedValue)
      current.delete('selected')
    else
      current.set('selected', newSelectedValue)

    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  return (
    <select value={selected} onChange={onSelect}>
      <option value=''>Choose a Product</option>
      {
        options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))
      }
    </select>
  )
}