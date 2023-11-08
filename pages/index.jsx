import fetch from 'isomorphic-unfetch';
import safeJsonStringfy from 'safe-json-stringify';
import { useState } from 'react';
import Link from 'next/link';

const index = ({ pokeApi }) => {
	const api = pokeApi;
	return <div>{api}</div>;
};

const app = ({ pokeApi }) => {
    const [pokeNum, setPokeNum] = useState();
	const { results } = pokeApi;
	let arrApi = [];

	function apiGet(results) {
		for (let i = 0; i < results.length; i++) {
			arrApi.push({
				name: results[i].name,
                url: results[i].url,
                num: i+1
			});
		}
	}

	apiGet(results);
	// console.log(arrApi);

	// url = https://pokeapi.co/api/v2/pokemon/${num}

    return (
        <>
            <label>
                search to pokemon no.
                <input value={pokeNum} onChange={e => setPokeNum(e.target.value)}/>
            </label>
            <p>{pokeNum}</p>
            <Link id="search" href={`./detail/${pokeNum}`}>
                검색하기
            </Link>
			<div>
				{arrApi.map(d => {
					return (
						<>
                            <div key={d.num}>{d.name}</div>
                            {/* <Link href={`https://pokeapi.co/api/v2/pokemon/${d.num}`}>{d.url }</Link> */}
                            <Link href={`/detail/${d.num}`}>{d.url}</Link>
						</>
					);
				})}
			</div>
		</>
	);
};

export const getServerSideProps = async () => {
	try {
		const res = await fetch(
			`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`,
		);
		if (res.status === 200) {
			// const pokeApi = await JSON.parse(safeJsonStringfy(res));
			const pokeApi = await res.json();
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
