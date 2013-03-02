var byteCount = function(i) {
    return unescape(encodeURI(i)).length;
};

exports.byteCount = byteCount;

var minify = function(code) {
    code = code.replace(/\/\/.*$/mg, "").replace(/\/\*.*\*\//g, "");
    var chars = [];
    var insideString = false, quote;
    for (var i = 0, len = code.length, ch, res; i < len; ++i) {
        ch = code.charAt(i);
        if (!insideString && (res = /["']/.exec(ch))) {
            insideString = true;
            quote = res[0];
            chars.push(ch);
        } else if (insideString && ch == quote) {
            insideString = false;
            chars.push(ch);
        } else if (!/\s/.test(ch) || insideString) {
            chars.push(ch);
        }
    }

    return chars.join("");
};

exports.minify = minify;

exports.crush = function(C) {
    C = minify(C);

    var M = C.length / 2;
    var d, e, F, Z, Y, X, q;

    // Searches the input string for the best possible replacement
    var B = function(i) {
        var g, t, u, v = {}, y, z, h, l, j, f, e, s;
        g = t = u = 0;

        for (y = 2, z = M; y <= z; ++y) {
            for (h = 0, l = i.length - y; h < l; ++h) {
                if (!v[e = i.substr(h, y)]) {
                    for (v[e] = 1, f = h; ~(f = i.indexOf(e, f + y)); ) {
                        v[e]++;
                        M = y;
                    }
                }
            }
        }

        for (e in v) {
            if ( (j = v[e]) > 1) {
                s = byteCount(e) * (j - 1) - j - 2;
                if (s > t || (s == t && j < u) ) {
                    t = s;
                    u = j;
                    g = e;
                }
            }
        }

        X = g;
    };

    // Get all the characters in the character code range 1-127 that don't appear in str and aren't line breaks
    for (d = 1, F = []; d < 127; ++d) {
        e = String.fromCharCode(d);
        if (!/[\r\n'"\\]/.test(e) && !~C.indexOf(e)) {
            F.push(e);
        }
    }

    // Arrange characters so that control characters come last
    F.sort(function(i, j) {
        return i > j ? 1 : i < j ? -1 : 0;
    });

    Z = "";

    // Replace substrings with single characters while we still have free characters and worthwhile replacements
    while ( (Y = F.pop()) && (B(C), X) ) {
        C = C.split(X).join(Y) + Y + X;
        Z = Y + Z;
    }

    // Get the most popular type of quote to minimize escaping in the output string
    q = C.split("'").length < C.split('"').length ? "'" : '"';

    // Create the output
    return "f=" + q + C.replace(/[\r\n\\]/g, "\\$&").replace(new RegExp(q, "g"), "\\" + q) + q + ";for(i in g=" + q + Z + q + ")e=f.split(g[i]),f=e.join(e.pop());eval(f)";
};
