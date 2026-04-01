import { useState, useRef, useEffect } from "react";

const COLORS = {
  cream: "#FFF8F0",
  coral: "#FA7066",
  purple: "#985AD3",
  orange: "#f0803c",
  teal: "#2ab5a0",
  yellow: "#FBC66A",
  dark: "#2D2A26",
  warmGray: "#6B6560",
  lightGray: "#E8E2DA",
};

const questions = [
  {
    id: 1,
    question: "Aujourd'hui, quelle place occupe l'IA dans votre activité ?",
    emoji: "🧩",
    options: [
      { text: "Aucune, on n'a pas commencé", score: 0 },
      { text: "Quelques tests, mais rien de structuré", score: 1 },
      { text: "Utilisée régulièrement sur certains projets", score: 2 },
      { text: "Intégrée dans le quotidien de travail", score: 3 },
    ],
  },
  {
    id: 2,
    question: "Quand il faut produire un contenu (texte, visuel, vidéo), le premier réflexe c'est…",
    emoji: "⚡",
    options: [
      { text: "Tout à la main, comme avant", score: 0 },
      { text: "Un essai ChatGPT ou un outil IA, « pour voir »", score: 1 },
      { text: "L'IA sert de point de départ, on affine ensuite", score: 2 },
      { text: "Un vrai process : l'IA génère, l'humain valide et ajuste", score: 3 },
    ],
  },
  {
    id: 3,
    question: "Quand vous demandez quelque chose à une IA (ChatGPT, Copilot...), le résultat est…",
    emoji: "✍️",
    options: [
      { text: "Inexistant — on n'a jamais essayé", score: 0 },
      { text: "Souvent décevant, il faut tout refaire", score: 1 },
      { text: "Correct, avec quelques ajustements", score: 2 },
      { text: "Exploitable du premier coup (on a la méthode)", score: 3 },
    ],
  },
  {
    id: 4,
    question: "Côté création visuelle (visuels, campagnes, supports), l'IA c'est…",
    emoji: "🎨",
    options: [
      { text: "Pas du tout dans les pratiques", score: 0 },
      { text: "Des démos vues, ça a l'air bien mais pas encore testé", score: 1 },
      { text: "Des visuels IA générés pour du brouillon ou de l'inspiration", score: 2 },
      { text: "L'IA fait partie de la chaîne de production graphique", score: 3 },
    ],
  },
  {
    id: 5,
    question: "L'IA vous aide-t-elle à produire du contenu vidéo ou multimédia ?",
    emoji: "🎬",
    options: [
      { text: "On ne produit pas de vidéo (ou très peu)", score: 1 },
      { text: "Tout est fait manuellement, l'IA n'intervient pas", score: 0 },
      { text: "L'IA assiste certaines étapes (sous-titres, transcription, retouche…)", score: 2 },
      { text: "L'IA est intégrée à la production : scripts, visuels, voix off, montage assisté", score: 3 },
    ],
  },
  {
    id: 6,
    question: "Y a-t-il une stratégie claire sur l'IA ?",
    emoji: "🧭",
    options: [
      { text: "L'IA n'est pas encore un sujet stratégique", score: 0 },
      { text: "Ça revient dans les réflexions, mais rien de concret", score: 1 },
      { text: "Il y a une volonté d'avancer, budget en réflexion", score: 2 },
      { text: "Un plan de formation ou de déploiement est en cours", score: 3 },
    ],
  },
  {
    id: 7,
    question: "Les questions de droits, d'éthique et de données liées à l'IA, vous en êtes où ?",
    emoji: "⚖️",
    options: [
      { text: "Pas encore réfléchi à ça", score: 0 },
      { text: "L'IA est évitée par précaution, faute de cadre", score: 1 },
      { text: "Des outils « safe » sont utilisés, mais sans charte formelle", score: 2 },
      { text: "Des règles claires existent sur l'usage de l'IA", score: 3 },
    ],
  },
  {
    id: 8,
    question: "Si un concurrent automatise demain sa production de contenus avec l'IA, vous…",
    emoji: "🚀",
    options: [
      { text: "Panique à bord", score: 0 },
      { text: "On regarde de loin en se disant qu'il faudrait s'y mettre", score: 1 },
      { text: "On pourrait réagir en quelques semaines", score: 2 },
      { text: "C'est déjà fait (ou faisable dès demain)", score: 3 },
    ],
  },
];

const profiles = [
  {
    id: "decouverte",
    title: "Phase Découverte",
    range: [0, 6],
    emoji: "🌱",
    color: COLORS.coral,
    subtitle: "Vos concurrents ont 6 mois d'avance. Pas 6 ans.",
    description:
      "L'IA n'est pas encore dans vos pratiques — et c'est le cas de 90% des entreprises françaises. Sauf que les 10% qui ont commencé produisent déjà plus vite, testent plus de pistes créatives, et répondent à leurs clients en une fraction du temps. Chaque mois d'attente creuse l'écart.",
    recommendations: [
      "Session d'acculturation IA (demi-journée) — En 3h, toute votre équipe comprend ce que l'IA change concrètement dans vos métiers, voit des démos live, et repart avec une vision claire des prochaines étapes. Zéro jargon, zéro bullshit — c'est ce qui a convaincu des équipes chez Decathlon, Kiabi et Boulanger.",
      "Formation ChatGPT communicants ou marketeurs (1 jour) — Une journée pour diviser par 2 le temps passé sur vos briefs, emails, posts et contenus. Vos équipes repartent avec des réflexes concrets qu'elles utilisent dès le lendemain. Droits et bonnes pratiques inclus.",
      "Formation Freepik IA graphique (2 jours) ou Adobe Firefly (1 jour) — Passer de 3h de création visuelle à 30 minutes. Vos graphistes et communicants découvrent la génération d'images IA en conditions réelles, guidés par un DA qui utilise ces outils en production chaque semaine.",
    ],
  },
  {
    id: "exploration",
    title: "Phase Exploration",
    range: [7, 12],
    emoji: "🔍",
    color: COLORS.orange,
    subtitle: "Vous bricolez. Il est temps de structurer.",
    description:
      "Quelques personnes testent l'IA dans leur coin, mais sans méthode commune, sans cadre, sans cohérence. Résultat : des prompts aléatoires, des résultats inégaux, et du temps perdu à réinventer la roue à chaque projet. La bonne nouvelle : il suffit souvent de 1 à 2 jours de formation pour passer du bricolage au process.",
    recommendations: [
      "Formation Freepik IA graphique (2 jours) — Passer de l'essai-erreur au prompt engineering méthodique. Vos équipes repartent avec des workflows reproductibles : une campagne visuelle qui prenait une semaine se produit en une journée. Droits d'usage inclus.",
      "Formation Adobe Firefly (1 jour) — Maîtriser en une journée toute la suite IA créative d'Adobe : génération d'images, remplissage génératif, et toutes les entrées IA dans Photoshop, Illustrator et les autres outils de la gamme. L'IA dans les outils que vous utilisez déjà — rien à réapprendre.",
      "Formation ChatGPT pour les marketeurs (1 jour) — SEO, personae, campagnes, contenus : en une journée, vos marketeurs structurent leur usage de l'IA texte et arrêtent de bricoler. Des équipes chez Cofidis et GRDF sont passées par là.",
    ],
  },
  {
    id: "integration",
    title: "Phase Intégration",
    range: [13, 18],
    emoji: "⚙️",
    color: COLORS.purple,
    subtitle: "Vous utilisez 30% du potentiel. On va chercher les 70% restants.",
    description:
      "L'IA est dans vos pratiques, mais vous sentez qu'il reste un énorme gisement inexploité. Vos concurrents les plus avancés automatisent déjà leurs déclinaisons visuelles, génèrent leurs vidéos, et construisent des outils internes sans développeur. C'est le moment d'accélérer — avant que l'avance devienne un standard.",
    recommendations: [
      "Formation Freepik IA nodale (1 à 2 jours selon niveau) — Le point fort de Freepik et Weavy : des systèmes de génération visuels reproductibles et modifiables. Créer une fois, décliner à l'infini. Une campagne 50 visuels qui prenait 2 semaines se produit en une demi-journée.",
      "Formation IA Vidéo (2 jours) — Du prompt engineering à la génération vidéo complète avec Kling, Veo et Freepik Spaces. Des équipes qui externalisaient 100% de leur vidéo produisent maintenant en interne pour une fraction du coût.",
      "Formation Vibe Coding & Automatisations (2 jours) — Créer des landing pages, des outils internes, des prototypes sans coder. Et automatiser vos tâches récurrentes avec Claude Cowork et N8N. Moins de temps perdu sur le répétitif, plus de valeur sur le stratégique.",
    ],
  },
  {
    id: "maturite",
    title: "Phase Maturité",
    range: [19, 24],
    emoji: "🏆",
    color: COLORS.teal,
    subtitle: "Vous avez l'avance. Ne la perdez pas.",
    description:
      "Bravo — vous faites partie des plus avancés. Mais l'IA évolue chaque mois. Les outils de janvier sont dépassés en juin. Et pendant que vous stabilisez vos acquis, vos concurrents rattrapent leur retard à toute vitesse. Votre avantage ne tient que si vous continuez à avancer.",
    recommendations: [
      "Mise à jour trimestrielle IA (demi-journée) — Nouveautés Claude, ChatGPT, Adobe, Freepik : ce qui a changé, ce que ça implique pour vos workflows, les fonctions que vous n'exploitez pas encore. Format court, impact immédiat. L'assurance de ne jamais se faire rattraper.",
      "Formation Vibe Coding & Automatisations (2 jours) — Matures sur l'image et le texte ? Il est temps d'automatiser. Créer des apps, des outils, des workflows automatisés avec Claude Cowork et N8N — sans développeur. Le prochain avantage concurrentiel, c'est celui-là.",
      "Programme sur-mesure intra — On audite vos workflows actuels et on construit un parcours adapté combinant graphique, vidéo, texte, vibe coding et automatisations. Durée et contenu calibrés sur vos besoins réels. C'est ce que font des groupes comme Jules, Nacon et Blancheporte.",
    ],
  },
];

function getProfile(score) {
  return profiles.find((p) => score >= p.range[0] && score <= p.range[1]) || profiles[0];
}

const LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAADPCAYAAAANirWiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAYGVJREFUeNrsvXmQHcl935lZr4Gh/+LTnwPZ5ht7vcEhZU4DMwPM6vB0L8nhaG3tAF7Lq4MiXjuoI8QDaCtiFWHHbqNjHf5jYyO6sbaoYyl3j8OXLIoAaB0kZxTdY9MOAjND9MgypQjFGk2HCf6plndtkzPoys2syqz6ZVbWO+p6VfW+X7Lmod9ZZ9bvk7+LM6jT+tbFDw4Z4zvyn5uP33v1BHsEgiAIgiAIarM4dkGX4eNDEj7YgVxWBeNH8miun7v7CiAEgiAIgiAIaq0C7IKuwscHKXwolFyV/3nw8NILq9g7EARBEARBUFsFD0gn4eNDLnyQQ8mVB2T93N0vHWFPQRAEQRAEQQAQqDr44Nw5jMnhBIRAEARBEARBrRRCsDoFHx9czcKHlyUjSHl46SMIx4IgCIIgCIJaJXhAOgUfXMHHMOv5yD2U8IRAEARBEARBABCoEfgAhEAQBEEQBEGtE0KwugQfbG74UEI4FgRBEARBEAQAgeaDD5ZUu2LzwAcgBIIgCIIgCAKAQPPCB2OCzw0dWQjh/ODhcy8CQiAIgiAIgqCFCTkgrYcPngMfcx467pTo/eoXkRMCQRAEQRAENS54QFoNH6wa+LAVh2PBEwJBEARBEAQtQPCAtBQ+hJXzwcsdNj6hRC88IRAEQRAEQRAABPBRM3wAQiAIgiAIgqCFCCFYLYOPyYxROS8iHAuCIAiCIAhqVPCAtAw+BM/L9ShwqPjMn4EnBIIgCIIgCGpE8IC0CT6qSzSfV/CEQBAEQRAEQY0IHpA2wUdVeR/RRwodWnhCIAiCIAiCoFoFD0jr4KMCRuQlmhXCEwJBEARBEAQBQJYFPjhjiwvDAoRAEARBEARBAJDlgQ9XBeGDVwItgBAIgiAIgiAIANJv+KgAHKp1mABCIAiCIAiCIADIcsBHUZJAnxAIgiAIgiAIAAL4oE0GM5xQEXzw2vJFACEQBEEQBEFQZUIZ3obhI7/RYCvhgwoleiEIgiAIgqDSggdkYfDRORaMPSGXPgJPCARBEARBEAQAaT18VJbn4X5Ng+AiBCAEgiAIgiAIAoC0Dz5YFj7qzfvYZnGIVJ3wYf4FCIEgCIIgCIIAIO2BD+X54PXDR/q5jXNf/eIN+bheO4SkAoRAEARBEARBAJB2wEcDno/0owo+9tU/dHJ4PRCSej8AIRAEQRAEQRAApBvwUaHi0KsEPoxqgRA/fDgQ8gIgBIIgCIIgCAKAtAs+Kg29ysBHrRAymVAAIRAEQRAEQRAApJ/wEX00Fz4qh5DJ3o9oa7UAIRAEQRAEQRAApGn4yCOG6uCDT4WPyiFkOnwAQiAIgiAIgqDZTVrsgurgY3rSealdvnHu7pf25/3Qw+dezJQFno0vZvZ+uIo7pt/9MjqmQxAEQRAEQRnBA9Jj+FAq5AkpDh+MJZ6QD8MTAkEQBEEQBFVnES8vfDCrz4cfPny7tnn4oJrLEzIRQMQMvxa9R3tCXoEnBIIgaFH3rUsfGskHtazpp57y3AeO5fINPW6rMfv48buvHmPvQRAEAGkFfMzi+WgffMwFIeW8H+7rgJBmDIw1YlzMqkNpYBw2tH7X2bwhgLZ25bqetPwYKANvLJf9LhluZL3nkTJO93tw3Yy1YT6PWn989TG9LJfn9bhQ9No71jByR48Xxz06h+uQGk9P5H5ayvuduQ/J7b/R4W240YX7TYP37dt1XvcrMN/qho/CqhQ+lFQ4loSQ9VwIKQ0fGZlwLEBIvVID/1bBG2YTRt5Oia/Y7MjNYEsbQe9R126Hzp1RgXNHnTf7PbhurhYBd22Yt81YGOrzT23TaoXnhoEZ9Rtq21/WRslJx8/husYAtZ/MefKa3lfLcu/bU8dCbn+XJyjUMVQewiuAj+i+fVTneIcckNrhoxCQVA4fFEKYLyekEviY0DH9InJClnAQW9U3paJSN+/dDmzniKUzsGP9NwQ1cu7JRV1jf6wNhjrH2TV9PT+Qv7mD83zqvlLG7H25n9T+uq4hsa/n4Zil3sStjm/OZXV+L/GYcpmVmzQEgFQHH6w38DEVQkpJTHopgpBvXfwQIGR5BrGhvnaKSp2jXfEkbE35G4Iqv740eDxgzYcfqWv7OgGRIY7IRI20QfdAzyz3UXTMG2kg6bKu92AbiowrZScNASDVwgfvFXx4IaTavA/vS1x3TAeELI1useKx5wqMN7oQepUTfw4vCFTnOXd9QeDhNdS0YT3GkZkJ3BSw3deGXl/OxzHL5lL1YRJmT+e1LM2kBivSsgEA0gx81KzG4MOCECGmeEJElT8JCFmOgUzN9pUZuDc6FDe9N+fzEFQYduWiDISdJo2EGcd1ZawdALxnUmRf9AHatNHqC9cZ6YTurutWn2CxTfABAMmFD+71fNTo/ZgZPlQlK7nckMuBXB7IRZDlj/Xz6vWZDED5uxPCsQrnfVgvcfs9gJB+D2QqfrRMmMG2hI/bHdnWtQmgtbZMs2dQI9fV/ZJgX7fUut3X6wrNBm1dD8maVOHwWg/C84YaQvoeZrjH6s0fA4DMDh9uzkceVzQDHxImhnK5roBD34S29GA/8lwsa/p1AygKRobzQ0gt8AEI6beRVEXS+Y0ObfJWydchaJbrSs0wlwlpXITBdh1HbibtdHVfaaP82pRzoQ/ngbKzDvp6AupcsoVMGgBApsBHAhWLgw8T77vD5q9ZP9JGUAQi80NIQfiY7T0aQj4ICOnHIDbU8FHUSOpS0vmsvVfgBYGqMA66aMTt6HWHZttX4w6u9yz9na71xHuw2sfzWZ93Czv3ACBT4GNRYVfa61FVvK/6/Jb8vvu6GeEUCBHlkn/FrHtEAEJ6dBNlxV24nUk6J9qq+H0Q5IOPcYc3YQwImQtCVjt0bk7zflDboy/esHFP8lrMMVxjC85VXHoAySu1Ox98zK1p8KHWSXk91qqmeCbEwcNLHxlPh5CCiemTQ69yBigOCOn2QHa9pKG02aVmXXN2nocXBFpG+ACEzKch61bhilm8H0bXepRDsdWT4gHK3rq16PVYagCZVO3KDx95mgtKZoGPeqoRxOV2o4FuMoR8uVhi+lzwIfR+44CQbg9kyrgu07Rot4Ndc7dqfj+03NfUTk3wcSiXbRaHOq47i3peXYd1TAT0aua4Rq12wbidw/tB4apPOUE7Xa6MpY9fK3LKVpYbPuYJu8oDjU7BB5WCkGO5Pod5EPLw0gvr9vpUCx/OO4c8hpD1x+/97hGDujSQFTaIJHxsdhC41ub8WOQFkdt6iLMGmnJ+la0i50rdb+7MUFnukKzDiMVJqcrIHFUF7fJ7j1pU4W67ioIXejxQ++h55i8MM7dxq49ZmzWP98NIeUF2OxZmOwmoVBnl83J7jjt4zz6o8LoupaX0gFD4EO2Bj7JJvPPAh9EtCSG5J6LtCak07Mr7TgFPSNdUBpbVwH2lg9u81fDnoOWBjxGrLgxnVy7fJQ2kjXmNfmVUyUUZi0/oa7SqCaG9vvUJUZMKyoOr97PaXxt6bCts3LbZC1LA+0GN9j55QbpanrdMriYApA74EMmSBxT1wgcxUFabv4jExBteDCETmhXODR9i4r4DhHTGWCqbdH6la7NhBb0fRsgFgaapirCIQ7k8oTyLVVxfCl7kcl7+c5PNXCFxstHW5wOoYUSByHaJr7nW4k28XuIcvdazfhqrXTqfdRhkq+B2qQAk3/PBU6O4+qTzWUrtjmqbHRBTwWDt4aUXLk+GkFf8OSEF4SMLfoCQjhni45Lna6eSzp1JgkV+HurvNXWDlZ+AUtfVeh1hIcojIh/OMxKqVRCOrizD8dThXUXLiq+20VNUwvtBAbRv/WHWulBkQd+zW3f/WRoAmQwfbE74mBlKZu1wXs+JMRU+ktenJhFnIKQkfLj704URQEhrB7JVtnxJ52W9H/RmtYazCHLOrVFJw06Nyec1JNRpVKvQLHUP2C+wfht1wVGLIUTtp6I5bm3sJl/G+2F0rYddxcctD5sr2yAYAFI7fMysauFDez+qP3lnhw+l0cNLL0w1jBIIETGElIUPbsEHz6wZIKR1A1npZoNdSzon2qnoe1CSFHK1VeKaUmPxepMeRZXvMIdhre6BT3Rx0qGifaWg8LDAR1/qGSQbDSscS9ukPV1Aoo3w0dou7r0HEAMfwgMfdNZdWGYxZyXzPmb1fCxopsMLDldn+aSBED5zs0IRwYVwfj3d54I8zxMQAYS0c5Bl5fI+1jsKXmNWXX7WqA915KFKDbtxmWtqEeGM2rCeBCHHet02elL5qIyK5IO07X5XBpJdjftWjIBASGuOWwUThgCQquCDeeDDfoonhnJemFAN8DGz4T8fX4h54WMuEDp375UZmhWm8DHLr9vhV5w5uSKAkMUPZjdKwvJ6hw2RrZZ/H9RdFT0XFgYfDoT47nWqxO0TKDud7KdDNn9lrGFbjPSSkLxMY2DbKmMdtBBklwNAfPBhZthzE9C9BjGvEz6qn+koBh/RxfPw0gszr8vj916dCiFuWJVvv+cBiiCgqJehAIQs6ga0VvKGsdHRpHPj/ajaEIAXBCpr2G234ZrS4VgGNNTj+Sr6a/RQRWBs1JJ1rwMW+uoFUdt0sGgI0YnxrbeVegkgefCRFc8YxzZ0zNPZYn74ePjci2stgQ/znrlO2HwIEZmQKxc6JoW/2a9ZxwEQshgjqUypwf2Ox39vdex7oe6oaEz97boTzueUqmxlKnChiaxfb3URQGryfvR9DCxbqKXsMbvOWlZud2kAxIUPX38P85w7Ky88BvCMpnsRz0dkUDcDHzN9QaEBLwshwsrjoHCR3d/pfrehJJMHQj1XgJBmVaY3wZGeIe0qfI1rNALgBYGKhjS2qpCDCq1sGRC1UUXAbNSC9a4TEvrqBTHb1jiE6HtKZ5L8ewUgPvhgmTAgX0jV9DCr/NyQwvBhSLkBiZKvzwoh4sSFB+YJexMWdPi9Iea10MoFSUK2ACHNDGZLmXTe0M23ie+H2nttrRY0MLeXqZQttNBzVJ2fY4yBhXW9yUmmCkrkA0DqgA+az+E1dLkd8iM8uQk5pnoZ+KiQL8qEXolKVkFBiNxnkSdETAQPloEOFwJFZuG+vwEh9c+klBk8u5x0Xrf3wwhekOVVkeIj6nqCpwFqSk3AQZ+9IEqNVMbS+zBqNQEAWTh82KFUjMAHNXaFxxPiCxMSfpMd8OHoXAQhatabn/j2me3x4DleEJ6BQDcsi8AkIKSdMymbPYgF3+rZ70Dt0lqBz9xGSVuooXuAMmjHGAMr0UGdEKIT3suESgNAysCHIH0+poUA+WfTfdWxaLgWNYh5lfBx3Bf4MPruBELinJCsF8MfduV7jeVCCyCkxYPZftfjwUt4P4rku8ALspzXWJHx6ib23lIB5yIncYpAgbrnF8lP6rsXJOrHUWNlrE5UvOodgGQ7nPuMV9uQZT7DVviqLuVBCdv47uo8H8f17JnC8FHJ7NqfvvdKBCEigZC8fI+sFyRkNP8jD04ynipASHW6xYqHHh2xliXINnjzPdTVvg4b+j2ouyoyTh2jwlSn9VRBg34RgKzG/yKTIgqQ9wuu99YSXPO3ajhWCj4ud3WndBZAfJ4PXw5HXg4BY9NCftLXSSL0xp+++8X9Cjej+A1FiKrhQ71U2Q3uz0TNCrmEEH6SH2Llh5Ew571h5jhbYAIIKT+Y3WDFZurMzfJK10NESng/tp3HeQQvyHKpyDV2G7tt6Y75ooCzqPdjV4//RTx1ffeCROeABoYq71Wdvm90EkAMfLBM2BXPDemJ5Q3h8Xg+3BKw0etVwwc799UvnhQaZAqX3J0IHyfn7r1yWOX2/Zl7Xz6S8LYeRonpk3M9UsBIjxNj0zwg7ucAISUGs8us3CzUla5X59Eu8iK5L4em67N+LHId7bSogy5Ur95T4DOvYbd1elJj3mv7ZBGTObrpbBGj9iZZ311WzAuytwSnw1j36ajift35/dU5APHBR9bLwef4W/9bxIZsyHxhWHzjz979nf2aNmk+Y6Vw3oeY9lItM2yje1+KqmMJXR0rPwdkWkI6y4EP7nqqACHzD2ajkoPZpjHAO67rrFjui+v1KDIDONS/D/VfowKfQfhVdyc1CoV0LmiVC3s/zB8aRIrYS2sagPqunTIeb53Q3gtYW+kDfDDHKGX6uazZzSdUxdJv5smDecfGE3d/e7/Gzbo5s+FRH3yobb1T1wb+uXtfPPp/Lv6gghBvvg6naxg9QY+d8YXQd3Hnk9zdxiGLIWT98Xu/ixv39BvkUiedk/1QpDP1kQtf8u/b8vuOCxia1+TndlHpqPea+1qrwruoG6O1cmJGdVHvq7FZEDgb93hp478IAOx7xqzZ7ZosAB0uwRigIORo3rwufZ/qXLndzgPIty5G1DcTfAin+aDdZND/vuRvYezfyLDd+HN3f6tO+FBhWMcPn3vxkBWPva8CPo4fv/dqrTHGf/7e7xz9kYQQRvJ2mPY8iYmgxRMmsY8q1z3XfTASvQcQMvsNsqhR0pekc8aKez/yvB3KKzLvLJXxgtzAadlrzXu9HVb4u2vY/Y0Z9Or6Hxf8+CJyfoqG4N70AbPc/v0C2x95QXriUZ821qvyvE/MOuHUN/hQ6kQIloIPNXsuZoSPSaFWdoKz23E7DccSDcCHY6xMYYwiSeczwcdsv1+B/oKEkLg6VpyYHgp/kYDQPR7MVCqj4VYsNyeELAjHmjygjUvcINWgudGH2foS3o9jXfmKeW7A6vnjAt95DbkgENTp8WRVLvdLjK2HTefTlfR+HBe2a6oFoa5CyKzjfWs9mL0FkBQ++HBSInJ+r4kUPEKr0hJ38ggsONn4b+7+ZlPwobwgivZ3q4WP6Vyi4ePw8XuvNrat/+29344hRPCTvGNjP2/n6cjPxeAi0r+tx+x5AQjxS5WFLBNHutGjsqBV5X5UcQNGLggEdXASQ03oyEXNUN8vaSi+vIBNKGr0545xGkyK2BZdywUpYz/NlM+hwyfHJX7niLUwj6zVIVgPL314VRqVpMN5vreDekNYznMs99/0O9nGk/e+sL+AzVUXsqpsMKoGPsQs8BHNYje9oe+991tHX3/2r6wbsDSrxRlzOq9wZ8Wz4VYmDIubR7m/Ap7JDUE4VlZlaoerWa9elAWtw/tBpPbRTgG4QS4IBNWr53XZ8TJ6tzYgR6x476Qi40rVY6Ay9osY/PszeGpeLmg4dyYXRO6DDZ0YXhQ6L6twPfU9OcdH7b8yk1JRiXzWwsT11gKIgg+WhF1l+3NMCr+icBFmzNqJiegb77t3ZxHwEZXkffjci+okSWP8qi63KzJbvfH4vcWUTn3f67959PvP/pAXQrL4YTAjhQ36N3OgRQiTyAMIqUlqpu+1pm+UNanq3A96YzqR++kmm392EbkgEFSvihrddWt7Ab9ZWe6HZww8lGPgYYF93bVcEFVE4X4JEPXeUzUclgWHdZ2T07qd1soQrIeXXliNk5VN2FVeWdZs+BUFkSisR6T5AjS3wJNnsDD4IBBypE/kk0KAMT98LHQW+3te/xdOiV7mhMYxEp7FnHCtvPA7nUOCcKxpKgthe3rWp7Mq4f2Yp8xk0Zr4yAXBtUeNZaj/OuyQ9+NwjhDc3ueCaG/1FVaue/0eDT3T99ey3dNbHSrdOgCJ4cNNOJ+lr4fJA6A5AenzoVnke0+jJYgeNYhsvH/B8OEYN0eVJp1n4aM18YAfeP0LEYTIY3AS+goCEJgMGXNyddjEJHQFIaEAhOToDisXu6p00HEIKez9mDU8qkRnYOSC9FdzGylL0CUa58RiKgpWnvvhGQMPWbFwqk7lgmhDv2xI+y1dxKBseXyl3bZHKbQKQBR8CMvz4fd+MPc5AxyOQRqytKJSsghnkfDxF+/dXvhBevjciyO5KFfbA7kxazXCh5IyGu9/6+KHbsll4Te21dfv6OpY7CR0jhuFj5DAh/tcmFsZaxKEfGipIUTHnJY594ddhZCS3o95+54U3cfwgvRTx0WGSey2Xmuz6Znqkt6PeYGiaGJ9pypi6dzIMiBpwEOF4pexzW7LdWl9ifzWAMjDSx9xmgwyAhzTwrAmVb+yl1O9GM/HU/dutQE+brA4fnBcs+fDlUpEfvCtix/ceXhxsYbOBQkhLArHSqtj+TwfFEx8FdHyQrRCwe2KWhHksoOHgJBlhZDavR9kHx8X3MfwgvRT3yjwmed7vD+WPSdvf0Ez1bV7P8gYuF8QvDvXHV035i1zPEclJxyq8MQsD4DE8OGW2p0FOnhuSFaYAyDxEihjdOPC659fKHxor8d9PRAMiyWdF4aP5I1yPykj5/43L354oUbkhddvO54QAh1WyV3q1fCHY3nzRAS3vChx8js/0AUPllmbJY0AZSjvdWW2XoezXCv48aJd34vGQV9D+E3vdFjgM5d7vD+Wudrbfl71o5rHQHU+FTHsj0okhhcdA3e6dlD1MT1a0LV0pSsVFBcOINIAJ2FXbAJ0sNy/mfN36E04Z4kHRMHHMwuGj29eenHMaL3wiZ6POcFkPvgw+24kH+//x4sfXuiM6zMRhJicEO25EBRGUrhIcjxE+r5sQ0Nfg0Lr/NAQ8sLSQogerNZLDphR7lZHIGSLFfN+7Bcd2Et6QbYY1CcVuc5GXS/6UPH+6IM2FgEfJY36m0V/sIQXZFWXou2aZigoVP1vNt3EsowWWoY3gg9hJ5wzlp3Rdp9jVv8P5vV+2AnN8fOn8XMbz73+uYXCx3+89IM3pOm/xZJqsRWW250ZPrId5fVzO//h4gtP/dl7X16YC+/Z128dffXZK+tMxCF5XKNSoNczkP9VxzXQaxzqkrws8pTQPiDxtoVJ+V6XuEUEKIEOI5IQsn7u7peX8maoS8aqAfOAFXf/GghZb+sMjPYmFL2ZlS2RebPgb6sSjdtdurFAU6+1owLXmfLabZT43fUGrq8iN7NvLNkpcMQWWJ1IG/OjAh+tokfJzYLwoyZh9jt4nZt7ahMTc51rDrwwD4gNH5NDrkI2SxgWywm3MrkfQZTzsWj4+A+XfnBPRBeTqdA1J2BUAh8iA3MOkIy/cfEjB3JZ2Gz2cxJCQhKO5XSqd84L55EUJXC7rGdzSLjpFRMlpqtwwGU2jFj5UoKresBtq4p6E/bLAoC+ORw2vN5QO1XkPBi3ORyvxLoty6TPsTYSzy/YUGws98M3jha8v4y66AXRx7mJZPDdLvblWgiAZOEjJ+RKTIeO1IgMouXUSThPq1+xjf9uwfDxjUv/w54y7n3lY0vDB5sHPnwd4DPekDW53w7+/cUXFwYh3/tGDCFJOBajieb2v2lp3iRcS2TD8IRw+41QmGFxYvpyQ4i6SZZ1HSuXeeu6ri7Y+1H2e8bIBemV+lgVqFCeSoeazZUBDwUdTyzaSFyw96NMWfLOTsLo/VZng8lOVLzyqfEQLAofYRJexb3hVdkGg573CO54P5in0aCEjzcWCx///tJf3pHrNg6SHt7C08O7BHyI+XI+psCH2XeqOIByly4sHOv7JIT862eurKtzRnkpQi7XSq6UCrMKo7Ass+fsPWp6pNNn3D0kSJgWURSO9c1LL65/990vLms41lEFrmNlMLMFxjhXeQNTN829FnSS3WIdqW4CzXSNHRcwBtV1dbOloRZXC3xmUfBxzObPRxgVNN5HrJkQnFqNeHneVeXZLrovIi9IF2f65TrfkOv+HlZ8AixPnal4tXAAceEjm+PhJpTn532EOtQmtKoeORASe1A2vveNX1/oCftHl35oLI3l62nugosdInnkUwCibvjwlDMe/9HFv3zyF+791sIIW0HIV56+HBnE8pgPA5ProY97wHX+R4IdjOR7mDwPrs+bOIfEv7eTfajyTgAhlz50hZULp2oNhJT0fqgb5loLDgtyQfqllwsahMq7eL5NG6JLpRbxHN9Z1L5XRuGc27haYlJGNZh7YpG5cSW8H2Xgqw6A2u/o9b6pr5GqIiw6VfHKp8ZCsAx8hA58+DpeT6t85S+r6ySftwQ+/vDi/7gq12lPOI31mMezM7neVbXwQffrBPgwQHf9Dy/+lYWWgfz+N2/rnBB+QpsRmmpY/gIE/nPM7rbO8s61ODFdnrfLah3p0Iiy8KCM5hst2Jy+5FAgF6Q/KnpvUiGOOz05L293aVKGFY/nNw3mMHaU06ijFbFotcmqgGG965NRjQCIm/NhJwVnezbE3g2fIUxyO4QLHmn+h0k4XzR8/P7Fywq2bgnhJsjboMU8idTVwQfz/g5jPk+T2wDQgpW9r1/8oYXOgPzAm7RPiOP5kn+cCrrOJiGdexPYp5d71jkhIvKELDOE7FcAIVuLvGmU9H60TcgF6c+1dVwCQq63xRCT66FKt68V+Ohh1wwoPR4WPWZri5qMKen9wCRM+yCkcxWvFgIgWc9HfofrSQaxBSHCTjI/dXt/CL7xfQuGDxZv05ZcRkkjPQdCfLkuWU9IWfhgE+GD5ezrbEf56PgtPLHYhhCWJJBr6MxARch8PWO4FzzsLBx4Qpybbtkkur0FGkx98xrAC9IfbXf0mjKG7WqJ8/Hljh4z5QUpCk5bC+rs3acxo7NeEH0/LVsZq5MVrxoHkBQ++FDkJokzJ3yKTfB+BHqWO/CGX52K6HUJH/984Qfnaxf/JxV6dd0OC3OrL3EryZ5ljGDWMHzklalNvAlrv/fsSwvvyPsDb97REBKHY53qrJpJIXvZ5pU8p9cM9/WXgSckjpcue101bjD1zPthBC9If64rZcjudhFCdNNRNSlVJCfiuKtGFClXXlS3mmzY2jPvRy+AqsSkXmcrXjUKIKqUqfF8WPH6HvCI4/h13obg3k7WNHQp9JTafST4ieqg/QMtgA8WbQ/b8fUjibt2M2tbRK73xxOOVSt8ZL0DYTZ/ohWxxwZC5PE/cYsQuGV2WbIf/OFXTPj3vQshjC09hGxUBCFN7sO+egvgBemPlCFyUvKaanRc1gBcpmnpdpcPWAX5IHsYK0qp014QfQ7dmPN+2umKV40BSAQfjGv44J5KVem/T0lIVZh2K/c0j2OZ94UJfAQaPn7tsA079avP/vBayIK1DHw4SfI0hMgfjuVASKXwkd2//kTtNJdCb8fozWf/aisufAUhchsjT4ggjR2FAyNu+BVzPE/+MDh/TkgEIc8tPYSUTRw9aAJCdKjDuKeHYrygUA6o+mvqpALDQuWE3G/CM6bPu/sl4OO4DyEkchuU56qozXFZ587UfayUkTvq6aWz06QnqSZtstkacXa+4lUjADILfIi0OWBi2E7rZB6KwJt0fhp5Ptj6X3rj11qTkKNzP3KBKYErYb/HBx1izt+eHT6Y10j3JqAL+7jJx9bMqPwlkhPiC2vLz23xdE9n+TlIjEKIYHvfvPTikC2vNli57sXDhiCk714CeEH6AyG3KwB7dT09UEZnHYaZ+k7taSnTH8gYXX3RFVbce7VT5xioz4FrPb5s1PZd7/h1fzLjObTex/LrlQJIDB9utaus54P28DDPnTr/Ps2EXLHM66ciUNWQ1p9vEXz8y2d/ZBR7P/S6Cu4ND3KS5i0Qy/Q/EWkH7zzssPMZuNfbQf8dToAPy4OQhQ/19+jus3/tclv2uYKQ1BPCPN4cH4iwDIzZEEJ9TdxNUo/qwT98bjkhhFTyaC2E6FnatZ4fijV4QXoH9lUYGVsEREYVgccN9Z0VGHy3NWz1aSxsaz7IddaeBoh16VrXvSAaLNYnjQt9qHjlU2WNCCV8qFyPW0J1q57g+RCkIpT9PDWnedIqjvT00PDBTCWsyPOx/sY/a9WBkcBxTXDTdVuwQQQhgtiucSPCMPkrzfEIhGmUxxhtTsgS49fXyFA44UV+b4dtbDOvVyDTG0Nk+2aQ8DnV9bY1N5IfePPW0b96+oq8iHk0OyeSPcOTvST0/hakGz3dt0zng0St1q3nnffEe3dVCHFrysDRawgh3dKLQkQUC62+pwbX8rJ4B9R2Hjb8m8OWgc9xH2YH9TVlmn+WNaqG+txQVZfU+aEa/h3OashocFHH+CW5VDXZVEWoWRuP26FqEFpwzFH7ea8kxHihkfXb+0HPcwVaNzp+DqnGvxssmxvUm4pXtQHIw0svDLXnY0Rn731hV0JkQ39C5g8PYsJXCYu1Fj5YvM3JYB0wk23AGTe2K3nNdOU2s/bp85xACCNGb2w0p5DCCsCH3/OR+XcOfBDvyOWvPPvXh9//+j9vTUyigpCvPP1X1+U+SrxwBkQMENpY5wMMFp13fghhzvFgaxK8r5+7+6VdtoTSBtNGSYMp8iZVCSElvB8KqN9a4C59vsB6R14Q3TSyKZmO0G3RdtcNEI8hUmXTuuR6kN/NNLAqYPuG8773aIN4ldUzc967GHZy3JS36aWCkzFRPojOKalKRb0fah3+ZIG78iqbP2dFeUF2u35uKdCQ2/EUS72Mvap4VRuA6B226uutEDpGb+itVGS6g6fVsgx8MOaELIko1n/9v3/jn7YOPr70zEdXT5kYMQc2BgQwqAIHPIQDJbYBnD7yxKhmFqZMgo986GDZSlxicuEA8l0KtlpF59//5uePvvKMghAFxGIoCLox4lXzgsfUfyfgQQ6xuMbKldHsg8G03jIIKTITGc3OLvImpmedHxTc3kMG9eWaup0zG1olkDStjYYheRFSXoz7BcfByFNVRahNCe/H4aINXrnuxwXO+154QfS1v6nvA2rZ6Pn1Uj4H5OGlF5TX45qbu5Ap5SpYEkrl9pgwBq2piBX189B5Ho+sPh+8tfARgxK77DZL9DVQpDkteSVv/eV5Uy+HXWaWzwEfzNn/3FN6lzm5KixbxStenm/jcfj+Nz6vzg8VjnXihS0xreKV/z0GRtKk9GgZPbz04fGSG0x6f5cqJVrJrHoJ78fNRc+gleiMjVyQ/l1T+z0yQPb7HEbiXL9Fj5kJR63C81TU+7HdkvP+uMBHr/WgIlYC66zH3sJKAYTFs2/DvG7epjSqLxE909dDpMnnjyIAieHjUdyAMAq7ait8sBigns+v5MXSyl8ZAGNWSV53v9jeJH+1sNk9H5NL7wrhbxSZXdfo9dYaPd8nIUQQozgDx2Jahay0pC9L9mf6aPuf+AgGU+nurhGEyJvIXgXjURG1xYu13fB2Q+2HkC4bIvu6dPeyHLPbrHhUgJqEKdXPpYT346hFHqoiY2DnK2KRc+ikjxWvKgeQh5c+rAyvsa/Kkg9EQpZfavfUKlkbJNWuHukmg/Lf6x9sMXwoSYBao0Z62nDQaaoonHK83l4hLFN9ijHm7SniKz8bTgi7CifkfYQT4ENkIXL06rM/3lrj+3u1J8RUxxLOfs0rvRuLgocNIenfCZI8z6CqZm3HRSGkhPdjvy2zTfCCQJ5rqqx3cWGG5DLBB9GsvR3yxr9xid8u6v242bJzvogB3icvyFKorAfkstfjwUg5WJE1fq1qVgQ+Tp0O56ck7OrDb/yTVsPHbzw9Hk3qYyImhmPlQQi3mhRmQ7RswBFWHs0Mieb0uAinTDLL6d3CmOUNES1vcvScFY7lz4ERGcjwleuNoUQQDCEfGGEoaQWEFPUCtK0rM7wgEL2m1Bj2BGtR1cEpMk3Tbizp8Spb7atQf5AS3o82NoZcai8IAGQWiahEH/nTedl6gjO3Qtapx/A9tb0iUZ+PF974x62vgawMcZ9ngpYQzjZXdL0dU5oxTgAW4YBIXnPBMAc+8gDFLSJgVTMTUdjZWtuPzaXXXU8IgQzhB5KcY5zztwCAZCGkbEjTWPcemPXmq87DIufiftvc3fCCQD6jVi4qyXmTtdsbciiX833q9VECGouGpEb5IAU+19ncj5x7SJFxGV6QpQGQDGSQ2HmRDb/K5CIIf67EabTEOR8vdgA+WLy+qybsajJIePJjRF7YUzYsLc9bYrrDm27xec0FM1CSASSft8OpYCYYrUrWCV2cACHWueuUNWaeHBD3hOcYR3w3kE1WvkLa1hzhCH3xfpRdL3hB+n1dKbA/z1pWfVBD0aZcv/VliV+f8VgVBbFV3XV+1gmYPnk/yoyB8IIsD4CIVZ9B5n+KO70qmGNgO4a04MNHLFjtyo6Uhvgwm3Ru54Jke5rY3dDDZGFewFAQQrvEZ+HD3Y9Z6PB3PGeeCldZ+BAufMTLezpzjDyeIbeCmKs06IqT5/SjSM5u3HD9N+CNCgylvWkQIl9X5aDXCnz3fluNpZJekMs4+3p9XR3ra0vlhhy2YJWUof1ExX0s+qIy3e2vz3Etb7GeeD/Ieb7PintBRjj1eg8gJNFqUuwK81UhskvKWka2SHJA9j7/zNVxV4xbX36H8HoqpodVhdozcqrLEidw4gBHPsRlQ7QypXdF1uMxCT7CLHyo3+zEhf5vnvlrq3FvED6knCzYhPOW20xt4bOwTvgjDCUTIaTs/pkGIUUrx2y3fPcVXb8dnHlLcW2pvg0KQhbhETnR56cCj81lKBla8BiVzQfZm2ZM69eLzPofd6A8clEvCDzBSwAgsVFmurJxy24jxls2wZc5QEK6nJPZ/mjZ+2dP/43WQ4jt9cjvAZIa9PmVwXywckq/R2ST2GeHG+aFj2zXc6dMssh6rMw6tV1fMfAhDHy43ePdcCue+OsMKFt+EsGS7iv6bL6DoWSi1iuCkDXPzVeNDUUg+HbbQ0X0+h0W+OioZCUdqFtG7pEG/e9i5SowzQIdymBVTQW/SyWZI9xqNlAsMZmg7lm3prynqLF9swO77zYrlvM0hhek/SrbCV0NdGvKGuOEQYTuPZ2adLQ1uGDMir1PDVgTYuSpiLX3D5/+OPvYm59tLa1HHc2lscq53jplpHJ7G9XzansC/Wjvn9i8Dch+CZJaYuleCohxHP1eBvaIQc2ZY2jb8JGtcsUcQPLkfHiWNutfPvPDEXzIrRjmrSrnLlQb+LBhmluvC3JTFotOuNwvYKg2ZjioWUDdLb2OkErTBJG1dftLaqMgYJ3UvP/apKLHcpPNH7bSWm+nnm1XYVC7OidAAfvz+rpbK3gOqe19jcVdsg9buulFzuHjho/NDdXpvOjn1fGc4GV6WS+sL+ey597RVGJ518fCTo13pazHb138kDTu+P2QZ2fa49K6AZktT/MX1L8fifznH1nhRUw+Z0xxtnH1zf+7lRCyd+HjNwZMbA3kasrHaAm4iCAiXhTthc5zQkNG/DonfxsjOGBu721Gep/7D6CbzyAszMmDDyfRnICISVQ/zXhkovcc/vAb+628aF975q+vyjWX8MGG0b7mzNnXLN7fnCWwN9BIxenx4M6xEoKk+rPtx+8tZ7lJCIK6Iz0jbGB2LcfYONGG3yH2GARBdaqUB0QaXkcPL334WBpho9T7oclGG3tcxAEtqfEc/1sZg6Ezg28MauMhcBOG5Wt7Lz/9k6yNEBJqnw/X3h/uwQJltFvOIL2/Aucx3gfxfqLRbWbfMf1vxphTx8l8Jg9AuBP2NhlE8uHDCh17rY0n9oGED+X5kPtkyD2lqhKvEvHeBU5NLO681wOI8oYtkHgJQVDrpcOljvWfAAwIghaqoILv2LaNNEZm7gmIECMvnd2PDbpBsoRswNO/jUFoZqe1eaggZNw+AGGHodXXJDXepzUhzCaPB4lHKPSU43W9RrT8rvuZU8sL5a+S5cv7oB3b7c+xzLa0Tb/7zP88Vp45+c+hG8LGc+CDk1TzPOBQng8ukvArFXq18fi930XyJQRBEARBUJMAcu7uK/tqJpia2oHz6BpzJvQl4Bo65LIi/17REGLClAb6OfO3gRC57O23DEKEm7TtNAfMhC6JLAzk5L84wJEHItnFlzAeekHEqX7llAI+9awLAalWxZG+8vSPqPPC08SJs3wYoRlJzrnLdciVsAoan8hlXcIHql9BEARBEAQ1DSBaKgfgxPJ8kIUCRAIfJE9ikIBI6v1Y4WHqFWHxewI7uKhVEPJTX/uVQ18lrExPEMd7cCr88GEZ+sQrEmZAxIWO1COS9YZMrpBFu6JPSjo/1Tk++vuO23IMvvT0j2r44JlzkNZjM565wEom5552jSzxeJDixYAPCIIgCIKgRQPIubtfVvCxro0z5npDAsuLQeCDAEf8uh9CVrSXZMBTEDEQstciCJGAcWSHYfnK5bIMXJg+H6cOaGSbD9pQYT8XkNCt6d4Q2tDw1CmBHE78rP2+n3jzs60wxH/n6R+L4cMTEca57flgjJ5DaS6NC9DxHrUS0AEfEARBEARBbQAQDSFHMYSwk4CGWdGwKye/w/136hkJPZ6QGERMNaM2QogQ/ND2cugO6CLb28P2WOh/G4+I8Ic9nVp/B5myxdklmOBR8fQXsYCEez0uoUjX9x0WHLZhv/+2hg/X6xF7OlzPG4vOnwROvBXJBIGPxE8E+IAgCIIgCGoTgKQQIhwISY0/E0pFE80t8OB2QnpAIGSFheT50ArraguESOP9NTcMy5cbQv92w6ySR90B/VTwiUBwShLW7bwQ93kPqAgNFML2qOTlo9D3vR2VTF58A77ffPrHVcL5np3XIbLFEAiQuPDBPYtTKhnwAUEQBEEQ1EYASSHEDscKJiyZ17mwc0QouDghWi6E/IMFQ8gn7v/ybTf0KjHkBcvNxXjk9XIQIBB2mFYWJgKv5+PUly/igY5JIVsh6etymno+TB+XhTbg+8LTH1XHey8BDk4hhOm+HzaQUPAIcs9PKzMG8AFBEARBENRmAIkh5EsRhKiZ4zzwiHI5nEZ92VK8YQZC0mpZWQjhEYT81EIhRAi+T6tK0ZAmN+n8NNerkQckQRqiJfhEiEigwVlCTwWs00y53sDyktDPvaOAKYaPo5/92i8fL2o/35HwwWnYFRee0CuncSNnVvnnIAc+yCPgA4IgCIIgqAsAMiuEUPgISMjVwArHsr0eAx56PSGDtNzvQiFEmrl3EsM+p8KVnZhue0Ye5fT+8CWdx0CSQgld8kEnmOI9cap0sSx8xI/s5UXt49tP/4SGjzTMj4JFXOHKF46V9XpwL3wg7AqCIAiCIKhzAGJDCMuHEG5CrVg2Cd3JFcnCiR9C2AI9IZ+6/0u3Q8GOTWWpR8JO7M4knHsTwwOvhyTMKb87LZTKzQV55IR9hZm8EZ1/kgsf/EQ+v78Q+LgQw0cKHtSTluYb2cnoup8HAV63Gabt+QgBHxAEQRAEQV0EkBRChIYQb/jLSVody05aD0juR9ZDEmYT2TntoC72fnVBECJN223Le2BCoCwQ8eeK0NfcjufzNhqc1i/ECyyCO4nvQQQd6rlHSfgV2/+b93+x8Q7gty58bCxXYc+urOacM9w+f/LzjZgbboWwKwiCIAiCoD4AiA0hbjhWtAJDN/k8cMruTg7HyoOQOCfkswuAkGv3f3FfGunHFDrS/hksJzGcZUKyJnlG3JK5eSASztgPJK24lf7Gowg+GHsn9XwoCDmRr91sep9+XsIH52LP8nRwu4qaaS7oloF2zy0KHQP7b8AHBEEQBEFQHwDEhhDjCWGZ/h9ZQ5FZYOHObPsgZOB4QuRnFuIJkUb+dgQfgno0WOIJcWHDdCEPRVq6l3YkP02esyFCOECT2+cjL0zL5JCQ5x5pr4cCj0fE8xF7QtjNn7//meMm9+VvKPjIDbuinhBaRjecCh/OvwEfEARBEARBfQIQG0JsT4jbCyRTMWtCAvosEMIXACE/d/8z+9KoPzTJ6KoMb16Yk3CBRKTdxoUnWd0FCzGpcWDevzOhVvGjTjBPgCPyfqQeEJXbstvkfvzchasxfPA07GpAwq7icrvZHJA8+OBOw0vkfEAQBEEQBPUYQCiE8BkhxAcWXkDhbjf1LIQ0HY4loWHTbfxHQ7LsvBBmd59IPCIs8XwIq8khs8BB5PQYMa+dMqdKVqYPiZ1onnhAzHPRv9nm3z76hcZyP349gg+xl3q/UtgYZCCD5faTsYsbWMnm8HxAEARBEAT1HUAMhAScze0J8cHGgBqXE6pjmXCsz15oDkL+l/ufOZLG/mYGOoSdF2L+tj0daQiWMCAimNWv2+cREdSjQoBD5DRCTMKutNfDBo748e34cf9/O/qFxhoP/nri+cgJ1yMJ5241q0EOfFjvQdgVBEEQBEHQ8gBIBCFf/aIXQoIJEOICyiDjJfFDCH0v5816Qn7+6Bd2JQDcpp3ET63O4oz03LC9ISY8K15Sr4iCCbqEzr/zgcPtOZJCkSnNG4GI8YjI57+jAETwI+X9aB4+fCWbNXRwNtM54+Z+EA8I4AOCIAiCIGiZACQPQgY5npCB53U37MqdAfe9d7CAcCxp+G/I5Sj0hmDxHG+IDR4piGRDtfIX5qmqxRKPx6mwenskHpB3YuiI4OPbIjiRf1/5O2/9/UZCr1TOhzxee+mxY065XZGpfjVgs0CH8XpEfwM+IAiCIAiCFiTehpV4+NyLq6FgB9JAHoY5ZWRDkU2wThrpiZwEbEGb7bmeh8hA3/j4m7+y38Q2/u+rnxzJX7w/YGw4SMKHhNO/gnT21rP93GmqFyOI/+AJz+Gl4JLkkJCSv6c66d1AkEk612ByIl9b/z/+7d9rxFCX8HFdrvGO2RcJgHDbm5XxhiUekjDznNtDBp4PCIIgCIIgAEguhHi7h7vw4X3NhZYshKT/Zhs/+bVmIGTrqU+uyh1+sMLEcIWzxCuT5jAwZiVcazAxr/MMWmRF32WHb7EkoT0JxyIemRQ6mMkBOZHvWf8/m4MP1eNjbJdbZlkPGGc0h4MUHHDhI/V4AD4gCIIgCIIAIHNDCO0qbr9me0FOfeVmfd2/RVoBSoVI/WRDnpC//YFPSQgRtySAjFZUs0UeL8bbYcrM8ox3xPaGTJIgj6EFH2loV1KByym3+3a8nMj3rO/+/v/ViKH+GxI+OIEPA2UpfNDQqzATkhd/LttY0AERwAcEQRAEQRAApBiEuJ6QNJTI/M293hHXe0IhpMlwrJ//i58aKk+INLBXz0jj+Yx8LgURt+SsH0Lcgyc8//bBh/F8mITzBDzk398Oo5yPY/meK7/07242BB8fk/DBxmmCud10ckAqXg08HcwHgA8IgiAIgiAASNUQ4mukl/WE8DkgJLCbAi4AQpQ2v+fTOxI6rp+VRvTZCESMR4TpnIc0F2TAU+9HoBHD/O3CRyZp3XRfFyTcijGSbB6w/xpGSee35esbv/r13UYSzpXnQ8LGmObCDJwQrAguov0RenI+8sOtBujzAUEQBEEQBAApAyHeDt8ip9u3cDwjucnqvvCtZiHkE+//9GUJHHsSQIaPaRAZaBA5I4/OCik/OyA5IW44Vhp2xQl4pJ6PpLyuCbkK40cFHv8lrnS1/dmv7zbW5Vx5PuS2TIAPmoAeeqtdpSFaITwfEARBEJS1pUbnvvrFY+wJCABSAkJ8SelhbvUrT/6IMklzKmadimBhEPLT77s2lMb0ngSOy++KICSM4OOMkyNihWhxOxzLQIhwwq7SPh9JcnnS3+M/y23+z2GgjPMrv/r13cYGKB98WCFYufAROq/5vB9Jrw/ABwRBELTM8DGUDw/koqIatiWI7GOvQACQiiFkcp6Ik7TuLekbQ0jkLYg8I80lpicg8v5r16VxvfMuCSDKG/JY5AWJF2Wcn3ES1gc8exDjBHNSZjcCDpb09/gvYcD+k1z+X7nI53b/8R/sbDa5jW7Y1cDJ+ZgGHwOrC3rG4wHPBwRBEATF9tOBfFjTALIhAeQ29goEAKkFQlgablUYQkxietBoiV6jH39yUxrnbO+MBpA/JWHkXYFgCkpUeNYKi/NBVpKStKknxK5yxZLGggo2/iQcsP9PPqpEcx2utfFP/3Cn0W1L4YM5YVQ2fAw8JXUzfye9QkL3EfABQRAELTt83JAPW3I5lssV1fgZewUCgFQAIRQ4kiRrT7iVt5QvCbtynz8lOSTvxP/e+Omv/XKjhvqPvnfzunzYYcw0JWSR1+OshpAoT0Q+96ciQz2tkvVfI69GvB++E+d2RKFWJiQrOeCc7f6TBXs+0p4e/ryOifCReR/gA4IgCIKMvaRtCOP5OMFegQAglUIIm+jtyCaqB7lVs1wIeSSCJGxJPm78bMMQ8mPv3TwQses0PlCcecvvKvlaEgr9H+F8nsezIef/0R/sNDYg+TwfaVldQfp+hDaMMPdvHWbFw2xCOuADgiAIgiAIAFILhFz6yKoEBQkhbDgpIT2/ZG/gBZRTWpqXma7gMYS8LWFEgsjGp+//UmMQ8tEnNy9LeLglhA0Y3Hf0RD6IEPAwy+Y//IOdRqtdyXUYD3LgI2k0mAMftLcH7fvhPH8SAD5aO2kgH4b6zxOEAUAtOjdH8mFk/pbn5iH2CgRBEABkIoRIY/vglIRjUQ+Iz8vhzQPJlO6NQeSR5QGJQ7EUhLzN+MbP3f/FxiDk6pPXRZLXIfyAkXtguekZksJHEPcSeeIfNFTx6nPK88HEmOZ5ZMOu8j0fmcaCHvgYoNqVMabG1JiqQIdFDDJt1F1jsfduNedt6lip7365DJDo3xoX/Lj63aMi5Sn1vr7dZFiD/M3r8vd2K/y+taJGt/7sWsWbeOyr0EN/S75+o+Q2D/X58tKE9T/W5+adsgm7Kga/7DrPcN7vV11iVX//Wh0Vk+Y5njqHofBYVPZ79X5YbTJx20zYTNtesg1VyXseLXCMrey61993WT48r+9JdOJBraMax1/TY/pR267Leb63hrH5uM7KaStdNLbO3f3SkYSQdWl8HvB0dtUhKqHN79gYZxkDPkxeN++Ol9RYpv02olcE3/u7T/0s+1tvfaYRCDnD2eEpE2sRQHHmgIjbASRWkPV4JB4HBQK//O9uNgofbjd3PmPOh+v5AHxM59UajMLDOQZJ9dtbM67Dql6uy8+p83Gz4E1+pH+zzOCutnF7TgPnqoas8w0ZJSqWW+WFVem53NOPTxT47FrZ/Z5zru1P+a0bBfefOU/GM55T6n1j+TllmNwsYQBtye94j/z8RsX7ip73hxqaqv7+PbnurAbjY57juVVkLJrluMz4vWo/3JL74UoTEKLPU1W16uYM21vH9XfcojG2iut+qMdNNVYPJ9yLkt+TnznS1/x+i67Leb636rE5b1xeXgBJIeSF9SC6YMUwogzhmt4hNcMdQGHk9YBASBY8qLEvn93b+sAn2Pbv/ULtEKKSzeM8FxYnl6tO5lw3GhSCtCIUU8AjfWwaPmjoldvnYxb4SD0fAvAxm070rE7pmY8CBjJdB3V93NEzYCfkhrCqB8mrZCZK3eTVDb5MsqSZyZrnBmce1+Tvb89paK6q7ZafqbWYg565u17xd471fo/+XeBmezyDgTQkN/dZjs1RTftPbeuOY4DQc/PYgWi1zsZDMtRGyUv63CyyjmNtyG90cCypC0K6uB+OGmjmd2uCoTzpWqxivWYZO5seY8uOm3vO/jwy1z3ZDnW9v0cul/WYuKqP91U9MdZl+6IKaK91+1e6PCqcu/tlAiFTLlweakAJPC/G3pAg+lcKIMw8CpGAiHam7P2tD3yS/d3f+/u1Dsyq6lUcgqWM7rikLhciDhnj6ToyRkKtdGneuJt6Gvak/j7TAIAo+OCu5yPp2zG91C7CrsoPGHLQXG9okB/qGbtVchPbzDNYNFwc6uWGNvj29MB/WRv1RctFbs4bpqGN0y0zw1Rgtlp5cN6qy0DT4Rh7NXz1lvPvudZfb+/+lHVf0+dGoWNT0f5T+25MntqWy24e5Op1VMuuno3eY2ko4YF8brPgsY68KXXDao3G98mS948Y6kmS9brCLvW5ulrgoy83ZdQvaIwtsi/dCTF1zW7nAKTZnk3Hi79W8ppfvH3ckB1QRkHXRwYFIdK2XVeJyHRGnRqzg0x+QZh5jScGsXwUcT9xbh4JhBi/QyjY3s99z6fGdW7bY1ysPabL7p5lcV+Qs7oZ4RntUTBLbNSzqD/IGf0+86g+p3qJqMcbT31yta71dXM+kn1sJZ1Pg49QdzMHfLRZHvhQA/kT8wzW6mYmlyeIMTvSg/5qI2NHvK7nye+P9czZPNqpY331/t1j88+IzmIQjMhTI/1c385PCh/K8DivDLVZDUhlrOgb+AYxQvdK7KvrHd7Pe01dky2WKWtbx7k6ZsXzLNpuBFcxxs573Rv4ONLX/cYs3it9P1LX/BUWT6aVveahvgNIBkLYBAjhImPoJu8TGkQMcJBH829OICTqrSFPzk++/9N1zFCy7Q984vK7IngI2RmnK3oMF6Qzun5cMbBClsc0eDymv0uCzFqd8DGr5yOT48Ec2OBuDxDAR9uMEgIfKjGu8OygnhFzDb1hI2NHvM6bLA1jmPd6NrOjVa/vDis2IzpNW8QoP3ae6wt8XCcGnTFCjgqeH8aAOqkAOLtqzAybnBhoscb63KryXK0NbFoEIWXH2Fn35Q657pXHbr3Ida+9fessDT/aqxOaACC9gRCxLg3Xk0ECF6EFGgMPmJiFO0uShC6c14Sw0r9PGR9//H3XK7+gHgvCawYc3pV4MsLEC3JWg8lKBCIs8XSc1f8+G7Dks6qL+ruS18NrdcAHDbsaJMDn93y4ADhwe37wrFckAHy0zcAzA/JhFS51beht6z/rCj2adIM0vz0sYCSOqlxfx4Cu8ritsdT7sU22eWSqYvXg3KQG3Yk2Qk5Knh9qzLlSAjhvE4DZ69i+3ncgZMiWW5V5PPW+LJL30VUIKTPGTtuXNFdOhSFfKXPdk2ueXrcj3P0BIBMg5JUYQuK+EKkhTEOvuAsfIQEOFzTCjBckMJ4QIRIIkcv46pPVQcju+Z+5fDYKvwozHo10YYln5DEScnWGhGy5n9Gvj/7e+Z+5UcV6/vqFq0MJH7dM2NWAEeCY6Pmg4OHABgm7GsDz0UYDL0rMJQbelQpvUuq8PNR/Xm7SUNMAZG42L834sSMyS3a5itKYHgN6v8LNTLwfanv1Nh87r3XeQCT/vlJVzL6Ofd8mwDnPTPhbznVyq0PehJep4bjEEEKvw6r2wR6ZENjt+w4sOMbOek+yJh0qWt9jZ+Jhh0EAkOkQwhIIyeaChFbTO+48BiLrCVHPudASmLwQIQyejH/8yc3SEPKZCz89lJCwd1YnjZ+18jmYBRePae+G8Xw8xkVmScCDhQmgnGFi61fO/1SpG6CCD/mTB3I/XHarXSXVt7x9PnIaDHrCruD5aKWukxm7zRqSMjc8BnNTOiQG5iw6cWbJtspAE8mrSQxouXyjopu0Wi+zbtvkpZv6ca3rXhBnG/erTnzXgGyA7do8Rqhelw3HkO8EhOjtNgb46pJCyMsEEoznosy5qvYp9SJvLsl+nHeMnfWeZL5vo8p7kr5ud8kk0xqDACATT5p7rxwFxBPi5oQMvM3uHOjQr3OSO2K/bsNL1KODsfGPvnfz1o+8928WGpx/ScKH/L6DFSaGBBbSvA9mJ5bT3A7jLUk8IEGYwEriGWGh/jvyBB3sXfh4oRvg51L4WPXBR361q9BpQhiScK0snMDz0UqZEL6jOqqD6FmnfWIUjxrctreIkVVklkzpVol1vuXAXZUGtOX9IM/vU4DqybkZ7b+afoN6Ay7PeW7veyCkE4a8DrOkEHKLLZk0JBySsanQjDiptsQ00F5Zot049xg7g64SkLtd0zV/4vwWBADJ1+P3XtUQEmbCsbJ5IKEnIZqAhvCBRxhVnBrw9LX4/1zdlA4khMx1gX3mwk9Lo0XCB2erKq9jRVe0ipLLmZuAHueAPObAiBVypT9jKmatkET16PtYOJSPB//owt+Yaz0/d2Ec3Th98DGY4PkY5OzbwBN2pd8P+GiZdJytMZhu1vhTdIZ+3AHD5JAYvIVmR7UxY2bXbtfQ9dx898vOup+wHnhBtCFvgGC/rnKpTtja1YKf3+0whByRc2WPLZ+ukON/fd7kZD05QceHK3Wdq0tyT1Lj1cg3tlV43qvjY8AGyegAkHkghK0PIggJM1WWuMcozuYohE552FD32BCRgR3112CxUa++k9D9wY++d/PGLOu5c/5nLstP3g/0rAD1JhgYOePL83D+/RiplrWSDbuKgUmBUwIiEYTc/7UL45nimT934epYQsEDuV4aPsQcfT6y+zj2fDjHJX4N8NFOUVitrS+A9iqYY/98g9v3bv14UmCdd8k+WZ3HOHMTKJkdhlaFaM6OD2x2Wfe9IPTcvFPzb5njvFbw/Fawuk/vFR0KaaLVgcbLBiHaGKUei3lLFFMv50bHG901Osbm6KUm7klkTBkiDAsAMheE8AhCTDhW6O0PkuYhhFlvCbc/s8KV9yOMDPyz7FQb+qH2WITmp4cScbZ+7MnNBx99cvP6Tzy5OXLX7X/9wCcu/52nfvbgVPBbQqj3m77mpj97bMxbXhDGkupXmQRz4/UwPUK0R2KFeICidYzW3cBMtN47v3HhY/dvXfjYODNaXvjYUD3/+QsfeyDXZU+Cx3CQdDVnVs5H4M35cMvpuvDh9v9QsMgAH+2UgYGjBmbtDssYeQW1RiCgiDYc42w8A3zQil8nrOIYZv39Zrtu+r7b4wXpYrnVNc+5U5deI/u3KIR0MqRJnysuhNxgSyQNDXOXDXeaDe4vaYf5smNs3sTDYZ33JCe0CwACAJkXQgSBEOEJDbKN5ti7EVpG+0pURUs/aiN+xYRDKRjhaVhWIhG5B1V4xYPxk9cf/OT7rh184v2fPvi57/mUUOAhl7VT+aLqcn6qFpF2IDEd2QMCEzQfZIUsxtORrC9PX7PhI/v3mbik76r8zN4XLvyE+BcXPnqgli9c+Oh9uZ1/LKFjT742WjHbRwFtCnwMPBWvsvCRPGrPx6uAj3ZqVPHNY5LeIjfuUd0/pn9j1ZntKmKcbbAZe0Z4mg3WMSN6jcDNpLCufc9nuqT36MfjBuD4yHNNFNEm62BIk+c831q2Zm0aHihA7kwZX9T+GZMJnA22ZKpijF3wPenYGWugklpZlg1VM+rfuvjB9SCqMhMOB8pc5nEhq0HSWDCe2Q91UvnAgEj0niAy6kMhotcVAAj5WmhIgUXd0eVz8XdyHkiY4KZhoYYJPpKwMVJ/v6PpTxn078j3GW8C5zzOOeHGF5JCCDOvqe/kSQnghCRNfxJaEjftRp71+JheJ4FIf0dwQ/jphglGgEptRbQqTsPBKfARTPR8CFS76haAfKOB3zp2fve45t+jxl9hV74CCHmjVcaFCbVQSennc4xi2mxwt+oESn3DN0bPxLwIFfYm37+v369mtbdn6R7cwnOz9nXW+6o0gKjjIb9HeRMO9Hmg9jvrgnGqz3Oz7sYLwJZpVl8dJz3BYI7dW77cLU9p7SqTzp8v6YHab/A6r2SMzbnu/6She9KIVVvBq07gK3NeHDdxLS8NgFAIYRpCYvOZRbgRSmAYiFCbxKHOGFEz/oEGkng5jZ6LAUABR6g5QRgoEPETb2tjPlQQog189bqCkne0cR8b4dqgj4z5IO5LwmOKGSjgSCAkXttQPhcIDQsJcmgI4RooGLObLvJsFbA0md58Ll4EZQ392wagom/Xv8HJOnENPfPDhwB8VC81kypKfH5bl91cppm5PZa61XfL3pAVSCgDnsX5FCN9473i/CZtNlhXGU6azzFL0YBtsk7qsxu4nGo3Yg2E3NfnSq4h22IIuW8MTPn30ZLlNajtf6AhTHk8D+n2e5oNXqnY4F9j5UKCDpuA9qrHWGju8b/IeVE7gATLdkSUkWtK9A5IY0IrPImnj4HJmTB5HyTfQoVcndWvndH/PsvT95qQLWPKq3+pcCvl8Xgkn3ikYEQvcRhWHIqlXlMtEEMdjsWIwR97H1gc+sTTEsGZLuSezu/uYkLLBsysr0i2ZYUs8d8i2S6TnL9i9h8PnTyPWeEDfT6ghYKHShY/IEb3EbMrcJUxzm6QWT6rSaEzI3rMaijD6fF+HM+wzsfkpjNG59/mIITZ/WR2uhLS5ORDKB10NIeozLFbd7af5oPQZoNVl9Y248dhiaXWcMU6x9gFqitVy8qcF43YY0vlAaEQYjwh0ggexuZwyASXprJIvR/qUSWYM/m8UN4RHV4lNBEIIZ/nIvJwhJHHQ7DT6PNxKBYTgYYPHj+nQ7QUXCjYiD0ZMUwEYcCCINShVizutq69KwGP/R0m5Cm0ckT0+1kaqhU43g9f6JWBEE5ggCeoxJJ/pWFe1NvCrd9Mf9sttxs6pXYBHw1I7csys+nHU75bGRdPNbAdq87vTtPVORKC361n49zfWK84f2BD/4YyQFScvBnYrWaDNeUs0NmveW74XfWCHHmOaW1G1Zzn5kyGfFdDmtQ66pA0k8+kjPD1ZfGE6GO3qScVjMdj3Wk2eLsmr9bLDXqs2zjGNnlPMtv+VkfOy/W2r+NSAogLIYyHQwULBkKYSB8Z+TsGjRREQp5ChWDmubgtoQrFUjkiBlKY9miYnBEVivWIxy6oR0Inc8vnTHWpJAWEx2FRBkIYgRBGAICZzyUQosFGv9/1fqShWXYJ3DQGSyTJ8LrTu2YPzkxWCA3Din8/xwuS+R3AR52zMzXMslE4WW3CyCM3lJMZb1jjEttUy01ch9dcIUblLf17tZbhLOL9IOt8rEFJ3Wy7lAti8pJUmcxRzeu8OiOwFzFkrxBA7UxIk4aQkYbWablPfYSQXbm9T+nrbk3P+q8RI7kP4YytG2Obuic53mDYLBUpWOaNN+FYqjrWgNOQJJGEJJkwI9pDI+mvYcKvWBqetZJUxwqdsrgxZDADKoxFFa9oGJZa3haxd0S9dqorY6n30nAsAyGJB8SCAWZ1b08SzRmzvCNWWWFS5cuEYJ0h4VfWcyRkK+2TEpJ+KU4ImAc+0OG8szIzP6MGwnPMzXtWmDpi84UbqJl+5X14os4ZRG080iaFTZThpIZCkeZcnWoE6TEK1mr+recJHB9VfL4cso6GNOnryJzTI9at/iZVyKpqZs4RVnFp7QVfY20bY5u6J10GgFSvlWXfAcYTIg3qA8aDYezRiD0XyvsQJ5jHno8VxyvCEq+ISg4XUfjWGe0NiSpgRd4L4zHRrKc8GdrJEOV5yHcrCBlwppPc4xyR2NFgksS5XgcFEDQxnSaop96QgDEnUZyRTu4s033cdHXnJDldaC+H+YUw86upaAgWz+lwDvjohVROwxYxTGu5qTjdbV+b9eY/zfOj4+pNJZZ3V111aoJhtq9nR5Nmg3VVOtIGnymje1jEG6Y+Q7wg1+S/d9tuQOl1PtGQd5XVlEDpdFw/rPF8YayDIU26MpQZH1bJuhc5fyoPr6kjfI5su/F43mf9bDbYxjG2kXuSHlPM2H08wyTIaoXjQ23n7KK11B4QCiHKEyIh5OQM6asReQVo8rnpIk6aEa7QpHPTDNAkc9PneNpTJCDpFKH2hqhHBS10Ca3eIGn+iTcxfeIibAjhvmT1NHHeNFk0ywpJUqfejxXHA2KFegE+eid9Iz12BuQ6B3tzg6nMsCPfd73Jjra6ypW6IVVdhtPVdWL8vKa2schCwG9IwKkLgKy0VuNs6GWyf+/UeL6oc3WXHINbXfEmaLg+IsZT0f4mxx4DrEpj7riGbT8m1/duU5McLTr2jY6xzj3pWh3XiN4Gc97cnASgLPUAVZmTMm84MgCksxDCw5OkW7jVgZxCCKkYxdIO5GeNwc7TJoXR+0w4l5WIzRKIML6LCEToIuJQrLgiFncghFkQYv2b+zwg9qOvYpbp8n6Gn6aAZVXJosspgZE0bC2qiKWrYiHno5cy4TmjOjog68F+rP+so0Y9baDWtFGnDJMrdeUnON4PJTUzeFBwoUns1zpi/NLQsb2a9m9SvazuBHENreY3FFB1KaSJdku/XLDJ4mtkrKkKKGsLnyPH7VBf55tsOdX0GHuTgPpWDdf83hzX/KGZBKlwNdac7waALAuErPDs4xkLPgxwmFK1aXfxFEhE6k3gTi8OkxfCUtBIFgMmxkvCUgihVakmeT9c6Aisfh2+ZoWmy/tpCiI8Bot0EUn53Wi/cAMe2V4jBj4CwEefZrjojFNls5POYO8alFWtP/VADOswVCf9do0FApSo96NKdcIL4pQRXquhlC3tWr/d0DZtMLvj9kFNx7iO64xCyLgAhNx2YLrs+DIikxu3a97+pfJ8LHKM1dXFzD2paq/LDiNllGd4/x0CzeMKztkx+f07fTtXACAeCBkQCDnDUtA4Q+BjJfEYCOLtiD0Cbn+QM1b/EGO0iyjvw4RIGQmW9gyJHgl8mH9Tcc/fAVl0B3YLSLI5InbI1IqVWJ71gNiej5AAhxuOZTwfDPDRvxmu5OZS4QwXrZlfW/UlDQEmvOWybgrYaXlyP3gVC5l164oXRBkJtJ/GakX7V50jl8n+3W94m2hI006HDFE6G66MqatzfP6YgMK4gmNJ99tNBtV57JseY2lO3a0qrnsNzAYi9meBSj0umPN9q8yYqT9rwPukCyW5ASAVQsgZ4wnhFEJIfgSnj2koFq1+dZbmg5CwrgFpfEg7ihsIYQRC7IXbbyLgEYEG93tBaFleF1JohSyaam6X76WwETq5H3YVLNfzce7eq4CP/t5cTKJpKeNUD/bUwLtR8zZQo26rB83Txqye2fltApvjDhm9Zp1LV5HSs5DGeK07hydvm6g3YdShseJIr/tJwXWns86FJzv0MbxMjEnck+o/9o2NsfqetOlc9+OC58rQgY95i4ZsknO9zGTBvN4XAEifIMSEY51Jks5JeV7uAocLJGlX9LPkfSanJDXsmeUJSSBEE0eCA+bfguVUoWKkyhW3ltQLYv5FvSAiAy3ptzKnoWAKG26ndbfxIBLOl+Lmsk8g5EER17cKi5DLfWZ3ym3KwDOzs42GYtWkUpWvptzYD53faPu5eduBkPtFZmCJIbJH4GN9EYmgBEKOOzhWGAgp8tljYnytFgFKnauWxPH31ZhrqRobY3Uoluudn+t80dBC70eH8567TiK+8tzNlQejx51bZB1u99H7AQCZAUIGBELOkORyO/dDh145YVoUQs6Q/JCkypYJxUqqVLkQoOGD/CXoo7DflZ8LQkOwUigJnNe4/hbhdBmxGxzS/iKpl4TbMIKwq+WAEDXY7zqzTnuzJIxq8LihB/tVOtg3ZeBpw8jM8K/K9dnp4nFw4oTrCC0x3zmqIa+irmO7z+zwnx1tjKzNsD+HHkPkWJ+bRwvcJuN9OengWFG4GZ82LOlkx/1Zxhl1DOXygJEwFhYnhy9Fc8QWHffGxlh93dNrZE2fL2q5oav8Dck5otZJhYjt6HPFhAGrz6sw4KL3I1oJTnneHujfH04Zd9Q98QFLvXV9aWLp1QoukekQEnVM5+EBE8FQPuoO5UHkphBR/4/4kScd0FnaAT15Txgnkev3cfn6KYu7irslczMQYtqO60dhHvUf2bArkc354GkPEeMlUf8LuPGJpGuSFvk1/dDj7xCEeLjNP/S3NXwg7GpJbjCbctB8jaUJumM966OO/x09gJ4QSFEGxPPMrhKiXr9Zd9hVnnEj1/UlvT4qgfG1DiaQGgPruI51V98p98uxvjFvsZp6bNRhjOjzcE+fd+oYr+ltUfvpLWZ7FNTrT+lHaiio7d1sg+Gqu6WrGdlOJKN7jgdjBWbCdX8RNc7seMYZtXyDvP15fbzp/lGTGxt15ZUt8tqX+6CKyk/rdRXIaHqM1eOV2hbl9bxG7jurZqzU5+EkDSfs26n7So8V5zVwmeIgW/o7D/U5+yf67e8m4xPVroagQuOO/B1Rwe5UHvX1uo4VAKQAhMSNClkEGqF+jEOjAhaS1wwwRBWteNxKUAiNFtw0/HO9ECypjsUT+vArBQ2RCx8phMQrFDi/xRPgUO8K9TekxMP137TUL7PWK81ckf9C2NVyQsikAX+STrQhuL1gw+CKnnUybvvDrsySOt6POiszbWvDMfKCdCUkQM/Antf7aUvvqxGbrarXbQ3Gh23bJt3w7qCDY8W+9lxsFfysaTw3nnGcOdLHcJ9Bi1SjY6z+bjWhpbwOypvw0oz3pKrXQ03Qvazvi2My0bHWtXEHANISCBGRJ0REXdBF4hHRSeOJl4Iz854YSnRndAMIIs6ZCLVvIQEGzqykdJ63Qvp3MuFWwnyH7zsNMnArJ8TAh7CeE5lHn9eDPAP4WKw29eC+EMPZM+A/Twb8IQEO0zjqjp5dKbO+NLb8qMy6y3U+Twz5afuxyX2tDKfDWfZBnTcsbfwdk+PYyLGZYftnXn/1XToe3JyfI2YnRR/qbTPnZlkoNtt/XMPxONTnbB3gXtWxy1v3G3rCoug4o66/TR1Op5b3OMfReERulzyGte6HkufLeg3HvE1jbCXXvf7t24yUXdYAPKphX02aBFEevE19vqox6Clme+he08f9dsl7YmX7bY6xvrA47Lb5JCFk9ZTxg3ckhLwjDfe3hVzkboweo38P5BIw+Tr7tv77O9Gjel3+Wz4+kn8/ivAj7nguklAo0iTQJKonXcvNcyztJaJfW4ke7fet6L9Xovcz3elc6B4fpmngKUkqjwr9Jo9pFxK3/lYMJI5fBvABQRAEQRAEzSQkoc8pUx3rTJSYnla5Omv6fJAeIGd52lGdVsxaoaV4SSJ60k+De0KquLB6hrgJ6244FktyPWgCOUtCsMynuBO45Qu2yjIrzQVBtSsIgiAIgiAIAFKrzhEIOUvK7j7G7UpYZ3no9AVJ+4CsOFWxTDletdD+IHY4Vtqjg2nIMGFXLpSkB1Y4ZXf1wu1P8AxkMNIVxAWSpF5WVBoS8AFBEARBEAQBQBqEkNS7EXs9zpryuwmEkG7oFELM57jtFUkWLkgiuSDNAv1Vr5jjxzClcu2FWRkgKabY/57uCWGADwiCIAiCIAgA0jyEsMQTEsEHTwEjaULohF+ZPiErjDQnTLqMxyFYAxKWRQOk4m7mwgmaot07RBJ2lTYZFBacTKqsNUnCgg8O+IAgCIIgCIIAIM1DyKtRs8LIE6JDsM7y1ANiOqSvWI0M04aGKzpvJMkF0YnmA9JpfMDtMCzb85ENz+JeQGEphHCKE1kgSd6TNBixvCHa84E+HxAEQRAEQRAAZIEQwtbPMnFyloZbJQnqHq+I6aZuPCQsTP5OwcOEYdHu48zqOp4mqAurapWbxcG94VgiG2CVV/s3fg7wAUEQBEEQBAFA2gEhrxwFXKyf0RDymE5KT4EjhhADJCZkK/Z+GA9ISBYnH4RRGGFRmFbggERAQq4yzxsYiTLWQ73WToldAh6C/FfrRL4O+IAgCIIgCIIAIK2BkLsxhChPyGMkHCspzWsqZpnneOr1SJfQn4yuw7AGzAaPwM35oIuV/5Hv/YjhI5t6TpwhkedDbR+OMgRBEARBEAQAaRmEDLgu0asrYikYeZde0hK9Ii3Zq70fZ2hpXisnxIURAh6cJqAzKwk9cMOyOLMaC9qeD+F0Nk87nAM+IAiCIAiCoKqETug16eGlF1YfseDgbREMvy0G7NsSH9Tjd0TcKf2R4FE3dLWobuih5augB4gnByrwleWlSevaSxJ1QSfd0O1O6qH2orA0t4SrkKy0A3qQrEV4wiP4+BLgA4IgCIIgCAKAtF3fvPSR1VPGDyR0DL8TAUiQQEgMH5y9I587Naa/oEVyeXKEuO4+njYUNPBhwrJY0jNkQJoaWqFc3K6slYRz8VB7SWwAYbrDOeADgiAIgiAIAoB0DkKCAwkfEYR8JwKQIPKCKPgwHpBTggDMgRB6kEzYVaD/bUKv0vK9MWisEM9IoLwe3LwW6s+F0We4fj2FkOgR8AFBEARBEAQBQLoLIS/GnhAWh2O9LcHDhGJRD8hp4gXhUZ0q4/kwhyqtcGXDh+UJYSb8KvVy0OpZA6fMr4EOAiFRzsd33/0i4AOCIAiCIAgCgHQWQp6TECJUOJbxhMRekLcliCjwMF6QU083D4Mh3FloTojJ63AbGdI+IgMCIfFnY+gYpCFYgA8IgiAIgiAIANI7CGHB8G3tCXmHBRGMGPg4FYGVjO62CkwAhJNcEKYTykmp3hULNOzcj4CbUKwYQgITdsXF+rmvIuwKgiAIgiAIAoD0DkLelhCiwrDeEZy9zeLHUxZoDwgjGRny30IfKg0YFESSqlg8rWxlV73KJp2nFbASCIHnA4IgCIIgCAKALAeExHkg7+iSvKYSlskJMZ07QmY1BowUJ6STkrzk0YYPRuAj4xGR8CEAHxAEQRAEQRAAZFkgxIRiPRJxad6kIK6g7QE5SUfXAMKZ1XyQ9gahkJEknlvPRzByIgFm/dxXAR8QBEEQBEEQAGRpIOQdDSGZviAEPkJ9uAQ5aKYhISf/DjhpMJgDHzr/A2FXEARBEARBEABk6SDk0ourEjQiT0gcisUjT0jIjNcjho+QYIdw4IMxlng+0i7p2TK8gA8IgiAIgiAIAAJFnpBQsARCHrHUC6IS0ENSmpexuCRvQA4e5zaQDJLHMIKSNBQrhg/52fVzgA8IgiAIgiAIALLcEKLCsR4xPnyHlOUNExCRC2kIQsOwTB4IbVAYZPp/hOoR8AFBEARBEAQBQCANITocywchk3qCMJYmoqcled0SvOEJR9gVBEEQBEEQBACBLAjR4ViPWDB8pBsTmhwQXyUs6v1w+4FQ+JCP6+fuoskgBEEQBEEQBACBHD2MwrFiCIm7o6fwEZJD5oZfcVIBi6ceEMAHBEEQBEEQBACBZoOQUw0hkRdEcH8YFheefiAxfPCoySDgA4IgCIIgCAKAQNMg5NJHopwQCSBDKxdEgggnRy7QgVlBkgcCzwcEQRAEQRAEAIFKQogvGZ3mf/A0/EpXuwJ8QBAEQRAEQQAQqBCEsIOQQIg5dCmAJE0Io7Crc3e/DPiAIAiCIAiCACBQMX1TQgjTEJI2JOQOgIio1C7gA4IgCIIgCAKAQBVAyAsRhAgCIcT7ccIAHxAEQRAEQRAABKpSDxMIYcP0IAoNH68APiAIgiAIgiAACFQ1hHw4ghCmICR2hZw/dw/wAUEQBEEQBLVfAXZB96Q8HVyIdbkccyY2AB8QBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQtCj9/wIMAIJ/jiTWFM85AAAAAElFTkSuQmCC";

