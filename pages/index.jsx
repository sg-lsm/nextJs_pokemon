import fetch from 'isomorphic-unfetch';
import safeJsonStringfy from 'safe-json-stringify';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import css from 'styled-jsx/css';

const index = ({  pokeApi }) => {
    const api = pokeApi;
    // const api_species = pokeApi_species;
	return <div>{[api]}</div>;
};

 const ww = async(params)=> {
    let aa = [];
     let bb = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${params}`);
     console.log(bb);
 }
ww(1);


const app = ({ pokeApi }) => {
	// console.log(pokeApi);

	// console.log(pokeApi_species);
	const [pokeNum, setPokeNum] = useState();
    const { results } = pokeApi;
	// console.log(results);
	let arrApi = [];
	let poke_obj = [];

	// const vv = async () => {
	// 	const result = [];
	// 	const fetch = await fetch(
	// 		`https://pokeapi.co/api/v2/pokemon-species/${pokeNum}/`,
	// 	);
	// 	for (let i = 0; i < fetch.length; i++) {
	// 		result.push(fetch);
	// 	}
	// 	console.log(' result : ' + result);
	// 	return result;
	// };

	const poke_num_get_info = async pokeNum => {
		const url = await fetch(
			`https://pokeapi.co/api/v2/pokemon-species/${pokeNum}/`,
		);
		if (url.status != 200) {
			return null;
		}
		const json = await url.json();
		// console.log(json.names);

		return poke_species_obj.push(json);
	};

	function apiGet(results) {
		for (let i = 0; i < results.length; i++) {
			arrApi.push({
				name: results[i].name,
				url: results[i].url,
				num: i + 1,
			});
		}
	}
	console.log(arrApi);

	apiGet(results);

	// console.log(arrApi);

	// url = https://pokeapi.co/api/v2/pokemon/${num}

	const renderApi = arrApi.map(d => {
		return (
			<>
				<div className="poke_container">
					<Image
						width={80}
						height={100}
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${d.num}.png`}
					/>
					<div className="poke_desc">
						<div className="poke_name" key={d.num}>
							{d.name}
						</div>
						{/* <Link href={`https://pokeapi.co/api/v2/pokemon/${d.num}`}>{d.url }</Link> */}
						<Link className="poke_detail" href={`/detail/${d.num}`}>
							{'자세히보기'}
						</Link>
					</div>
				</div>
				<style jsx>{style}</style>
			</>
		);
	});

	return (
		<>
			<label>
				search to pokemon no.
				<input value={pokeNum} onChange={e => setPokeNum(e.target.value)} />
			</label>
			{/* <div>{ poke_num_get_info(pokeNum) }</div> */}
			{/* <p>{pokeNum}</p> */}
			<Link id="searchButton" href={`./detail/${pokeNum}`}>
				검색하기
			</Link>
			<div></div>
			<div>{renderApi}</div>
		</>
	);
};

const style = css`
	#searchButton {
		border: 1px solid black;
	}
	.poke_container {
		display: flex;
	}
	.poke_desc {
		align-items: center;
		justify-content: center;
		display: grid;
	}
`;

export const getServerSideProps = async () => {
	try {
		// const poke_species = await fetch(
		// 	`https://pokeapi.co/api/v2/pokemon-species/`,
		// );
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
		if (res.status === 200) {
			// const pokeApi = await JSON.parse(safeJsonStringfy(res));
            // let pokeApi_species = await poke_species.json();
            let pokeApi = await res.json();
			// console.log(pokeApi);
			return { props: { pokeApi } };
		}
		return { props: {} };
	} catch (e) {
		console.log(e);
		return { props: {} };
	}
};

export default app;
