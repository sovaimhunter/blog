import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allDiaries } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import type { Toc } from 'pliny/mdx-plugins'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allDiaries.find((p) => p.slug === slug)
  if (!post) return
  return { title: post.title, description: post.summary }
}

export const generateStaticParams = async () => {
  return allDiaries.map((p) => ({ slug: p.slug.split('/') }))
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const sortedCoreContents = allCoreContent(sortPosts(allDiaries))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allDiaries.find((p) => p.slug === slug)!
  // toc is declared as a string in contentlayer.config.ts but resolves to an array
  const toc: Toc = Array.isArray(post.toc) ? post.toc : []

  return (
    <PostSimple content={coreContent(post)} next={next} prev={prev} toc={toc}>
      <MDXLayoutRenderer code={post.body.code} components={components} toc={toc} />
    </PostSimple>
  )
}
