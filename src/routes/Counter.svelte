<script>
    import workerURL from '$lib/worker.js?url';
	import { onMount } from 'svelte';

    let count = 0;
    let running = false;

    let runTimer = () => {};

    onMount(() => {
        window.addEventListener('message', e => e.data);
        
        const publicWorker = new Worker(workerURL);
        publicWorker.addEventListener("message", (msg) => {
            count = msg.data;
        });

        runTimer = () => {
            publicWorker.postMessage(running ? 'pause' : 'run');
            running = !running;
        }
    });
</script>

<button on:click={runTimer}>
    {count}
</button>
