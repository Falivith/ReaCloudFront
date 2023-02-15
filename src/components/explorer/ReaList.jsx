import { ReaPreview } from './ReaPreview';
import styles from './ReaList.module.css';

const reas = [
    {
        id: 1,
        title: "WolframAlpha",
        description: "WolframAlpha é um mecanismo de conhecimento computacional que responde dúvidas sobre matemática. Utiliza datasets acomulados de vários anos, e é excelente para o ensino da matemática.",
        likes: 20,
        thumb_url: "/src/assets/ExampleRea.png"
    },
    {
        id: 2,
        title: "Atividades de Matemática de Acordo com a BNCC",
        description: "Artigo do Brasil Escola sobre funções, que introduz o assunto para alunos de matemática básica.",
        likes: 10,
        thumb_url: "/src/assets/ExampleRea2.png"
    }
  ];

  /* Atributos Dinâmicos
    title = {rea.title}
    description = {rea.description}
    likes = {rea.likes}
    thumb = {rea.thumb_url}
*/

export function ReaList() {
    return (
        <div className = { styles.reaContainer }>
            {reas.map(rea => {
                return <ReaPreview
                    key = {rea.id}
                    title = {rea.title}
                    description = {rea.description}
                    likes = {rea.likes}
                    thumb = {rea.thumb_url}
                />
                })
            }
        </div>
    )
}
