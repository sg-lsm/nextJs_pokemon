import fetch from 'isomorphic-unfetch';
import Image from 'next/image';
import { Component, useEffect, useState } from 'react';
import css from 'styled-jsx/css';

const pokeDetail = ({ pokeNum, name }) => {
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



	/* 전면 후면 이미지  */
	// let pokeImg_front = _pokeInfo.sprites.front_default;
	let pokeImg_front = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${name}.png`;
	let pokeImg_back = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${name}.png`;

	// console.log(_pokeInfo);
	// console.log(pokeInfo);

	// 타입(불, 풀등)을 표현하기 위해 번호와 내부 타입을 받아오기
	let types = [];

	for (let i = 0; i < _pokeInfo.types.length; i++) {
		const path = _pokeInfo.types;
		types.push({
			slot: path[i].slot,
			type: path[i].type,
		});
	}

	// 가독성위해 세자리마다 콤마
	const commaNum = target => {
		let result;
		target = target.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

		result = target;
		return result;
	};

	// const _pokeinfo_weight = _pokeInfo.weight
	// 	.toString()
	// 	.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

	const _pokeinfo_weight = commaNum(_pokeInfo.weight);
	const _pokeinfo_height = commaNum(_pokeInfo.height);
	const _pokeinfo_number = commaNum(_pokeInfo.order);
	const _pokeinfo_experience = commaNum(_pokeInfo.base_experience);

	// console.log(types[1].type);
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
				<div className="info_number">
					number:{' '}
					{_pokeinfo_number ? (
						_pokeinfo_number
					) : (
						<Link id="404" href={`../undefined.jsx`} />
					)}
				</div>
				<div className="info_height">height: {_pokeinfo_height}m</div>
				<div className="info_weight">weight: {_pokeinfo_weight}kg</div>
				<div className="info_base_exp">
					base experience: {_pokeinfo_experience}
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

// 인풋 창으로 받아오는 번호(query)값을 이용해 도감번호의 포켓몬을 받아와 json으로 넘겨 내부에서 처리하도록 한다.
export const getServerSideProps = async ({ query }) => {
	// console.log(query);
	const { name } = query;
	try {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
		// console.log(res);
		if (res.status === 200) {
			const pokeNum = await res.json();
			// console.log(pokeNum);
			return { props: { pokeNum, name } };
		}
		return { props: {} };
	} catch (e) {
		console.log(e);
		return { props: {} };
	}
};

export default pokeDetail;
