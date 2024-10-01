let count = 0;

/** @type {NodeJS.Timeout | null} */
let timer = null;

/** @type {Record<string, () => void>} */
const handler = {
    run() {
        timer = setInterval(() => {
            count += 10;
            self.postMessage(Math.floor(count / 1000));
        }, 10);
    },
    pause() {
        if (timer) clearInterval(timer);
    },
    stop() {
        count = 0;
        self.postMessage(0);
        if (timer) clearInterval(timer);
    }
}

self.addEventListener('message', e => handler[e.data]?.());
