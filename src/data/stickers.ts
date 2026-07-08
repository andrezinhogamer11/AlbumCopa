export interface Sticker {
  id: number;
  name: string;
  team: string;
  image: string;
  collected: boolean;
  rarity?: 'Comum' | 'Rara' | 'Lendária'; // Adicionado para conquistas
  isShiny?: boolean; // Adicionado para conquistas
}

export const stickers: Sticker[] = [
  { id: 1, name: '', team: 'Toy Machine', image: 'https://i.pinimg.com/736x/58/f3/3b/58f33b7ff9faa2af70f96573b51b13b9.jpg', collected: false, rarity: 'Comum', isShiny: false },
  { id: 2, name: '', team: 'Toy Machine', image: 'https://i.pinimg.com/736x/85/b3/21/85b3216606184c72539edb4f514d0f16.jpg', collected: false, rarity: 'Comum', isShiny: false },
  { id: 3, name: '', team: 'Toy Machine', image: 'https://i.pinimg.com/736x/e0/54/8b/e0548bede049a21ca446377aa505a027.jpg', collected: false, rarity: 'Rara', isShiny: false },
  { id: 4, name: '', team: 'Toy Machine', image: 'https://i.pinimg.com/736x/76/d8/45/76d84557fc2bae1d8059fd20db4d9d44.jpg', collected: false, rarity: 'Comum', isShiny: true },
  { id: 5, name: '', team: 'Toy Machine', image: 'https://i.pinimg.com/1200x/99/73/af/9973af23a50ba444cdffb3e869c94275.jpg', collected: false, rarity: 'Comum', isShiny: false },
  { id: 6, name: '', team: 'Toy Machine', image: 'https://i.pinimg.com/736x/22/14/6d/22146dfe84ac763dafb3b33ca614b62c.jpg', collected: false, rarity: 'Rara', isShiny: false },
  { id: 7, name: '', team: 'Toy Machine', image: 'https://i.pinimg.com/736x/68/9f/38/689f38b389928a0748acee876783e15b.jpg', collected: false, rarity: 'Comum', isShiny: false },
  { id: 8, name: '', team: 'Toy Machine', image: 'https://i.pinimg.com/736x/fc/bf/93/fcbf93c10bf2b976ac16ace2643696b4.jpg', collected: false, rarity: 'Comum', isShiny: true },
  { id: 9, name: '', team: 'Toy Machine', image: 'https://i.pinimg.com/736x/25/80/97/2580974299e84d83628e341349718343.jpg', collected: false, rarity: 'Comum', isShiny: false },
  { id: 10, name: '', team: 'Toy Machine', image: 'https://i.pinimg.com/736x/5f/c2/02/5fc2025122fbeb6416cf02b89209bcf5.jpg', collected: false, rarity: 'Rara', isShiny: false },
  { id: 11, name: '', team: 'Toy Machine', image: 'https://i.pinimg.com/736x/da/a9/64/daa964901cce865262e6545adf854469.jpg', collected: false, rarity: 'Comum', isShiny: false },
  { id: 12, name: '', team: 'BAKER', image: 'https://i.pinimg.com/736x/64/c8/4e/64c84e6c31ae4876bd9c2ffe39d7d20c.jpg', collected: false, rarity: 'Comum', isShiny: false },
  { id: 13, name: '', team: 'BAKER', image: 'https://i.pinimg.com/736x/37/65/d3/3765d3529d3d065a54f4c6f70f5bb161.jpg', collected: false, rarity: 'Rara', isShiny: false },
  { id: 14, name: '', team: 'BAKER', image: 'https://i.pinimg.com/736x/bf/45/92/bf459266865b05e56b9bb64f443bb585.jpg', collected: false, rarity: 'Comum', isShiny: true },
  { id: 15, name: '', team: 'BAKER', image: 'https://i.pinimg.com/736x/87/29/ee/8729eedafc50c9382d699d6739ebca0b.jpg', collected: false, rarity: 'Comum', isShiny: false },
  { id: 16, name: '', team: 'BAKER', image: 'https://i.pinimg.com/1200x/4a/c4/28/4ac428eddec9fe82e9f5b0e019c0ee13.jpg', collected: false, rarity: 'Rara', isShiny: false },
  { id: 17, name: '', team: 'BAKER', image: 'https://i.pinimg.com/736x/c2/d8/cb/c2d8cbb34ac38be5801ccc0742a093ba.jpg', collected: false, rarity: 'Comum', isShiny: false },
  { id: 18, name: '', team: 'BAKER', image: 'https://i.pinimg.com/736x/87/96/94/879694700866fa322441821924b59e65.jpg', collected: false, rarity: 'Comum', isShiny: true },
  { id: 19, name: '', team: 'BAKER', image: 'https://i.pinimg.com/736x/77/b7/f0/77b7f0c8f193bd2ee1b725bdc0bf079c.jpg', collected: false, rarity: 'Comum', isShiny: false },
  { id: 20, name: '', team: 'Blind', image: 'https://i.pinimg.com/736x/81/0d/b5/810db5f8629f186e1dea7693075ec928.jpg', collected: false, rarity: 'Rara', isShiny: false },
];

export const users = [
  { email: 'andre@gmail.com', password: 'andre123', name: 'Usuário Teste' },
];
