'use client'

import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Diary } from 'contentlayer/generated'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'

interface DiaryLayoutProps {
  posts: CoreContent<Diary>[]
  title: string
}

export default function DiaryLayout({ posts, title }: DiaryLayoutProps) {
  const [year, setYear] = useState<string | null>(null)

  const yearCounts: Record<string, number> = {}
  for (const post of posts) {
    const y = post.date.slice(0, 4)
    yearCounts[y] = (yearCounts[y] ?? 0) + 1
  }
  const years = Object.keys(yearCounts).sort((a, b) => b.localeCompare(a))
  const displayPosts = year ? posts.filter((post) => post.date.startsWith(year)) : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 hover:text-primary-400 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-[#fcfbfa] pt-5 shadow-md dark:bg-[#2c2e3f] dark:shadow-gray-800/40 sm:flex">
            <div className="flex w-full justify-start gap-3 px-6 pt-2">
              <button
                onClick={() => setYear(null)}
                className={`cursor-pointer font-bold uppercase hover:text-primary-400 ${year === null ? 'text-primary-500' : ''}`}
              >
                全部日记
              </button>
              <span className="uppercase underline underline-offset-4">年份</span>
            </div>
            <div className="px-6 py-4">
              <ul>
                {years.map((y) => (
                  <li key={y} className="my-3">
                    <button
                      onClick={() => setYear(year === y ? null : y)}
                      className={`py-2 text-sm font-medium uppercase hover:text-primary-500 ${year === y ? 'font-bold text-primary-500' : 'text-gray-500 dark:text-gray-300'}`}
                    >
                      {y} ({yearCounts[y]})
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {!displayPosts.length && <li className="px-6 py-5 text-gray-500">还没有日记。</li>}
              {displayPosts.map((post) => {
                const { path, date, title, summary } = post
                return (
                  <li
                    key={path}
                    className="transform cursor-pointer rounded-lg transition-transform hover:scale-101 hover:bg-[#fcfbfa] dark:hover:bg-[#2b2e40]"
                  >
                    <Link href={`/${path}`} className="block px-6 py-5">
                      <article className="group flex flex-col space-y-1 xl:space-y-0">
                        <h2 className="text-xl font-bold leading-8 tracking-tight text-gray-900 group-hover:text-primary-500 dark:text-gray-100">
                          {title}
                        </h2>
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                          </dd>
                        </dl>
                        {summary && (
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        )}
                      </article>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
