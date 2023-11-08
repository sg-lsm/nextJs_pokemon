import fetch from 'isomorphic-unfetch';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import css from 'styled-jsx/css';

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
	let pokeImg_back = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${name}.png`;
	
	// console.log(_pokeInfo);
	// console.log(pokeInfo);

	let types = [];
	let type = [];
	for (let i = 0; i < _pokeInfo.types.length; i++){
		const path = _pokeInfo.types;
		types.push({
			slot : path[i].slot,
			type : path[i].type
		})
	}
	console.log(types[1].type);	
	// types.type[1].name
	// types.type[1].url

	
	
	// console.log(type);

	return (
		<>
			<div className="poke_img_container">
				<Image src={pokeImg_front} width={240} height={240} />
				<Image src={pokeImg_back} width={240} height={240} />
			</div>
			<div className="poke_info_container">
				<div className="info_name">name: {_pokeInfo.name}</div>
				<div className="info_number">number: {_pokeInfo.order}</div>
				<div className="info_height">height: {_pokeInfo.height}m</div>
				<div className="info_weight">weight: {_pokeInfo.weight}kg</div>
				<div className="info_base_exp">
					base experience: {_pokeInfo.base_experience}
				</div>
			</div>

			<style jsx>{style}</style>
		</>
	);

	

	//api => param => link /${name}
	// name => to props => api get
	// api => parsing to div/Link
};

const style = css`
	.poke_img_container {
		display: flex;
	}
`;

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
