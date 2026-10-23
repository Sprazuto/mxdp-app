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
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-white/80 backdrop-blur-md border-gray-200 dark:bg-gray-950/80 dark:border-gray-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white" aria-label="MXDP Home">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MXDP</span>
            <span className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">EdTech Platform</span>
          </Link>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuTrigger className={cn(
                      'relative inline-flex items-center px-3 py-2 text-sm font-medium transition-colors',
                      'hover:text-blue-600 dark:hover:text-blue-400',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                      pathname === item.href
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300'
                    )}>
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Lihat semua {item.name.toLowerCase()}
                      </Link>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/daftar"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Daftar Sekarang
          </Link>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger>
            <button
              className="md:hidden rounded-lg p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-4">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold text-gray-900 dark:text-white">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    'rounded-lg px-4 py-3 text-base font-medium transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/daftar"
                onClick={() => setMobileOpen(false)}
                className="mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-center text-base font-semibold text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Daftar Sekarang
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}