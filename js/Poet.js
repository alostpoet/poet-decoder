export class Poet {
    static silent() {
        Poet.write(`<p>Your Poet remained silent.</p>`);
        Poet.writeNote(`<p>It seems that the image you provided does not contain any hidden data. <br>Make sure you have uploaded the original 1024x1024 pixels Poet image.</p>`);
    }

    static reveal(result) {
        Poet.write(`<p>The Poet whispered: <em>${result}</em></p>`);

        let value = parseInt(result.split(' ').pop());
        let primes = PrimeFinder.find(value);
        document.getElementById('num').innerText = result.split(' ').pop();
        document.getElementById('primeNumber').innerText = primes.length;
    }

    static msg({msg, containerId}) {
        document.getElementById(containerId).innerHTML = msg;
    }

    static write(msg) {
        Poet.msg({msg, containerId: 'step3'});
    }

    static writeNote(msg) {
        Poet.msg({msg, containerId: 'poetNote'});
    }
}
