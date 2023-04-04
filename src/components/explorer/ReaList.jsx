import { ReaPreview } from './ReaPreview';
import styles from './ReaList.module.css';
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
                
                let uint8Array = new Uint8Array(rea.thumb);
                let blob = new Blob([uint8Array], { type: "Buffer" });
                let url = URL.createObjectURL(blob);

                if(rea.thumb){
                    uint8Array = new Uint8Array(rea.thumb.data)
                    blob = new Blob([uint8Array], { type: "Buffer" });
                    url = URL.createObjectURL(blob);
                }
                console.log(rea)

                return <ReaPreview
                    key = {rea.id}
                    title = {rea.title}
                    description = {rea.description}
                    likes = {rea.likes}
                    thumb = {url}
                />
                })
            }
        </div>
    )
}
