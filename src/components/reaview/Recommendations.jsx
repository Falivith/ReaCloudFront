import styles from "./Recommendations.module.css";
import { ReaCard } from "./ReaCard";

const reapanels = [
  {
    id: 1,
    title: "Tema 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad consequuntur omnis quae sapiente ullam, eius recusandae blanditiis, ut facere magni laboriosam officia iure unde fugiat velit assumenda. Et, beatae libero.",
    subject: "Matemática",
    media_type: "Vídeo",
  },
  {
    id: 2,
    title: "Tema 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad consequuntur omnis quae sapiente ullam, eius recusandae blanditiis, ut facere magni laboriosam officia iure unde fugiat velit assumenda. Et, beatae libero.",
    subject: "Matemática",
    media_type: "Website",
  },
  {
    id: 3,
    title: "Tema 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad consequuntur omnis quae sapiente ullam, eius recusandae blanditiis, ut facere magni laboriosam officia iure unde fugiat velit assumenda. Et, beatae libero.",
    subject: "Matemática",
    media_type: "Software",
  },
];

export function Recommendations() {
  return (
    <div className={styles.externalContainer}>
      <span className={styles.suggLabel}>Você também pode gostar de...</span>
      {reapanels.map((rea) => {
        return (
          <ReaCard
            key={rea.id}
            title={rea.title}
            description={rea.description}
            subject={rea.subject}
            media_type={rea.media_type}
          />
        );
      })}
      <button className={styles.moreRecomendations}>
        Mais recomendações...
      </button>
    </div>
  );
}
