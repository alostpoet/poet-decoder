export class Steps {
    static execute(steps) {
        const base = 2000;
        steps.forEach(step => {
            setTimeout(() => {
                document.body.classList.add('step' + step);
            }, base * step);
        });
    }
}
