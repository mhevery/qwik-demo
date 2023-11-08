export interface Quote {
  id: string;
  text: string;
  rating: number;
  favoriteCount: number;
  favorited: boolean;
}

export const db = {
  quotes: {} as Record<string, Quote>,
  loadQuotById(id: string): Quote | null {
    return this.quotes[id] || null;
  },
  setRatingById(id: string, rating: number): Quote | null {
    const quote = this.quotes[id];
    if (!quote) {
      return null;
    }
    quote.rating = rating;
    return quote;
  },
  toggleQuotById(id: string): Quote | null {
    const quote = this.quotes[id];
    if (!quote) {
      return null;
    }
    quote.favorited = !quote.favorited;
    quote.favoriteCount += quote.favorited ? 1 : -1;
    return quote;
  },
};

db.quotes["123"] = {
  id: "123",
  text: "We talk about fullstack developers, but QwikDev takes fullstack to its full definition of the word. Server and client have never been so seamless.",
  rating: 4,
  favoriteCount: 231,
  favorited: false,
};
