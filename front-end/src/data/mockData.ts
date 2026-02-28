export interface ClothingItem {
    id: number;
    name: string;
    type: 'top' | 'bottom' | 'shoes' | 'outerwear' | 'accessory';
    color: string;
    colorName: string;
    emoji: string;
}

export interface Look {
    id: number;
    name: string;
    itemIds: number[];
    tags: string[];
    date: string;
    gradient: string;
}

export const MOCK_CLOTHES: ClothingItem[] = [
    { id: 1, name: 'White T-Shirt', type: 'top', color: '#ffffff', colorName: 'White', emoji: '👕' },
    { id: 2, name: 'Black Polo', type: 'top', color: '#1a1a1a', colorName: 'Black', emoji: '👕' },
    { id: 3, name: 'Blue Dress Shirt', type: 'top', color: '#3b82f6', colorName: 'Blue', emoji: '👔' },
    { id: 4, name: 'Red Hoodie', type: 'top', color: '#ef4444', colorName: 'Red', emoji: '👕' },
    { id: 5, name: 'Blue Jeans', type: 'bottom', color: '#2563eb', colorName: 'Blue', emoji: '👖' },
    { id: 6, name: 'Black Chinos', type: 'bottom', color: '#1a1a1a', colorName: 'Black', emoji: '👖' },
    { id: 7, name: 'Beige Shorts', type: 'bottom', color: '#d4a574', colorName: 'Beige', emoji: '🩳' },
    { id: 8, name: 'Grey Joggers', type: 'bottom', color: '#6b7280', colorName: 'Grey', emoji: '👖' },
    { id: 9, name: 'White Sneakers', type: 'shoes', color: '#ffffff', colorName: 'White', emoji: '👟' },
    { id: 10, name: 'Brown Boots', type: 'shoes', color: '#92400e', colorName: 'Brown', emoji: '🥾' },
    { id: 11, name: 'Black Loafers', type: 'shoes', color: '#1a1a1a', colorName: 'Black', emoji: '👞' },
    { id: 12, name: 'Leather Jacket', type: 'outerwear', color: '#44403c', colorName: 'Brown', emoji: '🧥' },
    { id: 13, name: 'Denim Jacket', type: 'outerwear', color: '#3b82f6', colorName: 'Blue', emoji: '🧥' },
    { id: 14, name: 'Puffer Coat', type: 'outerwear', color: '#1a1a1a', colorName: 'Black', emoji: '🧥' },
    { id: 15, name: 'Silver Watch', type: 'accessory', color: '#c0c0c0', colorName: 'Silver', emoji: '⌚' },
    { id: 16, name: 'Black Cap', type: 'accessory', color: '#1a1a1a', colorName: 'Black', emoji: '🧢' },
];

export const MOCK_LOOKS: Look[] = [
    {
        id: 1,
        name: 'Casual Friday',
        itemIds: [1, 5, 9],
        tags: ['casual', 'work'],
        date: 'Feb 27, 2026',
        gradient: 'linear-gradient(135deg, #1e1b4b, #312e81)',
    },
    {
        id: 2,
        name: 'Date Night',
        itemIds: [3, 6, 11],
        tags: ['evening', 'elegant'],
        date: 'Feb 25, 2026',
        gradient: 'linear-gradient(135deg, #2d1b69, #4c1d95)',
    },
    {
        id: 3,
        name: 'Weekend Vibes',
        itemIds: [12, 5, 10],
        tags: ['casual', 'outdoor'],
        date: 'Feb 23, 2026',
        gradient: 'linear-gradient(135deg, #1a2744, #1e3a5f)',
    },
    {
        id: 4,
        name: 'Office Classic',
        itemIds: [3, 6, 11, 15],
        tags: ['formal', 'work'],
        date: 'Feb 20, 2026',
        gradient: 'linear-gradient(135deg, #1c1917, #292524)',
    },
    {
        id: 5,
        name: 'Sport Mode',
        itemIds: [1, 7, 9, 16],
        tags: ['sport', 'active'],
        date: 'Feb 18, 2026',
        gradient: 'linear-gradient(135deg, #052e16, #14532d)',
    },
    {
        id: 6,
        name: 'Rainy Day',
        itemIds: [14, 8, 10],
        tags: ['casual', 'rain'],
        date: 'Feb 15, 2026',
        gradient: 'linear-gradient(135deg, #1e293b, #334155)',
    },
];

export function getClothesById(id: number): ClothingItem | undefined {
    return MOCK_CLOTHES.find((item) => item.id === id);
}

export function getClothesForLook(look: Look): ClothingItem[] {
    return look.itemIds
        .map(getClothesById)
        .filter((item): item is ClothingItem => item !== undefined);
}
