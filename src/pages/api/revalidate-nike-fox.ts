import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await res.unstable_revalidate('/product/nike-fox/uzZotPLyv2TyxkMsnnMK')
    await res.unstable_revalidate('/category/esportivo')
    await res.unstable_revalidate('/brand/nike')
    await res.unstable_revalidate('/')
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}

export default handler


