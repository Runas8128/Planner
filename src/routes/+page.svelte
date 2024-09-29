<script>
	
	/**
	 * @typedef lab
	 * 	@prop label {string}
	 * 	@prop sec {number}
	 */

	/**
	 * @typedef SelectObj
	 * 	@prop text {string}
	 *  @prop min {number}
	 */

	import workerURL from '$lib/worker.js?url';
	import { onMount } from 'svelte';

	/** @type {SelectObj[]} */
	const preset = [
		{ text: "국어", min: 80 },
		{ text: "수학", min: 100 },
		{ text: "영어", min: 70 },
		{ text: "탐구", min: 30 },
	];

	/** @type {lab[]} */
	$: labs = [];

	$: nowObj = preset[0];
	$: nowSec = 0;

	let settingOpened = false;
	let running = false;
	
	/** @type {NodeJS.Timeout | null} */
	let addLabTimeout = null;

	/** @param msg {string} */
	let post = msg => { msg; };

	onMount(() => {
        window.addEventListener('message', e => e.data);
        
        const publicWorker = new Worker(workerURL);
        publicWorker.addEventListener("message", msg => { nowSec = msg.data; });
		post = msg => publicWorker.postMessage(msg);
    });

	/** @param {MouseEvent} e */
	function handleTimer(e) {
		if (settingOpened) return;
		
		if (e.detail === 1) {
			if (!running) {
				post('run');
				running = true;
			} else {
				addLabTimeout = setTimeout(() => { labs = [...labs, { label: nowObj.text, sec: nowSec }]; }, 200);
			}
		} else if (e.detail === 2) {
			if (addLabTimeout) clearTimeout(addLabTimeout);
			post('pause');
			running = false;
		} else if (e.detail === 3) {
			if (nowSec > 0) labs = [...labs, { label: nowObj.text, sec: nowSec }];
			if (addLabTimeout) clearTimeout(addLabTimeout);
			post('stop');
			running = false;
		}
	}

	/**
	 * @param {string} id
	 * @param {'left' | 'opacity'} name
	 * @param {string} style
	 */
	function setStyle(id, name, style) {
		const elem = document.getElementById(id);
		if (elem) elem.style[name] = style;
	}

	function open_select() {
		settingOpened = true;
		post('pause');
		running = false;
		setStyle('timer-page-wrap', 'left', '0');
		setStyle('timer-hover', 'opacity', '70%');
		setStyle('time', 'opacity', '30%');
	}

	function close_select() {
		settingOpened = false;
		setStyle('timer-page-wrap', 'left', '-30vw');
		setStyle('timer-hover', 'opacity', '0%');
		setStyle('time', 'opacity', '100%');
	}

	/** @param {SelectObj} obj */
	function select(obj) {
		if (nowObj != obj) {
			if (nowSec > 0) labs = [...labs, { label: nowObj.text, sec: nowSec }];
			nowObj = obj;
			post('stop');
		}
		close_select();
	}

	/**
	 * @param {number} sec
	 */
	function sec2txt (sec) {
		return `${Math.floor(sec/60)} : ${(sec % 60).toString().padStart(2, '0')}`;
	}

</script>

<svelte:head>
	<title>타이머</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Jua&display=swap" rel="stylesheet">
</svelte:head>

<div id="timer-page-wrap">
	
	<div id="select-wrap">
		<button id="close-select" class="select" on:click={close_select}>타이머로 이동 &gt;</button>
	
		<div id="select">
			{#each preset as obj}
				<button class="select-obj" on:click={() => select(obj)}>
					<span class="select-text">{obj.text}</span>
					<span class="select-min">{obj.min}분</span>
				</button>
			{/each}
		</div>
	</div>
	
	<div id="timer-wrap">
		<button id="timer-hover" on:click={handleTimer}></button>
		<div id="time" style="--ratio: {Math.floor(nowSec/60)/nowObj.min*360}deg">
			<span id="time-text">{nowObj.text}</span>
			<span id="time-prog">{sec2txt(nowSec)} / {nowObj.min} : 00</span>
		</div>
	</div>
	
	<div id="lab-wrap">
		<button id="open-select" class="select" on:click={open_select}>☰ 타이머 설정</button>
		<div id="lab-item-wrap">
			<p>&lt; 시간 기록 &gt;</p>
			{#each [...labs].reverse() as lab}
				<div class="lab-obj">
					<span class="lab-time">{sec2txt(lab.sec)}</span>
					<span class="lab-len">{sec2txt(lab.sec)}</span>
					<span class="lab-text">{lab.label}</span>
				</div>
			{/each}
		</div>
	</div>

</div>

<style>
	@import './style.css';
</style>
