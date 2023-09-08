/* eslint-disable functional/prefer-immutable-types */
/* eslint-disable functional/prefer-tacit */
import dts from 'rollup-plugin-dts'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodePolyfills from 'rollup-plugin-node-polyfills'

const apis = [
	['dist/web3modal/ethereum.js', 'dist/web3modal/ethereum'],
	['dist/web3modal/react.js', 'dist/web3modal/react'],
	['dist/viem.js', 'dist/viem'],
	['dist/wagmi/index.js', 'dist/wagmi'],
	['dist/wagmi/chains.js', 'dist/wagmi/chains'],
]

const dfiles = [
	[
		'src/web3modal/ethereum.ts',
		['dist/web3modal/ethereum.d.ts', 'web3modal/ethereum.d.ts'],
	],
	[
		'src/web3modal/react.ts',
		['dist/web3modal/react.d.ts', 'web3modal/react.d.ts'],
	],
	['src/viem.ts', ['dist/viem.d.ts', 'viem.d.ts']],
	['src/wagmi/index.ts', ['dist/wagmi/index.d.ts', 'wagmi/index.d.ts']],
	['src/wagmi/chains.ts', ['dist/wagmi/chains.d.ts', 'wagmi/chains.d.ts']],
]

export default [
	...apis.map(([input, dir]) => ({
		input,
		output: [
			{
				dir,
				format: 'es',
			},
		],
		plugins: [commonjs(), nodeResolve(), json(), nodePolyfills()],
	})),
	...dfiles.map(([input, files]) => ({
		input,
		output: files.map((file) => ({
			file,
			format: 'es',
		})),
		plugins: [dts()],
	})),
]
