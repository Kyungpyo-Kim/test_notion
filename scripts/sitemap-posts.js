const fs = require('fs')
const fetch = require('node-fetch')
const prettier = require('prettier')

const getDate = new Date().toISOString()

const fetchUrl = 'https://jsonplaceholder.typicode.com/posts'
const YOUR_AWESOME_DOMAIN = 'https://kyungpyo.vercel.app'

const formatted = sitemap => prettier.format(sitemap, { parser: 'html' })

;(async () => {
  const fetchPosts = await fetch(fetchUrl)
    .then(res => res.json())
    .catch(err => console.log(err))

  const postList = []
  fetchPosts.forEach(post => postList.push(post.title))

  const postListSitemap = `
    ${postList
      .map(title => {
        return `
          <url>
            <loc>${`${YOUR_AWESOME_DOMAIN}/blog/${title}`}</loc>
            <lastmod>${getDate}</lastmod>
          </url>`
      })
      .join('')}
  `

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${postListSitemap}
    </urlset>
  `

  const formattedSitemap = [formatted(generatedSitemap)]

  fs.writeFileSync('public/sitemap-posts.xml', formattedSitemap, 'utf8')
})()
