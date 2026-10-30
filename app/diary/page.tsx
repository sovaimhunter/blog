import DiaryLayout from '@/layouts/DiaryLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allDiaries } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '日记' })

export default function DiaryPage() {
  // sortPosts orders newest first
  const posts = allCoreContent(sortPosts(allDiaries))
  return <DiaryLayout posts={posts} title="日记" />
}