const ScribbleDecoration = ({ color, style }) => (
  <svg width="120" height="20" viewBox="0 0 120 20" fill="none" style={style}>
    <path
      d="M2 10C20 2 40 18 60 10C80 2 100 18 118 10"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.5 }}
    />
  </svg>
);

const ProgressBar = ({ current, total }) => (
  <div style={{ display: "flex", gap: "6px", marginBottom: "32px" }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          flex: 1,
          height: "6px",
          borderRadius: "3px",
          background: i <= current ? COLORS.coral : COLORS.lightGray,
          transition: "background 0.4s ease",
        }}
      />
    ))}
  </div>
);

const GaugeChart = ({ score, maxScore, color }) => {
  const percentage = (score / maxScore) * 100;
  const radius = 80;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: "relative", width: "200px", height: "120px", margin: "0 auto 16px" }}>
      <svg width="200" height="120" viewBox="0 0 200 120">
        <path
          d="M 10 110 A 80 80 0 0 1 190 110"
          fill="none"
          stroke={COLORS.lightGray}
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 10 110 A 80 80 0 0 1 190 110"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "36px", color: COLORS.dark }}>
          {score}
        </div>
        <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: COLORS.warmGray }}>
          sur {maxScore}
        </div>
      </div>
    </div>
  );
};

