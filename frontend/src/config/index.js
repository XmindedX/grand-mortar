export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Masukkan username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Masukkan email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Masukkan password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Masukkan email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Masukkan password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Nama Produk",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Masukkan nama produk",
  },
  {
    label: "Deskripsi Produk",
    name: "description",
    componentType: "textarea",
    placeholder: "Masukkan deskripsi produk",
  },
  // {
  //   label: "Kategori",
  //   name: "category",
  //   componentType: "select",
  //   options: [
  //     { id: "keyboard", label: "Keyboard" },
  //     { id: "mouse", label: "Mouse" },
  //     { id: "headphone", label: "Headphone" },
  //     { id: "monitor", label: "Monitor" },
  //     { id: "microphone", label: "Microphone" },
  //   ],
  // },
  // {
  //   label: "Brand",
  //   name: "brand",
  //   componentType: "input",
  //   type: "text",
  //   placeholder: "Enter product title",
  // },
  {
    label: "Harga Produk",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Masukkan harga produk",
  },
  {
    label: "Harga Diskon",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Masukkan harga diskon (opsional)",
  },
  {
    label: "Total Stock Produk",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Masukkan total stock produk",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "keyboard",
    label: "Keyboard",
    path: "/shop/listing",
  },
  {
    id: "mouse",
    label: "Mouse",
    path: "/shop/listing",
  },
  {
    id: "headphone",
    label: "Headphone",
    path: "/shop/listing",
  },
  {
    id: "microphone",
    label: "Microphone",
    path: "/shop/listing",
  },
  {
    id: "monitor",
    label: "Monitor",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  keyboard: "Keyboard",
  mouse: "Mouse",
  headphone: "Headphone",
  monitor: "Monitor",
  microphone: "Microphone",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "keyboard", label: "Keyboard" },
    { id: "mouse", label: "Mouse" },
    { id: "headphone", label: "Headphone" },
    { id: "monitor", label: "Monitor" },
    { id: "microphone", label: "Microphone" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Alamat",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Masukkan alamat",
  },
  {
    label: "Kota",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Masukkan kota",
  },
  {
    label: "Kode Pos",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Masukkan kode pos",
  },
  {
    label: "Nomor Telepon",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Masukkan nomor telepon",
  },
  {
    label: "Catatan",
    name: "notes",
    componentType: "textarea",
    placeholder: "Masukkan catatan",
  },
];
