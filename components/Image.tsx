import NextImage, { ImageProps } from 'next/image'

// next/image only accepts integer sizes, but SVGs (e.g. Excalidraw exports) often declare decimals
const toInt = (v: ImageProps['width']) => (v === undefined ? v : Math.round(Number(v)))

const Image = ({ width, height, ...rest }: ImageProps) => (
  <NextImage width={toInt(width)} height={toInt(height)} {...rest} />
)

export default Image
