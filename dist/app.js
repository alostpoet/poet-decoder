class Steps {
    static execute(steps) {
        const base = 2000;
        steps.forEach(step => {
            setTimeout(() => {
                document.body.classList.add('step' + step);
            }, base * step);
        });
    }
}

class Poet {
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

class Decoder {
    _file; _input; _reader;
    static BASE64REG = /(?:[a-zA-Z0-9+\/]{4})*(?:|(?:[a-zA-Z0-9+\/]{3}=)|(?:[a-zA-Z0-9+\/]{2}==)|(?:[a-zA-Z0-9+\/]{1}===))$/g;
    constructor() {
        this._input = document.querySelector(`input[type="file"]`);

        this._input.addEventListener('change', () => {
            this.fileChanged();
        }, false);
    }

    static reset() {
        window.location.reload();
    }

    fileChanged() {
        this._file = this._input.files[0];
        this._reader = new FileReader();

        this._reader.addEventListener('load', (event) => this.readFile(event));
        this._reader.addEventListener('progress', () => {
            Steps.execute([0,1]);

            setTimeout(() => {
                document.body.classList.add('hide');
            }, 1);
        });
        this._reader.readAsBinaryString(this._file);
    }

    readFile(event) {
        Steps.execute([2,3]);

        const fileContents = event.target.result;
        let result = this.extractData(fileContents);

        if (result.length < 5) {
            Poet.silent();
        } else {
            Poet.reveal(result);
        }
    }

    extractData(data) {
        return atob(data.match(Decoder.BASE64REG)[0]);
    }
}

new Decoder();
