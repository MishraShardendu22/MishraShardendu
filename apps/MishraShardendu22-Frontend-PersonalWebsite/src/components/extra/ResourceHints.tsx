export default function ResourceHints() {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover"
      />

      <meta name="color-scheme" content="dark light" />

      <meta httpEquiv="x-dns-prefetch-control" content="on" />

      {/* Preload critical hero image - LCP optimization */}
      <link
        rel="preload"
        as="image"
        href="/Professional.avif"
        type="image/avif"
        fetchPriority="high"
        media="(max-width: 640px)"
        imageSrcSet="/Professional.avif 280w"
        imageSizes="280px"
      />
      <link
        rel="preload"
        as="image"
        href="/Professional.avif"
        type="image/avif"
        fetchPriority="high"
        media="(min-width: 641px) and (max-width: 1024px)"
        imageSrcSet="/Professional.avif 400w"
        imageSizes="400px"
      />

      {/* Preconnect to external domains for faster third-party loading */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

      {/* DNS prefetch for subdomain sites */}
      <link rel="dns-prefetch" href="https://blogs.mishrashardendu22.is-a.dev" />
      <link rel="dns-prefetch" href="https://admin.mishrashardendu22.is-a.dev" />
    </>
  )
}
