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

const LOGO_SRC = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIlMjNGQTcwNjYiLz48dGV4dCB4PSIxMDAiIHk9IjQyIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5LQUxJR1JBTTwvdGV4dD48L3N2Zz4=";

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
      const WEBHOOK_URL = "https://YOUR-N8N-WEBHOOK-URL-HERE";
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
              href="https://calendly.com/kaligram-info/flash"
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
