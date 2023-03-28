import { ReaPreview } from './ReaPreview';
import styles from './ReaList.module.css';
import ExampleRea from "/ExampleRea.png";
import ExampleRea2 from "/ExampleRea2.png";
import { getAllReas } from '../../services/reaquerys';
import { useState, useEffect } from 'react';

/*const reas = [
    {
        id: 1,
        title: "WolframAlpha",
        description: "WolframAlpha é um mecanismo de conhecimento computacional que responde dúvidas sobre matemática. Utiliza datasets acomulados de vários anos, e é excelente para o ensino da matemática.",
        likes: 20,
        thumb_url: ExampleRea
    },
    {
        id: 2,
        title: "Atividades de Matemática de Acordo com a BNCC",
        description: "Artigo do Brasil Escola sobre funções, que introduz o assunto para alunos de matemática básica.",
        likes: 10,
        thumb_url: ExampleRea2
    }
  ];*/
  /* Atributos Dinâmicos
    title = {rea.title}
    description = {rea.description}
    likes = {rea.likes}
    thumb = {rea.thumb_url}
*/

export function ReaList() {
    
    const [reas, setReas] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const result = await getAllReas();
          setReas(result);
        }
        fetchData();
      }, []);

    return (
        <div className = { styles.reaContainer }>
            {reas.map(rea => {
                
                const uint8Array = new Uint8Array(rea.thumb);
                const blob = new Blob([uint8Array], { type: "Buffer" });
                const url = URL.createObjectURL(blob);

                return <ReaPreview
                    key = {rea.id}
                    title = {rea.title}
                    description = {rea.description}
                    likes = {rea.likes}
                    thumb = {url}
                />
                })
            }
            {
                console.log(reas)
            }
        </div>
    )
}
