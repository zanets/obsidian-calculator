<script lang="ts">
	import { create, all, type BigNumber, type ConfigOptions, indexDependencies } from "mathjs";
	import {onMount} from 'svelte';


	enum Base {
		BIN,
		OCT,
		DEC,
		HEX,
	}

	function ResetStaging(): void {
		staging = "0";
	}

	function ResetExpression(): void {
		expression = [];
	}

	let config: ConfigOptions = {
		epsilon: 1e-12,
		matrix: "Matrix",
		number: "BigNumber",
		precision: 64,
		predictable: false,
		randomSeed: null,
	};

	let math = create(all, config);

	let staging: string = "0";
	let stagingBin: string;
	let stagingOCT: string;
	let stagingHex: string;
	let stagingDec: string;
	$: {
		stagingBin = math.bin(staging).substring(2);
	}
	$: {
		stagingOCT = math.oct(staging).substring(2);
	}
	$: {
		stagingDec = math.evaluate(staging);
	}
	$: {
		stagingHex = math.hex(staging).substring(2);
	}
	function AddStaging(value: string): void {
		if (staging === "0") {
			staging = value;
		} else {
			staging += value;
		}
	}

	let expression: string[] = [];
	let expressionStr: string;
	$: { 
		expressionStr = expression.join(" ");
	}
	
	function AddExpression(value: string): void {
		if (value === '0') {
			return;
		}
		expression.push(value);
		expression = expression;
	}

	function evaluate(): string {
		let result: BigNumber = math.evaluate(expression.join(""));
		return result.toString();
	}

	function onClick(event: Event): void {
		const input = (event.target as HTMLElement).innerHTML;
		switch(input) {
			case '+':
			case '-':
			case '*':
			case '/':
			case '(':
			case ')':
				AddExpression(staging);
				AddExpression(input);
				ResetStaging();
				break;
			case '.':
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				AddStaging(input);
				break;
			case '=':
				AddExpression(staging);
				let result: string = evaluate();
				staging = result;
				ResetExpression();
				break;
			case 'C':
				ResetStaging();
				break;
			case 'AC':
				ResetExpression();
				ResetStaging();
				break;
		} 
	}

	function RegisterKeyboardInput() {
		document.addEventListener('keydown', (event) => {
			const input = event.key;
			if (event.shiftKey) {

			} else {
				switch(input) {
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					AddStaging(input);
					break;
				case 'Multiply':
				case 'Add':
				case 'Divide':
				case 'Subtract':
					AddExpression(staging);
					AddExpression(input);
					ResetStaging();
					break;
				case 'Enter':
					AddExpression(staging);
					let result: string = evaluate();
					staging = result;
					ResetExpression();
					break;
				}
			}
			
    		
		});
	}

	function main() {
		ResetStaging();
		ResetExpression();
		RegisterKeyboardInput();
	}

	const KEYBOARD = [
		'A', '', '', 'C', '',
		'B', '(', ')', '', '/',
		'C', '7', '8', '9', '*',
		'D', '4', '5', '6', '-',
		'E', '1', '2', '3', '+',
		'F', 'negative', '0', '.', '=',

	];
	main();

	
</script>

<div class="number">
	<!--
    <input id="user-input" type="text" readonly>
    <span>Base is {base}!</span>
    <button on:click={()=>{toBase(8)}}>8</button>
    <button on:click={()=>{toBase(2)}}>2</button>
    <button on:click={()=>{toBase(16)}}>16</button>
    -->

	<div id="cal-container">
		<div id="cal-display-express">{expressionStr}</div>
		<div id="cal-display">{staging}</div>

		<div class="cal-display-nums">
			<div class="cal-display-num">BIN</div><div class="cal-display-num">{stagingBin}</div>
			<div class="cal-display-num">OCT</div><div class="cal-display-num">{stagingOCT}</div>
			<div class="cal-display-num">DEC</div><div class="cal-display-num">{stagingDec}</div>
			<div class="cal-display-num">HEX</div><div class="cal-display-num">{stagingHex}</div>
		</div>

		<div id="cal-btns">
			{#each KEYBOARD as key}
				<div class="cal-btn" on:click={onClick}>{key}</div>
			{/each}
		</div>
	</div>
</div>

<style>
	#cal-container {
		max-width: 400px;
		margin: 2vh 2vh 2vh 2vh;
	}

	#cal-display {
		text-align: right;
		height: 70px;
		line-height: 70px;
		padding: 16px 8px;
		font-size: 16px;
	}

	#cal-display-express {
		text-align: right;
		height: 90px;
		line-height: 70px;
		padding: 16px 8px;
		font-size: 12px;
		color: rgb(105, 105, 105);
	}

	.cal-display-nums {
		display: grid;
  		width: 100%;
  		
  		grid-template-areas: "btn   num";
  		grid-template-rows: auto;
  		grid-template-columns: 10% 90%;
	}

	.cal-display-num:hover {
		background-color: #e0e4d9;
		color: white;
		transition: 0.1s ease-in-out;
	}

	#cal-btns {
		display: grid;
		border-bottom: 1px solid #999;
		border-left: 1px solid#999;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}

	#cal-btns > div {
		border-top: 1px solid #999;
		border-right: 1px solid#999;
	}

	.cal-btn {
		border: 0.5px solid #999;
		line-height: 20px;
		text-align: center;
		font-size: 16px;
		cursor: pointer;
	}

	.cal-btn:hover {
		background-color: #e0e4d9;
		color: white;
		transition: 0.1s ease-in-out;
	}
</style>
