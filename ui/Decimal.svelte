<script lang="ts">

	enum UnitType {
		NUM,
		OP,
	};

	enum Base {
		BIN,
		DEC,
		HEX,
	};

	class Unit {

		constructor(type: UnitType, value: string) {
			this.type = type;
			this.value = value;
			switch(this.type) {
				case UnitType.NUM:
					
			}
		}

		private value: string;
		private type: UnitType;
		private base: Base;
		
		public GetBase(): Base {
			return this.base;
		}

		public SetBase(base: Base): void {
			if (this.type != UnitType.NUM)
				return;

			switch (base) {
				case Base.BIN:
					
					

			}
		}


	}

	let UnitStack: Unit[];

    // 2, 8, 10, 16
    export let base: number;
    export let staging: string;
    export let express: string;

    let stagingBin: string;
    let stagingDec: string;
    let stagingHex: string;
    
    function toBase(inbase: number): void {
        base = inbase;

    }

    let btns = Array.from(document.getElementsByClassName('cal-btns'));

    btns.map( btn => {
      btn.addEventListener('click', (e) => {
        const input = e.target as HTMLElement;
        switch(input.innerText){
            case 'C':
                display.innerText = '';
                break;
            case '=':
                try{
                    display.innerText = eval(display.innerText);
                } catch {
                    display.innerText = "Error"
                }
                break;
            case '←':
                if (display.innerText){
                   display.innerText = display.innerText.slice(0, -1);
                }
                break;
            default:
              if ()
                display.innerText += e.target.innerText;
        }
      });
    });

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
		<div id="cal-display-express">{express}</div>
		<div id="cal-display">{staging}</div>
		<div id="cal-display-bin">
			<div class="cal-base-btn">BIN</div>
			{stagingBin}
		</div>
		<div id="cal-display-dec">
			<div class="cal-base-btn">DEC</div>
			{stagingDec}
		</div>
		<div id="cal-display-hex">
			<div class="cal-base-btn">HEX</div>
			{stagingHex}
		</div>
		<div class="cal-btns">
			<div class="cal-btn">+</div>
			<div class="cal-btn">-</div>
			<div class="cal-btn">*</div>
			<div class="cal-btn">(</div>
			<div class="cal-btn">)</div>
			<div class="cal-btn">/</div>
			<div class="cal-btn">7</div>
			<div class="cal-btn">8</div>
			<div class="cal-btn">9</div>
			<div class="cal-btn">4</div>
			<div class="cal-btn">5</div>
			<div class="cal-btn">6</div>
			<div class="cal-btn">1</div>
			<div class="cal-btn">2</div>
			<div class="cal-btn">3</div>
			<div class="cal-btn">A</div>
			<div class="cal-btn">B</div>
			<div class="cal-btn">C</div>
			<div class="cal-btn">D</div>
			<div class="cal-btn">E</div>
			<div class="cal-btn">F</div>
			<div class="cal-btn">←</div>
			<div class="cal-btn">.</div>
			<div class="cal-btn">C</div>
			<div class="cal-btn">=</div>
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
		height: 70px;
		line-height: 70px;
		padding: 16px 8px;
		font-size: 8px;
		color: gainsboro;
	}

	.cal-btns {
		display: grid;
		border-bottom: 1px solid #999;
		border-left: 1px solid#999;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	.cal-btns > div {
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
