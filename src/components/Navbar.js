import '../stylesheets/Navbar.css';

function Navbar(props) {
	const { leading, trailing, path, paths } = props;

	return (
		<>
			<div className='navbar'>
				<div className='leading'>
					{leading}
				</div>
				<div className='paths'>
					{paths.map(p => {
						if (path === p.path) {
							return <a className='selected' href={p.path}>{p.displayText}</a>;
						}

						return <a href={p.path}>{p.displayText}</a>;
					})}
				</div>
				<div className='trailing'>
					{trailing}
				</div>
			</div>
			<div className='navbarSpacer'></div>
		</>
	);
}

export default Navbar;
