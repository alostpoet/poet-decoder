import {Steps} from "./Steps";
import {Poet} from "./Poet";

export class Decoder {
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
