import fetch from 'isomorphic-unfetch';

const index = ({ pokeApi, name }) => {
	const api = pokeApi;
	const name = name;
	return <div>{(pokeApi, name)}</div>;
};

const App = ({ pokeApi }) => {
	console.log(pokeApi);
};

//https://pokeapi.co/api/v2/pokemon-species%20 results[].name.url

export const getServerSideProps = async () => {
	try {
		const apiOffset = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=10`);
		if (res.status === 200) {
			const pokeApi = apiOffset.json();
			return { props: { pokeApi } };
		}
	} catch (e) {
		console.log(e);
		return { props: {} };
	}
};
export default App;
