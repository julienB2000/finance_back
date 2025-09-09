// Fichier : src/schemas/auth.schema.ts

import { z } from "zod";

// Schéma pour l'inscription d'un nouvel utilisateur
export const registerUserSchema = z.object({
  // On définit d'abord le type, puis on enchaîne les règles.
  email: z
    .string()
    .min(1, { message: "L'email est requis" }) // Règle pour s'assurer qu'il n'est pas vide
    .email({ message: "Le format de l'email n'est pas valide" }), // Règle pour le format

  // On attache le message d'erreur à la règle .min()
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit faire au moins 6 caractères" }),
});

// Schéma pour la connexion d'un utilisateur
export const loginUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'email est requis" })
    .email({ message: "Le format de l'email n'est pas valide" }),

  password: z.string().min(1, { message: "Le mot de passe est requis" }),
});
