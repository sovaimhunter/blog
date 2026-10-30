import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '日记' })

export default function Page() {
  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        日记
      </h1>
      <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">还没有日记。</p>
    </div>
  )
}
