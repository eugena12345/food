export const routes = {
  main: {
    mask: "/",
    create: () => "/",
  },
  recipes: {
    mask: "/recipes",
    create: () => "/recipes",
  },
  recipe: {
    mask: "/recipes/:id",
    create: (id: string) => `/recipes/${id}`,
  },
  categories: {
    mask: "/categories",
    create: () => `/categories`,
  },
  products: {
    mask: "/products",
    create: () => `/products`,
  },
  favorite: {
    mask: "/favorite",
    create: () => `/favorite`,
  },
  login: {
    mask: "/login",
    create: () => `/login`,
  },
  registration: {
    mask: "/registration",
    create: () => `/registration`,
  },
}