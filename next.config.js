/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.igdb.com','media.vandal.net'],
    // loader: "imgix",
    // path: "http://localhost:3000/"    
  },
}


// http://localhost:3000/http://images.igdb.com/igdb/image/upload/t_screenshot_big/ar4cx.jpg?auto=format&fit=max&w=750