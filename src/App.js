import './App.css';
import { Pages } from './Pages';
import Navbar from './components/Navbar';
import WallE from './graphics/walle.png';
import CSSS from './graphics/csss.svg';

function App(props) {
	const { path, element } = props;

	return (
		<>
			<Navbar
				leading={[
					<img src={WallE} height='32' alt='Wall-E' />,
					<h2>Wall-E</h2>
				]}
				trailing={[
					<a href='https://sfucsss.org'>
						<img src={CSSS} height='32' alt='CSSS' />
					</a>
				]}
				path={path}
				paths={Pages}
			/>
			<div class='page'>
				{element}
			</div>
		</>
	);
}

export default App;
