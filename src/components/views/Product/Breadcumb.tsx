import Link from 'next/link'

interface BreadcumbProps {
  category?: string
  brand?: string
}

const Breadcumb = ({ category, brand }: BreadcumbProps) => {
  if (!category || !brand) return null
  return (
    <div className="flex gap-0.5 uppercase text-dark text-xs">
      <Link href={`/category/${category?.toLocaleLowerCase()}`}>
        <a className="underline">{category}</a>
      </Link>
      <p>{'>'}</p>
      <Link href={`/brand/${brand?.toLocaleLowerCase()}`}>
        <a className="underline">{brand}</a>
      </Link>
    </div>
  )
}

export default Breadcumb
