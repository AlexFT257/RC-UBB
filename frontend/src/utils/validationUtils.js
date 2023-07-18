const forbiddenWords = [
    "puto",
    "puta",
    "putos",
    "putas",
    "pendejo",
    "pendeja",
    "pendejos",
    "pendejas",
    "chinga",
    "chingar",
    "chingas",
    "chingan",
    "chingada",
    "chingado",
    "chingadas",
    "chingados",
    "chingatumadre",
    "chinga tu madre",
    "chinga a tu madre",
    "chinguen",
    "chinguen a su madre",
    "chinguen a su puta madre",
    "chinguen a su puta madre",
    "chinguen a su reputisima madre",
    "maricon",
    "maricón",
    "maricones",
    "maricona",
    "mariconas",
    "mariconcito",
    "mariconcitos",
    "mariconazo",
    "mariconazos",
    "mariconada",
    "mariconadas",
    "mariconada",
    "mariconadas",
    "mariconeria",
    "mariconería",
    "conchesumadre",
    "conchesumadres",
    "conche tu madre",
    "conche tu puta madre",
    "conche tu reputisima madre",
    "conche a tu madre",
    "conche a tu puta madre",
    "conche a tu reputisima madre",
    "conche a su madre",
    //me aburri de poner mas
]; // Lista de palabras prohibidas

export function hasForbiddenWords(text) {
  const words = text.toLowerCase().split(" ");
  
  for (let i = 0; i < words.length; i++) {
    if (forbiddenWords.includes(words[i])) {
      return true; // Se encontró una palabra prohibida
    }
  }
  
  return false; // No se encontraron palabras prohibidas
}