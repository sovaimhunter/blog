import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <p>欢迎来到我的博客。</p>

      <h2 className="mt-10 text-xl font-extrabold">最近文章</h2>

      <div className="mt-3">
        <ul>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li
                key={slug}
                className="transform cursor-pointer   transition-transform hover:scale-101 hover:bg-[#fcfbfa] dark:hover:bg-[#2b2e40]"
              >
                <Link href={`/blog/${slug}`} className="block">
                  <article className="group">
                    <div className="mb-1 space-y-2 rounded-lg px-3 py-5  xl:col-span-3">
                      <h2 className="text-xl font-bold leading-8 tracking-tight group-hover:text-primary-500">
                        {title}
                      </h2>

                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="prose-sm max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            查看全部 ={'>'}
          </Link>
        </div>
      )}
      {/* {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  )
}
