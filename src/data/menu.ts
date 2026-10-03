export type Category = 'kahve' | 'soguk' | 'tatli' | 'kahvalti'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: Category
  tags?: Array<'imza' | 'vegan' | 'yeni'>
}

export const categories: Array<{ id: Category; label: string }> = [
  { id: 'kahve', label: 'Hot Coffee' },
  { id: 'soguk', label: 'Cold Drinks' },
  { id: 'tatli', label: 'Desserts' },
  { id: 'kahvalti', label: 'Breakfast' },
]

export const menu: MenuItem[] = [
  {
    id: 'espresso',
    name: 'Chrome Espresso',
    description: 'Single-origin Ethiopian coffee with chocolate and bergamot notes.',
    price: 85,
    category: 'kahve',
  },
  {
    id: 'gul-latte',
    name: 'Rose Latte',
    description: 'House-made rose syrup, silky milk foam, and dried rose petals.',
    price: 145,
    category: 'kahve',
    tags: ['imza'],
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    description: 'Double ristretto and microfoam for a balanced, velvety finish.',
    price: 120,
    category: 'kahve',
  },
  {
    id: 'turk',
    name: 'Copper Pot Turkish Coffee',
    description: 'Slow-brewed over hot embers, served with Turkish delight and cold water.',
    price: 95,
    category: 'kahve',
  },
  {
    id: 'mocha',
    name: 'Cocoa Mocha',
    description: '70% Ecuadorian chocolate, espresso, and whipped cream.',
    price: 150,
    category: 'kahve',
    tags: ['imza'],
  },
  {
    id: 'cold-brew',
    name: 'Silver Cold Brew',
    description: '18-hour cold brew with a clean, smooth body.',
    price: 130,
    category: 'soguk',
  },
  {
    id: 'pink-tonic',
    name: 'Pink Espresso Tonic',
    description: 'Espresso, tonic water, raspberry, and crystal-clear ice.',
    price: 140,
    category: 'soguk',
    tags: ['yeni'],
  },
  {
    id: 'iced-oat',
    name: 'Iced Oat Latte',
    description: 'A light and refreshing latte made with creamy oat milk.',
    price: 135,
    category: 'soguk',
    tags: ['vegan'],
  },
  {
    id: 'frappe',
    name: 'Caramel Bronze Frappe',
    description: 'Salted caramel, espresso, and ice blended into a rich treat.',
    price: 155,
    category: 'soguk',
  },
  {
    id: 'ayna-pasta',
    name: 'Pink Mirror Cake',
    description: 'Raspberry mousse, white chocolate, and a glossy mirror glaze.',
    price: 175,
    category: 'tatli',
    tags: ['imza'],
  },
  {
    id: 'brownie',
    name: 'Fudgy Cocoa Brownie',
    description: 'Warm and fudgy with roasted hazelnuts, served with clotted cream.',
    price: 125,
    category: 'tatli',
  },
  {
    id: 'cheesecake',
    name: 'Rose & Pistachio Cheesecake',
    description: 'Pistachio crust with a delicate rose cream layer.',
    price: 165,
    category: 'tatli',
    tags: ['yeni'],
  },
  {
    id: 'kruvasan',
    name: 'Butter Croissant',
    description: 'Freshly baked every morning with 27 layers of crisp, buttery pastry.',
    price: 90,
    category: 'tatli',
  },
  {
    id: 'avokado',
    name: 'Sourdough Avocado Toast',
    description: 'Sourdough bread, avocado, poached egg, and chili flakes.',
    price: 210,
    category: 'kahvalti',
  },
  {
    id: 'granola',
    name: 'Cocoa Granola Bowl',
    description: 'Coconut yogurt, seasonal fruit, and honey topped with cocoa granola.',
    price: 175,
    category: 'kahvalti',
    tags: ['vegan'],
  },
  {
    id: 'menemen',
    name: 'Cast Iron Menemen',
    description: 'Farm-fresh eggs and roasted peppers, served sizzling in a cast-iron pan.',
    price: 190,
    category: 'kahvalti',
  },
]

export const formatTL = (n: number) => `₺${n.toLocaleString('tr-TR')}`