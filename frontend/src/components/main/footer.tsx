import Link from 'next/link'

export default function FooterSection() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/admin/login" className="text-background/60 hover:text-background/80 transition-colors">
            Admin
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-background/60">
            &copy; 2024 Shardendu Mishra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}