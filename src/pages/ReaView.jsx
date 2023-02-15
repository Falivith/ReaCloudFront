import { Header } from '../components/Header';
import { ReaPanel } from '../components/reaview/ReaPanel';
import { Suggestions } from '../components/reaview/Suggestions';

export function ReaView() {
    return(
      <div>
          <Header/>
          <ReaPanel/>
          <Suggestions/>
      </div>
    )
}
