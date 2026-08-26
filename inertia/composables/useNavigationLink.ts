import { type LinkParams } from '@adonisjs/inertia/vue'
import type { InferRoutes, UserRegistry } from '@tuyau/core/types'

type Routes = InferRoutes<UserRegistry>

type CategoryLink = {
  label: string
  slug: string
}

type NavLink = {
  [Route in keyof Routes]: {
    label: string
    activePattern: string
  } & LinkParams<Route>
}[keyof Routes]

export const categoriesLinks: CategoryLink[] = [
  { label: 'Jeux', slug: 'game' },
  { label: 'Films', slug: 'movie' },
  { label: 'Anime', slug: 'anime' },
  { label: 'Séries', slug: 'series' },
  { label: 'Livres', slug: 'book' },
]

export const navLinks: NavLink[] = [
  {
    label: 'Recherche',
    route: 'home',
    // routeParams: { category: categoriesLinks[0].slug },
    activePattern: '/',
  },
  {
    label: 'Suivi',
    route: 'session.create',
    // routeParams: { category: categoriesLinks[0].slug },
    activePattern: '/login',
  },
  {
    label: 'Collection',
    route: 'register.create',
    activePattern: '/register',
  },
]
