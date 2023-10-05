import './Layout.scss';

export default function Layout({ title, children }) {
	return (
		<section className='layout'>
			<figure></figure>

			<div className='content'>
				<h1>{title}</h1>
				{children}
			</div>
		</section>
	);
}
