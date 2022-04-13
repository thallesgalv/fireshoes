import Image from 'next/image'
import Link from 'next/link'
import { useProductContext } from '../../../../contexts/ProductContext'
import { currency } from '../../../../utils/calculations'
import { normalizeString } from '../../../../utils/normalizeString'
import TableActions from './TableActions'
import TableData from './TableData'
import TableHead from './TableHead'

const Table = () => {
  const { currentProducts } = useProductContext()

  if (!currentProducts || currentProducts.length === 0) return null
  return (
    <div className="overflow-x-auto">
      <table className="border border-primary ">
        <thead>
          <tr className="border border-primary bg-primary text-white">
            <TableHead>Editar</TableHead>
            <TableHead>Excluir</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Cores</TableHead>
            <TableHead>Foto Principal</TableHead>
            <TableHead>Tamanhos</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Melhor Preço</TableHead>
          </tr>
        </thead>
        <tbody>
          {currentProducts?.map(
            ({
              id,
              name,
              brand,
              category,
              price,
              bestPrice,
              mainImg,
              colors,
              sizes
            }) => (
              <tr key={id} className="border border-primary">
                <TableActions id={id} />
                <TableData>{id}</TableData>
                <TableData>
                  <Link href={`/product/${normalizeString(name)}/${id}`}>
                    <a>Link</a>
                  </Link>
                </TableData>
                <TableData>{category}</TableData>
                <TableData>{brand}</TableData>
                <TableData>{name}</TableData>
                <TableData>{colors?.join(', ')}</TableData>
                <td className="flex justify-center p-2 text-center">
                  <Image
                    src={mainImg || '/placeholder.png'}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </td>
                <TableData>{sizes?.join(', ')}</TableData>
                <TableData>{currency(price)}</TableData>
                <TableData>{currency(bestPrice)}</TableData>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
