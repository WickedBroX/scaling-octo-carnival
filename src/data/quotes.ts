export interface Quote {
  id: string;
  text: string;
  author: string;
  backgroundColor: string; // Hex or gradient string
  textColor: string;
  fontFamily: string;
}

export const INITIAL_QUOTES: Quote[] = [
  {
    id: "1",
    text: "Imagination is more important than knowledge.",
    author: "Albert Einstein",
    backgroundColor: "#e0e5ec",
    textColor: "#334155",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "2",
    text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "Albert Einstein",
    backgroundColor: "#e0e5ec",
    textColor: "#334155",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "3",
    text: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
    backgroundColor: "#e0e5ec",
    textColor: "#334155",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "4",
    text: "Logic will get you from A to B. Imagination will take you everywhere.",
    author: "Albert Einstein",
    backgroundColor: "#e0e5ec",
    textColor: "#334155",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "5",
    text: "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.",
    author: "Albert Einstein",
    backgroundColor: "#e0e5ec",
    textColor: "#334155",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "6",
    text: "Anyone who has never made a mistake has never tried anything new.",
    author: "Albert Einstein",
    backgroundColor: "#e0e5ec",
    textColor: "#334155",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "7",
    text: "We cannot solve our problems with the same thinking we used when we created them.",
    author: "Albert Einstein",
    backgroundColor: "#e0e5ec",
    textColor: "#334155",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "8",
    text: "Coincidence is God's way of remaining anonymous.",
    author: "Albert Einstein",
    backgroundColor: "#e0e5ec",
    textColor: "#334155",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "9",
    text: "The true sign of intelligence is not knowledge but imagination.",
    author: "Albert Einstein",
    backgroundColor: "#e0e5ec",
    textColor: "#334155",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "10",
    text: "Reality is merely an illusion, albeit a very persistent one.",
    author: "Albert Einstein",
    backgroundColor: "#e0e5ec",
    textColor: "#334155",
    fontFamily: "Inter, sans-serif",
  },
];

export const GOOGLE_FONTS = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Playfair Display",
  "Merriweather",
  "Lora",
  "Pacifico",
  "Dancing Script"
];
