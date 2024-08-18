export const Routes = {
  Home: "/",
  Products: "/products",
  ProductDetails: (id: string | number) => `/products/${id}`,
};
