export interface Sticker {
  id: number;
  name: string;
  team: string;
  image: string;
  collected: boolean;
}

export const stickers: Sticker[] = [
  { id: 1, name: 'Neymar Jr.', team: 'Brasil', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 2, name: 'Lionel Messi', team: 'Argentina', image: 'https://images.unsplash.com/photo-1552318975-2758886139bc?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 3, name: 'Cristiano Ronaldo', team: 'Portugal', image: 'https://images.unsplash.com/photo-1518091043644-c1d445bb5120?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 4, name: 'Kylian Mbappé', team: 'França', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 5, name: 'Vinicius Jr.', team: 'Brasil', image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 6, name: 'Robert Lewandowski', team: 'Polônia', image: 'https://images.unsplash.com/photo-1431324155629-1a6eda1eedbc?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 7, name: 'Kevin De Bruyne', team: 'Bélgica', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 8, name: 'Harry Kane', team: 'Inglaterra', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 9, name: 'Luka Modric', team: 'Croácia', image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 10, name: 'Manuel Neuer', team: 'Alemanha', image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 11, name: 'Alisson Becker', team: 'Brasil', image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 12, name: 'Virgil van Dijk', team: 'Holanda', image: 'https://images.unsplash.com/photo-1560272564-c83d66b1ad12?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 13, name: 'Pedri', team: 'Espanha', image: 'https://images.unsplash.com/photo-1510567198184-8147abc3c1f3?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 14, name: 'Son Heung-min', team: 'Coreia do Sul', image: 'https://images.unsplash.com/photo-1516515429572-bf32372f2409?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 15, name: 'Achraf Hakimi', team: 'Marrocos', image: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 16, name: 'Sadio Mané', team: 'Senegal', image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 17, name: 'Federico Valverde', team: 'Uruguai', image: 'https://images.unsplash.com/photo-1579952318443-29b3564a89ce?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 18, name: 'Jamal Musiala', team: 'Alemanha', image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 19, name: 'Jude Bellingham', team: 'Inglaterra', image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=400&h=400&fit=crop', collected: false },
  { id: 20, name: 'Gavi', team: 'Espanha', image: 'https://images.unsplash.com/photo-1529900903110-d02f0acdf501?q=80&w=400&h=400&fit=crop', collected: false },
];

export const users = [
  { email: 'test@example.com', password: 'Password123!', name: 'Usuário Teste' },
];
