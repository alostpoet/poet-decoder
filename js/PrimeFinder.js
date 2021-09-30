export class PrimeFinder {
    static find(n) {
        function primeSieve(g,o,r){
            var t = (Math.sqrt(4+8*(g+o))-2)/4,
                e = 0,
                s = 0;

            ar.fill(true);
            if (o) {
                for(var i = Math.ceil((o-1)/3); i < (g+o-1)/3; i++) ar[1+3*i-o] = false;
                for(var i = 2; i < t; i++){
                    s = Math.ceil((o-i)/(1+2*i));
                    e = (g+o-i)/(1+2*i);
                    if (i%3-1) for(var j = s; j < e; j++) ar[i + j + 2*i*j-o] = false;
                }
            } else {
                for(var i = 1; i < (g-1)/3; i++) ar[1+3*i] = false;
                for(var i = 2; i < t; i++){
                    e = (g-i)/(1+2*i);
                    if (i%3-1) for(var j = i; j < e; j++) ar[i + j + 2*i*j] = false;
                }
            }
            for(var i = 0; i < g; i++) ar[i] && r.push((i+o)*2+1);
            return r;
        }

        var cs = n <= 1e6 ? 7500
                : n <= 1e7 ? 60000
                    : 100000, // chunk size
            cc = ~~(n/cs),                     // chunk count
            xs = n % cs,                       // excess after last chunk
            ar = Array(cs/2),                  // array used as map
            result = [];

        for(var i = 0; i < cc; i++) result = primeSieve(cs/2,i*cs/2,result);
        result = xs ? primeSieve(xs/2,cc*cs/2,result) : result;
        result[0] *=2;
        return result;
    }
}
