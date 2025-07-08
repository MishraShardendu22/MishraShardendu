const Page = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
        Heading – Playfair Display
      </h1>

      <h2 className="text-2xl font-medium" style={{ fontFamily: 'var(--font-subheading)' }}>
        Subheading – Poppins
      </h2>

      <p className="text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
        Body text – Inter. This is an example of how your main content will look. It's clean, readable,
        and works well at all screen sizes.
      </p>
    </div>
  )
}

export default Page
