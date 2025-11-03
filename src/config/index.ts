
export const categoryOptionMap = {
    'men': 'Men',
    'women': 'Women',
    'kids': 'Kids',
    'acessories': 'Acessories',
    'footwear': 'Footwear'
}

export const brandOptionMap = {
    'nike': 'Nike',
    'adidas': 'Adidas',
    'puma': 'Puma',
    'levi': 'Levi',
    'zara': 'Zara',
    'h&m': 'H&M'
}
export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: low to high" },
    { id: "price-hightolow", label: "Price: high to low" }, // ✅ fixed
    { id: "title-atoz", label: "Title: A to Z" },           // ✅ fixed
    { id: "title-ztoa", label: "Title: Z to A" },           // ✅ fixed
];


export const filterOptions = {
    category: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "acessories", label: "Acessories" },
        { id: "footwear", label: "Footwear" },
    ],
    brand: [
        { id: "Nike", label: "Nike" },
        { id: "Adidas", label: "Adidas" },
        { id: "Puma", label: "Puma" },
        { id: "Levi", label: "Levi" },
        { id: "Zara", label: "Zara" },
        { id: "H&M", label: "H&M" },
    ],

};
