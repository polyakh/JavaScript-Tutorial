function isThisAZipCode(candidate = "99999-9999") {
    if (typeof candidate !== "string" || // utf 16
        candidate.length !== 10
    ) return false;
    for (let i = 0; i < candidate.length; i++) {
        let c = candidate[i];
        switch (i) {
            case 0: case 1: case 2: case 3: case 4:
            case 6: case 7: case 8: case 9:
                if(c < "0") {console.log(c)}
                if(c < "0" || c > "9") return false; // у букв числ. знач больше чем у цифр
                break;
            case 5:
                if(c !== "-") return false;
                break;
        }
    }

    return true;
}
window.test = isThisAZipCode;

