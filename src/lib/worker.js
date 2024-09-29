let count = 0;

/** @type {NodeJS.Timeout | null} */
let timer = null;

self.addEventListener('message', e => {
    if (e.data === 'run') {
        timer = setInterval(() => {
            count += 10;
            self.postMessage(Math.floor(count / 1000));
        }, 10);
    } else if (e.data === "pause") {
        if (timer) clearInterval(timer);
    } else if (e.data === "stop") {
        count = 0;
        self.postMessage(0);
        if (timer) clearInterval(timer);
    }
});
