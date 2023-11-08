import fetch from 'isomorphic-unfetch';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const pokeDetail = ({ pokeNum,name }) => {
	/*
	const [imgLoading, setImageLoading] = useState(false);
	useEffect(() => {
		setImageLoading(true);
	}, [])
	*/
	
	// console.log(pokeNum);
	
	let pokeInfo = [];
	pokeInfo.push(pokeNum);
	let [_pokeInfo] = pokeInfo;
	// let pokeImg_front = _pokeInfo.sprites.front_default;
	let pokeImg_front = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${name}.png`;
	// console.log(_pokeInfo);
	// console.log(pokeInfo);

	return (
		<>
			<Image src={pokeImg_front} width={240} height={240} />
		</>
	);

	//api => param => link /${name}
	// name => to props => api get
	// api => parsing to div/Link
};

export const getServerSideProps = async ({ query }) => {
	// console.log(query);
	const { name } = query;
	try {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
		// console.log(res);
		if (res.status === 200) {
			const pokeNum = await res.json();
			// console.log(pokeNum);
			return { props: { pokeNum,name } };
		}
		return { props: {} };
	} catch (e) {
		console.log(e);
		return { props: {} };
	}
};

export default pokeDetail;
