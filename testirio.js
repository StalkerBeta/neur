var R = require('ramda');
void 0; //to not bloat the output
var random = require('seed-random')(228);
var data = [
    {input: [1/5, 1, 1/1], output: 1/1},
    // {input: [1/9, 1, 1/2], output: 1/1},
    // {input: [1/8 ,0, 1/1], output: 1/1},
    // {input: [1/3, 1, 1/1], output: 1/2},
    // {input: [1/6 ,1, 1/2], output: 1/2},
    // {input: [1/4, 0, 1/1], output: 1/2},
    // {input: [1/9, 1, 1/8], output: 1/3},
    // {input: [1/6, 1, 1/4], output: 1/3},
    // {input: [1/1, 0, 1/1], output: 1/3},
    // {input: [1/6, 1, 0], output: 1/4},
    // {input: [1/10, 0, 0], output: 1/4}
    ];
var activation_sigmoid = x => 1 / (1 + Math.exp(-x));
var weights = {
i1_h1: random(),
i2_h1: random(),
i3_h1: random(),
bias_h1: random(),
i1_h2: random(),
i2_h2: random(),
i3_h2: random(),
bias_h2: random(),
i1_h3: random(),
i2_h3: random(),
i3_h3: random(),
bias_h3: random(),
h1_hh1: random(),
h2_hh1: random(),
h3_hh1: random(),
bias_hh1: random(),
h1_hh2: random(),
h2_hh2: random(),
h3_hh2: random(),
bias_hh2: random(),
hh1_o1: random(),
hh2_o1: random(),
bias_o1: random()
};

// var weights = {
// i1_h1: 1,
// i2_h1: 2,
// i3_h1: 3,
// bias_h1: 4,
// i1_h2: 5,
// i2_h2: 6,
// i3_h2: 7,
// bias_h2: 8,
// i1_h3: 9,
// i2_h3: 10,
// i3_h3: 11,
// bias_h3: 12,
// h1_hh1: 13,
// h2_hh1: 14,
// h3_hh1: 15,
// bias_hh1: 16,
// h1_hh2: 17,
// h2_hh2: 18,
// h3_hh2: 19,
// bias_hh2: 20,
// hh1_o1: 21,
// hh2_o1: 22,
// bias_o1: 23
// };

var nn = (i1,i2,i3) => {
    var h1_input = i1*weights.i1_h1+
                              i2*weights.i2_h1+
                              i3*weights.i3_h1+
                              weights.bias_h1;
    var h1_output = activation_sigmoid(h1_input);

    var h2_input = i1*weights.i1_h2+
                              i2*weights.i2_h2+
                              i3*weights.i3_h2+
                              weights.bias_h2;
    var h2_output = activation_sigmoid(h2_input);
    
    var h3_input = i1*weights.i1_h3+
                              i2*weights.i2_h3+
                              i3*weights.i3_h3+
                              weights.bias_h3;
    var h3_output = activation_sigmoid(h3_input);

    var hh1_input = h1_output*weights.h1_hh1+
                                h2_output*weights.h2_hh1+
                                h3_output*weights.h3_hh1+
                                weights.bias_hh1;
    var hh1_output = activation_sigmoid(hh1_input);

    var hh2_input = h1_output*weights.h1_hh2+
                                h2_output*weights.h2_hh2+
                                h3_output*weights.h3_hh2+
                                weights.bias_hh2;
    var hh2_output = activation_sigmoid(hh2_input);

    var o1_input = hh1_output*weights.hh1_o1+
                              hh2_output*weights.hh2_o1+
                              weights.bias_o1;
    var o1_output = activation_sigmoid(o1_input);

    return o1_output;
}

var fun = (j) => {
    var res=0;
        data.map(({input: [i1, i2, i3], output: y}) => 
            res+=Math.pow(y - nn(i1, i2, i3), 2));
//for(var i = 0;i<arr.length;i++){
//res+=Math.pow(arr[i][1]-arr[i][0],2)
//}
res=res/data.length;
//console.log('===err===');
console.log(res);
}

var output_result = () => {
console.log("===res===");
data.map(({input: [i1, i2, i3], output: y}) => console.log(nn(i1,i2,i3) + ' => (' + y + ')' ));
}

