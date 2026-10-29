'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Program', href: '/program' },
  { name: 'Fasilitas', href: '/fasilitas' },
  { name: 'Guru', href: '/guru' },
  { name: 'Kontak', href: '/kontak' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header className="site-bar" role="banner">
      <div className="sc-wrap">
        <Link href="/" className="wordmark" aria-label="MXDP Home">
          <span className="wordmark__logotype">MXDP</span>
          <span className="wordmark__tagline">Taman Kanak-Kanak Terpercaya</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuTrigger className={cn(
                    'relative inline-flex items-center px-3 py-2 text-sm font-medium transition-colors',
                    'hover:text-[var(--c-orange)] dark:hover:text-[var(--c-orange)]',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--c-orange-light)] focus:ring-offset-2',
                    pathname === item.href
                      ? 'text-[var(--c-orange)] dark:text-[var(--c-orange)]'
                      : 'text-[var(--sc-ink)] dark:text-[var(--sc-ink)]'
                  )}>
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-[var(--sc-surface)] dark:bg-[var(--sc-surface)] border border-[var(--sc-hairline)] dark:border-[var(--sc-hairline)] rounded-[var(--sc-r-lg)] shadow-[var(--sc-e3)]">
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-sm transition-colors hover:bg-[var(--sc-canvas)] dark:hover:bg-[var(--sc-canvas)]"
                    >
                      Lihat semua {item.name.toLowerCase()}
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="clay-primary" size="md" asChild>
            <Link href="/ppdb">Daftar PPDB</Link>
          </Button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger>
            <button
              className="md:hidden rounded-[var(--sc-r-md)] p-2 text-[var(--sc-ink)] dark:text-[var(--sc-ink)] hover:bg-[var(--sc-canvas)] dark:hover:bg-[var(--sc-canvas)] focus:outline-none focus:ring-2 focus:ring-[var(--c-orange-light)]"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-4 bg-[var(--sc-surface)]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold text-[var(--sc-ink)] dark:text-[var(--sc-ink)]">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-[var(--sc-r-md)] p-2 text-[var(--sc-ink-soft)] hover:text-[var(--sc-ink)] dark:hover:text-[var(--sc-ink)] hover:bg-[var(--sc-canvas)] dark:hover:bg-[var(--sc-canvas)] focus:outline-none focus:ring-2 focus:ring-[var(--c-orange-light)]"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'rounded-[var(--sc-r-lg)] px-4 py-3 text-base font-medium transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--c-orange-light)]',
                    pathname === item.href
                      ? 'bg-[var(--c-orange-soft)] text-[var(--c-orange)] dark:bg-[var(--c-orange-soft)] dark:text-[var(--c-orange)]'
                      : 'text-[var(--sc-ink)] hover:bg-[var(--sc-canvas)] dark:text-[var(--sc-ink)] dark:hover:bg-[var(--sc-canvas)]'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="clay-primary" size="md" asChild className="mt-4 w-full">
                <Link href="/ppdb">Daftar PPDB</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}