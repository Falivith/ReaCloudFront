import { ReaPreview } from './ReaPreview'
import styles from './ReaList.module.css'

export function ReaList() {
    return (
        <div className = { styles.reaContainer }>
            <ReaPreview/>
            <ReaPreview/>
            <ReaPreview/>         
        </div>
    )
}