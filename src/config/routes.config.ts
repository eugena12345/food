export const routes = {
  main: {
    mask: "/",
    create: () => "/",
  },
  recipes: {
    mask: "/recipes",
    create: () => "/recipes",
  },
  // productsWithCategory: {
  //   mask: "/products",
  //   create: (id: number) => `/products/?filterByCategoryId=${id}`,
  // },

  recipe: {
    mask: "/recipes/:id",
    create: (id: string) => `/recipes/${id}`,
  },
  categories: {
    mask: "/categories",
    create: () => `/categories`,
  },
  // about: {
  //   mask: "/about",
  //   create: () => `/about`,
  // },
  favorite: {
    mask: "/favorite",
    create: () => `/favorite`,
  },
  login: {
    mask: "/login",
    create: () => `/login`,
  },
  // payment: {
  //   mask: "/payment",
  //   create: () => `/payment`,
  // },
}