var outputResults = () =>{
    console.log("=====weight=====");
    console.log("{");
    for (var k in weights) {
        console.log(k+": "+weights[k]+",");
    }
    console.log("}")
    console.log("=====result=====");
     console.log('[');   
    data.forEach(({input: [i1, i2, i3], output: y}) =>
        console.log('['+nn(i1,i2,i3)+','+y+'],'));
    console.log(']');
    }

    console.log(weights)
var train = () => {
var weights_deltas = {
i1_h1: 0,
i2_h1: 0,
i3_h1: 0,
bias_h1: 0,
i1_h2: 0,
i2_h2: 0,
i3_h2: 0,
bias_h2: 0,
i1_h3: 0,
i2_h3: 0,
i3_h3: 0,
bias_h3: 0,
h1_hh1: 0,
h2_hh1: 0,
h3_hh1: 0,
bias_hh1: 0,
h1_hh2: 0,
h2_hh2: 0,
h3_hh2: 0,
bias_hh2: 0,
hh1_o1: 0,
hh2_o1: 0,
bias_o1: 0
};
var E = 0.7;
var A = 0.3;
for( {input: [i1,i2,i3],output:y} of data ){
    var h1_input = i1*weights.i1_h1+
                              i2*weights.i2_h1+
                              i3*weights.i3_h1+
                              weights.bias_h1;
    var h1_output = activation_sigmoid(h1_input);

    var h2_input = i1*weights.i1_h2+
                              i2*weights.i2_h2+
                              i3*weights.i3_h2+
                              weights.bias_h2;
    var h2_output = activation_sigmoid(h2_input);
    
    var h3_input = i1*weights.i1_h3+
                              i2*weights.i2_h3+
                              i3*weights.i3_h3+
                              weights.bias_h3;
    var h3_output = activation_sigmoid(h3_input);

    var hh1_input = h1_output*weights.h1_hh1+
                                h2_output*weights.h2_hh1+
                                h3_output*weights.h3_hh1+
                                weights.bias_hh1;
    var hh1_output = activation_sigmoid(hh1_input);

    var hh2_input = h1_output*weights.h1_hh2+
                                h2_output*weights.h2_hh2+
                                h3_output*weights.h3_hh2+
                                weights.bias_hh2;
    var hh2_output = activation_sigmoid(hh2_input);

    var o1_input = hh1_output*weights.hh1_o1+
                              hh2_output*weights.hh2_o1+
                              weights.bias_o1;
    var o1_output = activation_sigmoid(o1_input);

console.log(weights.i1_h1+" * "+i1+" = "+weights.i1_h1 * i1);
console.log(weights.i2_h1+" * "+i2+" = "+weights.i2_h1 * i2);
console.log(weights.i3_h1+" * "+i3+" = "+weights.i3_h1 * i3);
console.log("bias: "+weights.bias_h1);
console.log("========")
console.log(h1_output)
console.log("========")

console.log(weights.i1_h2+" * "+i1+" = "+weights.i1_h2 * i1);
console.log(weights.i2_h2+" * "+i2+" = "+weights.i2_h2 * i2);
console.log(weights.i3_h2+" * "+i3+" = "+weights.i3_h2 * i3);
console.log("bias: "+weights.bias_h2);
console.log("========")
console.log(h2_output);
console.log("========")

console.log(weights.i1_h3+" * "+i1+" = "+weights.i1_h3 * i1);
console.log(weights.i2_h3+" * "+i2+" = "+weights.i2_h3 * i2);
console.log(weights.i3_h3+" * "+i3+" = "+weights.i3_h3 * i3);
console.log("bias: "+weights.bias_h3);
console.log("========")
console.log(h3_output)
console.log("========")
console.log(weights.h1_hh1+" * "+h1_output+" = "+weights.h1_hh1 * h1_output);
console.log(weights.h2_hh1+" * "+h2_output+" = "+weights.h2_hh1 * h2_output);
console.log(weights.h3_hh1+" * "+h3_output+" = "+weights.h3_hh1 * h3_output);
console.log("bias: "+weights.bias_hh1);
console.log("========")
console.log(hh1_output)
console.log("========")
console.log(weights.h1_hh2+" * "+h1_output+" = "+weights.h1_hh2 * h1_output);
console.log(weights.h2_hh2+" * "+h2_output+" = "+weights.h2_hh2 * h2_output);
console.log(weights.h3_hh2+" * "+h3_output+" = "+weights.h3_hh2 * h3_output);
console.log("bias: "+weights.bias_hh1);
console.log("========")
console.log(hh2_output)
console.log("========")
console.log(weights.hh1_o1+" * "+hh1_output+" = "+weights.hh1_o1 * hh1_output);
console.log(weights.hh2_o1+" * "+hh2_output+" = "+weights.hh2_o1 * hh2_output);
console.log("bias: "+weights.bias_o1);
console.log("========")
console.log(hh1_output)
console.log("========")

    
    var o1_delta=(y-o1_output)*(1-o1_output)*o1_output;
    var g_hh1_o1 = o1_delta*hh1_output;
    weights_deltas.hh1_o1 = E*g_hh1_o1+A*weights_deltas.hh1_o1;
    var g_hh2_o1 = o1_delta*hh2_output;
    weights_deltas.hh2_o1 = E*g_hh2_o1+A*weights_deltas.hh2_o1;
    var g_bias_o1=o1_delta;
    weights_deltas.bias_o1=E*g_bias_o1+A*weights_deltas.bias_o1;
    
    console.log("("+y+"-"+o1_output+")*("+1+"-"+o1_output+")*"+o1_output)
    console.log(g_hh1_o1 +"="+ o1_delta+"*"+hh1_output);
    console.log("g",weights_deltas.hh1_o1 +"="+ E+"*"+g_hh1_o1+"+"+A+"*"+weights.hh1_o1);
    console.log(g_hh2_o1 +"="+ o1_delta+"*"+hh2_output);
    console.log("g",weights_deltas.hh2_o1 +"="+ E+"*"+g_hh2_o1+"+"+A+"*"+weights.hh2_o1);
    console.log(g_bias_o1+"="+o1_delta);
    console.log("g",weights_deltas.bias_o1+"="+E+"*"+g_bias_o1+"+"+A+"*"+weights_deltas.bias_o1);

    var hh1_delta=(1-hh1_output)*hh1_output*(weights.hh1_o1*o1_delta);
    var g_h1_hh1 = hh1_delta*h1_output;
    weights_deltas.h1_hh1 = E*g_h1_hh1+A*weights_deltas.h1_hh1;
    var g_h2_hh1 = hh1_delta*h2_output;
    weights_deltas.h2_hh1 = E*g_h2_hh1+A*weights_deltas.h2_hh1;
    var g_h3_hh1 = hh1_delta*h3_output;
    weights_deltas.h3_hh1 = E*g_h3_hh1+A*weights_deltas.h3_hh1;
    var g_bias_hh1 = hh1_delta;
    weights_deltas.bias_hh1 = E*g_bias_hh1+A*weights_deltas.bias_hh1;    
    
    console.log();
    console.log("=====hh1=====");
    console.log(hh1_delta+"=("+1+"-"+hh1_output+")*"+hh1_output+"*("+weights.hh1_o1+"*"+o1_delta);
    console.log(g_h1_hh1 +"="+ hh1_delta+"*"+h1_output);
    console.log("h",weights_deltas.h1_hh1 +"="+ E+"*"+g_h1_hh1+"+"+A+"*"+weights.h1_hh1);
    console.log(g_h2_hh1 +"="+ hh1_delta+"*"+h2_output);
    console.log("h",weights_deltas.h2_hh1 +"="+ E+"*"+g_h2_hh1+"+"+A+"*"+weights.h2_hh1);
    console.log(g_h3_hh1 +"="+ hh1_delta+"*"+h3_output);
    console.log("h",weights_deltas.h3_hh1 +"="+ E+"*"+g_h3_hh1+"+"+A+"*"+weights.h3_hh1);
    console.log(g_bias_hh1+"="+hh1_delta);
    console.log("h",weights_deltas.bias_hh1+"="+E+"*"+g_bias_hh1+"+"+A+"*"+weights.bias_hh1);

    var hh2_delta=(1-hh2_output)*hh2_output*(weights.hh2_o1*o1_delta);
    var g_h1_hh2 = hh2_delta*h1_output;
    weights_deltas.h1_hh2 = E*g_h1_hh2+A*weights_deltas.h1_hh2;
    var g_h2_hh2 = hh2_delta*h2_output;
    weights_deltas.h2_hh2 = E*g_h2_hh2+A*weights_deltas.h2_hh2;
    var g_h3_hh2 = hh2_delta*h3_output;
    weights_deltas.h3_hh2 = E*g_h3_hh2+A*weights_deltas.h3_hh2;
    var g_bias_hh2 = hh1_delta;
    weights_deltas.bias_hh2 = E*g_bias_hh2+A*weights_deltas.bias_hh2;

    console.log();
    console.log("=====hh2=====");
    console.log(hh1_delta+"=("+1+"-"+hh2_output+")*"+hh2_output+"*("+weights.hh2_o1+"*"+o1_delta);
    console.log(g_h1_hh2 +"="+ hh2_delta+"*"+h1_output);
    console.log("h",weights_deltas.h1_hh2 +"="+ E+"*"+g_h1_hh2+"+"+A+"*"+weights.h1_hh2);
    console.log(g_h2_hh2 +"="+ hh2_delta+"*"+h2_output);
    console.log("h",weights_deltas.h2_hh2 +"="+ E+"*"+g_h2_hh2+"+"+A+"*"+weights.h2_hh2);
    console.log(g_h3_hh2 +"="+ hh2_delta+"*"+h3_output);
    console.log("h",weights_deltas.h3_hh2 +"="+ E+"*"+g_h3_hh2+"+"+A+"*"+weights.h3_hh2);
    console.log(g_bias_hh2+"="+hh2_delta);
    console.log("h",weights_deltas.bias_hh2+"="+E+"*"+g_bias_hh2+"+"+A+"*"+weights.bias_hh2);




    var h1_delta = (1 - h1_output) * h1_output * ((weights.h1_hh1*hh1_delta)+(weights.h1_hh2*hh2_delta));
    var g_i1_h1 = h1_delta*i1;
    weights_deltas.i1_h1 = E*g_i1_h1+A*weights_deltas.i1_h1;
    var g_i2_h1 = h1_delta * i2;
    weights_deltas.i2_h1 = E*g_i2_h1+A*weights_deltas.i2_h1;
    var g_i3_h1 = h1_delta * i3;
    weights_deltas.i3_h1 = E*g_i3_h1+A*weights_deltas.i3_h1;
    var g_bias_h1 = h1_delta;
    weights_deltas.bias_h1 = E*g_bias_h1+A*weights_deltas.bias_h1;

    var h2_delta = (1 - h2_output) * h2_output * ((weights.h2_hh1*hh1_delta)+(weights.h2_hh2*hh2_delta));
    var g_i1_h2 = h2_delta*i1;
    weights_deltas.i1_h2 = E * g_i1_h2 + A * weights_deltas.i1_h2;
    var g_i2_h2 = h2_delta * i2;
    weights_deltas.i2_h2 = E * g_i2_h2 + A * weights_deltas.i2_h2;
    var g_i3_h2 = h2_delta * i3;
    weights_deltas.i3_h2 = E * g_i3_h2 + A * weights_deltas.i3_h2;
    var g_bias_h2 = h2_delta;
    weights_deltas.bias_h2 = E * g_bias_h2 + A * weights_deltas.bias_h2;

    var h3_delta = (1 - h3_output) * h3_output * ((weights.h3_hh1*hh1_delta)+(weights.h3_hh2*hh2_delta));
    var g_i1_h3 = h3_delta * i1;
    weights_deltas.i1_h3 = E * g_i1_h3 + A * weights_deltas.i1_h3;
    var g_i2_h3 = h3_delta * i2;
    weights_deltas.i2_h3 = E * g_i2_h3 + A * weights_deltas.i2_h3;
    var g_i3_h3 = h3_delta * i3;
    weights_deltas.i3_h3 = E * g_i3_h3 + A * weights_deltas.i3_h3;
    var g_bias_h3 = h3_delta;
    weights_deltas.bias_h3 = E * g_bias_h3 + A * weights_deltas.bias_h3;
console.log("o1_delta: "+o1_delta+'\n'+"hh1_delta: "+hh1_delta+'\n'+"hh2_delta: "+hh2_delta);
}
return weights_deltas;
}

var applyTrainUpdate = (weight_deltas = train()) =>
    Object.keys(weights).forEach(key =>
        weights[key] += weight_deltas[key]);

//outputResults();
//fun();

//for (var j=1;j<=10; j++) {
  R.times(() => applyTrainUpdate(), 1)
 //console.log(j);
// outputResults();
 //fun();
//console.log("===CONTROLNAY PROVERKA===");
//console.log("50, 1, 2 => "+nn(1/50, 1, 1/2)+" (expected 2)");
//console.log("10, 0, 3 => "+nn(1/50, 1, 1/5)+" (expected 3)");
//console.log("40, 1, 0 => "+nn(1/40, 1, 0)+" (expected 4)");
 //}
