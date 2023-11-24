type ProductsInRequest = {
  id: string;
  quantity: number;
  rentPeriod: number;
};

type ProductsInfo = {
  id: string;
  price: number;
  stock: number;
  availableStock: number;
  maximumRental: number;
};

type productPriceDetails = ProductsInRequest & {
  price: number;
  subTotal: number;
};

type OrderPriceDetails = {
  products: productPriceDetails[];
  totalAmount: number;
};