export default function KaligramDiagnostic() {
  const [stage, setStage] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: "", email: "", company: "", teamSize: "" });
  const [showResults, setShowResults] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const containerRef = useRef(null);

  // Simple analytics tracking
  const trackEvent = (event, data = {}) => {
    try {
      if (window.gtag) window.gtag('event', event, data);
      console.log(`[DIAG] ${event}`, data);
    } catch(e) {}
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Nunito:wght@400;600;700&family=Caveat:wght@500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Report height to parent iframe for auto-resize
  useEffect(() => {
    const reportHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: "diagnostic-resize", height }, "*");
    };
    reportHeight();
    const observer = new MutationObserver(reportHeight);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    window.addEventListener("resize", reportHeight);
    return () => { observer.disconnect(); window.removeEventListener("resize", reportHeight); };
  }, []);

  // Scroll to top when stage changes (especially important in iframe)
  useEffect(() => {
    window.scrollTo(0, 0);
    window.parent.postMessage({ type: "diagnostic-scroll-top" }, "*");
  }, [stage, currentQ]);

  const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const profile = getProfile(totalScore);

  // Track quiz completion when entering results
  useEffect(() => {
    if (stage === "results") {
      trackEvent("quiz_completed", { score: totalScore, profile: profile.id });
    }
  }, [stage]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAnswer = (score) => {
    setSelectedOption(score);
    setAnimating(true);

    setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [currentQ]: score }));
      if (currentQ < questions.length - 1) {
        setCurrentQ((prev) => prev + 1);
        setSelectedOption(null);
        setAnimating(false);
      } else {
        setStage("results");
        setAnimating(false);
      }
    }, 500);
  };

  const handleLeadSubmit = async () => {
    if (!isValidEmail(leadInfo.email)) return;
    setLeadSubmitting(true);
    try {
      // WEBHOOK: Replace this URL with your N8N webhook or Google Apps Script URL
      const WEBHOOK_URL = "https://kaligram.app.n8n.cloud/webhook/diagnostic-lead";
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          ...leadInfo,
          score: totalScore,
          profile: profile.title,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {}); // Silent fail — don't block UX if webhook is down
    } catch(e) {}
    setLeadCaptured(true);
    setLeadSubmitting(false);
    trackEvent("lead_captured", { score: totalScore, profile: profile.id });
  };

  const handleSkipLead = () => {
    trackEvent("lead_skipped", { score: totalScore, profile: profile.id });
  };

  const containerStyle = {
    fontFamily: "'Nunito', sans-serif",
    background: COLORS.cream,
    minHeight: "100vh",
    padding: "0",
    color: COLORS.dark,
  };

  const cardStyle = {
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "40px",
    maxWidth: "640px",
    margin: "0 auto",
    boxShadow: "0 4px 24px rgba(45,42,38,0.06)",
    position: "relative",
    overflow: "hidden",
  };

  // INTRO
  if (stage === "intro") {
    return (
      <div style={containerStyle}>
        <div style={{ padding: "40px 20px", maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <img src={LOGO_SRC} alt="Kaligram" style={{ height: "48px", objectFit: "contain", display: "block", margin: "0 auto" }} />
          </div>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "18px",
                color: COLORS.coral,
                fontWeight: 700,
              }}
            >
              centre de formation numérique depuis 2009
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(28px, 5vw, 42px)",
              textAlign: "center",
              lineHeight: 1.15,
              marginBottom: "8px",
              color: COLORS.dark,
            }}
          >
            Êtes-vous vraiment{" "}
            <span style={{ color: COLORS.coral, position: "relative", display: "inline-block" }}>
              prêt pour l'IA
              <ScribbleDecoration
                color={COLORS.coral}
                style={{ position: "absolute", bottom: "-8px", left: "0", width: "100%" }}
              />
            </span>{" "}
            ?
          </h1>

          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              color: COLORS.warmGray,
              maxWidth: "480px",
              margin: "24px auto 40px",
              lineHeight: 1.6,
            }}
          >
            8 questions. 2 minutes. Un diagnostic concret de votre maturité IA — avec des recommandations
            actionnables, que vous soyez indépendant ou en équipe.
          </p>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => { setStage("quiz"); trackEvent("quiz_started"); }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "18px",
                background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.orange})`,
                color: "#fff",
                border: "none",
                borderRadius: "100px",
                padding: "18px 48px",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(250,112,102,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 32px rgba(250,112,102,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 24px rgba(250,112,102,0.3)";
              }}
            >
              Lancer le diagnostic →
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "32px",
              marginTop: "48px",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "⏱", text: "2 min chrono" },
              { icon: "🎯", text: "Résultat personnalisé" },
              { icon: "🔒", text: "Aucune donnée revendue" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: COLORS.warmGray }}>
                <span style={{ fontSize: "20px" }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // QUIZ
  if (stage === "quiz") {
    const q = questions[currentQ];
    return (
      <div style={containerStyle}>
        <div style={{ padding: "32px 20px" }}>
          <div style={cardStyle}>
            <ProgressBar current={currentQ} total={questions.length} />

            <div
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "15px",
                color: COLORS.purple,
                marginBottom: "8px",
                fontWeight: 700,
              }}
            >
              Question {currentQ + 1} sur {questions.length}
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "32px" }}>
              <span style={{ fontSize: "32px", lineHeight: 1 }}>{q.emoji}</span>
              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: "20px",
                  lineHeight: 1.3,
                  margin: 0,
                  color: COLORS.dark,
                }}
              >
                {q.question}
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {q.options.map((opt, i) => {
                const isSelected = selectedOption === opt.score;
                const optionColors = [COLORS.coral, COLORS.orange, COLORS.purple, COLORS.teal];
                const accentColor = optionColors[i % 4];

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.score)}
                    disabled={animating}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "16px 20px",
                      background: isSelected ? accentColor : "#FFFFFF",
                      color: isSelected ? "#FFFFFF" : COLORS.dark,
                      border: `2px solid ${isSelected ? accentColor : COLORS.lightGray}`,
                      borderRadius: "16px",
                      cursor: animating ? "default" : "pointer",
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "15px",
                      fontWeight: 600,
                      textAlign: "left",
                      transition: "all 0.25s ease",
                      transform: isSelected ? "scale(1.02)" : "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      if (!animating && !isSelected) {
                        e.currentTarget.style.borderColor = accentColor;
                        e.currentTarget.style.background = `${accentColor}10`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = COLORS.lightGray;
                        e.currentTarget.style.background = "#FFFFFF";
                      }
                    }}
                  >
                    <span
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        background: isSelected ? "rgba(255,255,255,0.25)" : `${accentColor}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 800,
                        fontSize: "13px",
                        color: isSelected ? "#FFFFFF" : accentColor,
                        flexShrink: 0,
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS
  return (
    <div style={containerStyle}>
      <div style={{ padding: "32px 20px", maxWidth: "680px", margin: "0 auto" }}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <span style={{ fontSize: "56px" }}>{profile.emoji}</span>
          </div>

          <GaugeChart score={totalScore} maxScore={24} color={profile.color} />

          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: "28px",
              textAlign: "center",
              color: profile.color,
              marginBottom: "4px",
            }}
          >
            {profile.title}
          </h2>
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "20px",
              textAlign: "center",
              color: COLORS.warmGray,
              marginBottom: "24px",
              fontWeight: 700,
            }}
          >
            {profile.subtitle}
          </p>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: COLORS.dark,
              textAlign: "center",
              marginBottom: "32px",
              maxWidth: "520px",
              margin: "0 auto 32px",
            }}
          >
            {profile.description}
          </p>

          <div
            style={{
              background: `${profile.color}08`,
              border: `2px solid ${profile.color}20`,
              borderRadius: "20px",
              padding: "28px",
              marginBottom: "32px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "16px",
                marginBottom: "20px",
                color: COLORS.dark,
              }}
            >
              🎯 Ce qu'on recommande pour votre profil
            </h3>
            {profile.recommendations.map((rec, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  marginBottom: i < profile.recommendations.length - 1 ? "16px" : 0,
                }}
              >
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: profile.color,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 800,
                    fontSize: "13px",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: COLORS.dark }}>{rec}</p>
              </div>
            ))}
          </div>

          {/* LEAD CAPTURE — shown after results, before Calendly */}
          {!leadCaptured ? (
          <div
            style={{
              background: `${profile.color}08`,
              border: `2px solid ${profile.color}20`,
              borderRadius: "20px",
              padding: "28px",
              marginBottom: "32px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "16px",
                marginBottom: "8px",
                color: COLORS.dark,
                textAlign: "center",
              }}
            >
              📩 Recevez votre rapport détaillé par email
            </h3>
            <p style={{ color: COLORS.warmGray, fontSize: "14px", textAlign: "center", marginBottom: "20px" }}>
              Score, profil et recommandations personnalisées — directement dans votre boîte.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
              {[
                { key: "name", placeholder: "Votre prénom", type: "text" },
                { key: "email", placeholder: "Votre email professionnel", type: "email" },
                { key: "company", placeholder: "Votre entreprise", type: "text" },
                { key: "teamSize", placeholder: "Indépendant ou taille d'équipe (ex: solo, 5, 20+)", type: "text" },
              ].map((field) => (
                <input
                  key={field.key}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={leadInfo[field.key]}
                  onChange={(e) => setLeadInfo((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: `2px solid ${COLORS.lightGray}`,
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s",
                    background: "#FFFFFF",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = profile.color)}
                  onBlur={(e) => (e.target.style.borderColor = COLORS.lightGray)}
                />
              ))}
            </div>
            <button
              onClick={handleLeadSubmit}
              disabled={!isValidEmail(leadInfo.email) || leadSubmitting}
              style={{
                width: "100%",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "15px",
                background: !isValidEmail(leadInfo.email) ? COLORS.lightGray : `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.orange})`,
                color: "#fff",
                border: "none",
                borderRadius: "100px",
                padding: "14px",
                cursor: !isValidEmail(leadInfo.email) ? "default" : "pointer",
                boxShadow: !isValidEmail(leadInfo.email) ? "none" : "0 8px 24px rgba(250,112,102,0.3)",
              }}
            >
              {leadSubmitting ? "Envoi..." : "Recevoir mon rapport →"}
            </button>
          </div>
          ) : (
          <div
            style={{
              background: `${COLORS.teal}10`,
              border: `2px solid ${COLORS.teal}30`,
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "32px" }}>✅</span>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "15px", margin: "8px 0 0", color: COLORS.dark }}>
              C'est envoyé ! Vérifiez votre boîte mail.
            </p>
          </div>
          )}

          {/* CALENDLY CTA — embedded inline */}
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.dark}, #3D3A36)`,
              borderRadius: "20px",
              padding: "32px",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: "20px",
                marginBottom: "8px",
              }}
            >
              Envie de transformer ce score ?
            </h3>
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "18px",
                opacity: 0.8,
                marginBottom: "20px",
                fontWeight: 500,
              }}
            >
              {totalScore <= 6
                ? "15 min pour identifier votre premier gain concret avec l'IA. Gratuit, sans engagement."
                : totalScore <= 12
                ? "15 min pour passer du bricolage au process. On regarde ensemble par où commencer."
                : totalScore <= 18
                ? "15 min pour débloquer les 70% de potentiel que vous n'exploitez pas encore."
                : "15 min pour garder votre avance. On identifie les prochains leviers."}
            </p>
            <a
              href="https://calendar.app.google/FtEZRnRGGWCPy1TXA"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("calendly_clicked", { score: totalScore, profile: profile.id })}
              style={{
                display: "inline-block",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "16px",
                background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.orange})`,
                color: "#fff",
                border: "none",
                borderRadius: "100px",
                padding: "16px 40px",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(250,112,102,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 32px rgba(250,112,102,0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 24px rgba(250,112,102,0.4)";
              }}
            >
              Réserver mon diagnostic flash ⚡
            </a>
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: `1px solid ${COLORS.lightGray}`,
            }}
          >
            <img src={LOGO_SRC} alt="Kaligram" style={{ height: "36px", objectFit: "contain", display: "block", margin: "0 auto 12px", }} />
            <p style={{ fontSize: "13px", color: COLORS.warmGray, margin: 0 }}>
              Centre de formation numérique depuis 2009 · Certifié Qualiopi · 91% satisfaction · 96% recommandation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
