import mongoose from "mongoose";

export interface ICake {
  name: string;
  categorie: string;
  description?: string;
  ingredients: string[];
  alergens: string[];
  portions: number;
  price: number;
}

const cakeSchema = new mongoose.Schema<ICake>({
  name: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ingredients: [{
    type: String,
    requiere: true,
  }],
  alergens: [{
    type: String,
    required: true,
  }],
  portions: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

export const Cake = mongoose.model<ICake>("Cake", cakeSchema);