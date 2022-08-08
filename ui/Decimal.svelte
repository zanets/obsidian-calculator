<script lang="ts">
    export let base: number;

    let number1: number;
    let number2: number;
    
    function toBase(inbase: number): void {
        base = inbase;
    }
</script>

<div class="number">
    
    <input id="user-input" type="text" readonly>
    <span>Base is {base}!</span>
    <button on:click={()=>{toBase(8)}}>8</button>
    <button on:click={()=>{toBase(2)}}>2</button>
    <button on:click={()=>{toBase(16)}}>16</button>
</div>

<style>
  .number {
    color: red;
  }
</style>