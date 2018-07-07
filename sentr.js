//конфиг
var options = {
	activation:x => 1 / (1 + Math.exp(-x)),// это сигмоида
	derivative_sigmoid:x => {
    const fx = x;
    //activation_sigmoid(x);
    return fx * (1 - fx);
},//это произодная сигмоиды (нужно для обучения методом обратного распросторонения)
	random:require('seed-random')(228),//подключяем важную библиотеку для тестов
	network:[3,[3,2],1],//это архетиктура нейронной сети(дальше будет как параметр ф-ции как arch)
	//[вход(ы),[сло(и,й)],выход(ы)]
}

//класс нейроннв
var Neuron = function () {
	this.value=0;//значение нейрона
	this.weights=[];//весы
}

//генератор весов 1 параметр: 
//кол-во весов которое определяется кол-вом скрытых нейронов и выходов
Neuron.prototype.set_wei = function(num) {
	this.weights=[];
	for (var i = 0; i <= num; i++) {//если ты заметил то это не ошибка ниже будет обьяснение
		this.weights.push(options.random()); //весы не случайные из-за пакета random-seed(нужно для повторения результата)
	}
};

//класс слоёв
var Layer = function(index){
	//я короче вообще хз зачам id
	this.id=index||0;
	//важная массив нейронов
	this.neurons=[];
}

//определение нейронов
//1-м параметром передаётся:кол-во нейронов, 
//а 2-м: кол-во весов для метода Neuron.set_wei
Layer.prototype.set_neu = function(num_neu,num_inp) {
	for (var i = 0; i < num_neu; i++) {
		var n = new Neuron();
		n.set_wei(num_inp);
		this.neurons.push(n);
	}
};

// самое интересно
// собственно создение класса нейронной сети
var NeuronNet = function(){
	//важная массив для слоёв
	this.layers=[];
}

//так щас внимательно
//это метод для создания скрытых слоев включяя выход(ы)
NeuronNet.prototype.set_lay = function(arch) {
this.arch = arch;// сдесь делаем так чтоб другие методы этого класса могли видить архетиктуру
var index=0;//это числовая переменная нужна чтоб инициализировать id в слоях 
data=arch[0];//это кол-во входов и кол-во весов для первого скрытого слоя
for(var i in arch[1]){//я не помню чес мне не угодил i, но так надо
var l = new Layer(index);
l.set_neu(arch[1][i],data);
this.layers.push(l);//добавление слоёв в массив со СЛОЯМИ
data=arch[1][i];//кол-во весов скрытого слоя
index++;
}
//тут мы создаём выходной слой Ё
var l = new Layer('out');//тут должно было быть легче отлаживать прогу, но чот...
l.set_neu(arch[2],data);
this.layers.push(l);
}

//вот тут вобще 3.14
//эта ф-ция(метод) нужна для подсчета нейронна
//1 параметром передается значение вход(а,ов)
NeuronNet.prototype.posh = function(input){
if(input.length==this.arch[0]){//проверочка на совпадение архетиктур(?)
input.push(1);//а вот и объяснение 
//это дополнительный нейрон его называют bias 
//он всегда равер 1 и собственно сдвигает результат НС в правельную сторону
for(var i in this.layers[0].neurons){//тут идёт подсчёт только первого скрытого слоя
	this.layers[0].neurons[i].value=0;//так это важная строчка чесно не помню почему, но она важна 
	for (var j = 0; j <= this.arch[0]; j++) {
		console.log(input[j]+"*"+this.layers[0].neurons[i].weights[j],input[j]*this.layers[0].neurons[i].weights[j]);//полномасштабный тест
		this.layers[0].neurons[i].value+=input[j]*this.layers[0].neurons[i].weights[j];//тут обычный подсчёт значений и весов
	}
	this.layers[0].neurons[i].value=options.activation(this.layers[0].neurons[i].value);//тут значение полученное выше мы активируем тоесть проганяем через сигмоиду
	//console.log(this.layers[0].neurons[i].value);
}
//console.log("======>"+this.layers.length);
var b;//так надо
for(var i=1;i<this.layers.length;i++){//цикл для всех остальных слоёв включяя и выход
	
	//так вот тут момент гениального метода ты автора
	for(var j in this.layers[i].neurons){//мы углубляемя и идём по нейронас
		//console.log("Layer: "+this.layers[i].id+"; Neuron: "+j+";");//тут я что-то проверял
		var t=0//в последствии мы её будем активировать
		var v = j;//генияльная мысля автора
		//======тот самый метод тыка====
		//for(var v in this.layers[i].neurons){
		//for(var k in this.layers[i-1].neurons){
		//======
			for(var p in this.layers[i].neurons[v].weights){//это дно дна дна, ну то есть весы
				//console.log(this.layers[i-1].neurons[k].weights);//проверка дна
//console.log(i,v,p)//тут я вообще такой, а что это за переменные
//так этот if блок нужен чтоб разлечять bias от не bias
if(this.layers[i-1].neurons[p])
console.log(this.layers[i].neurons[v].weights[p]+"*"+this.layers[i-1].neurons[p].value,this.layers[i-1].neurons[p].value*this.layers[i].neurons[v].weights[p]);	
else console.log("bies: "+this.layers[i].neurons[v].weights[p]+'\n');

//эта хитровыдолбаная системв была выдумана чтоб счетать и bias
			if(this.layers[i-1].neurons[p])
			t+=this.layers[i-1].neurons[p].value*this.layers[i].neurons[v].weights[p];
			else t+=this.layers[i].neurons[v].weights[p]
			//console.log(v,p,k,this.layers[i-1].neurons[k].value,this.layers[i].neurons[v].weights[p]);//тут я упоролся и вывел всё
			}
		//}
		//}
		//console.log(t," :t");
		this.layers[i].neurons[j].value=options.activation(t);//яж говолрия что будем активировать
		//console.log(this.layers[i].neurons[j].value," :activation");
		//console.log('\n');
		b=options.activation(t);//мы выше создали глоб. переменную чтоб вывести результат
	}
	
}
return b;
}else console.log("ARR!");
}//фух конец ф-ии, но не конец 3,14

//ты далеко не уедишь на подсчёте НС нужно её тренировать чем должна заниматься эта ф-я
//1-м аргументом передаётся объектом с входными дынными и собственно желательным результатом этой НС
//дальше хуже я хоть и не добрался до них, но должен объяснить
//2-м аргументоя является e(эпсилон) - скорость обучения, но эта цифра хороша вмеру как и следующяя
//3-м аргументом есть a(альфа) - момент оба этих параметра важны
NeuronNet.prototype.train = function(dataTR,e,a){
for(var i in dataTR){//проходимся по учебному материалу
if(dataTR[i].input.length==this.arch[0]&&dataTR[i].output.length==this.arch[2]){//проверочка на совпадение архетиктур(?)
NN.posh(dataTR[i].input);//тут мы считаем всю НС, но не важен сам результат сама цель в инициализации(value) всех слоёв

//===проверочка
// for(var t in NN.layers){
// console.log("boom",NN.layers[t].id,NN.layers[t].neurons);
// }
//===

var delta=[];//у метода обратного распростронения есть дельты и как бы...вот
for (var j = 0; j < this.arch[2]; j++) {//тут мы должны идти с конца
	delta.push(
	(dataTR[i].output[j]-this.layers[this.layers.length-1].neurons[j].value)
	*options.derivative_sigmoid(this.layers[this.layers.length-1].neurons[j].value));//это и ести дэльта
	console.log(dataTR[i].output[j]+"-"+this.layers[this.layers.length-1].neurons[j].value+")"+"*"+"("+1+"-"+this.layers[this.layers.length-1].neurons[j].value+")"+"*"+this.layers[this.layers.length-1].neurons[j].value);//это для блин слово забыл,вспомнил отладка
	//console.log(delta);

	var g =[];//так там есть ещё градиенты ну так вот этот массив для них

//такое ощущение что у меня кончились все латинские буквы
for(var b in this.layers[this.layers.length-1].neurons[j].weights){//ну просто идём по весам последнего слоя
//console.log(this.layers[this.layers.length-2].neurons.length)


//ВОТ собственно с этого момента нужно рабераться
	if(b<this.layers[this.layers.length-2].neurons.length){//тут чтото связано с bias хотя я хз
g.push(delta[j]*this.layers[this.layers.length-2].neurons[b].value);
console.log(g[b] +"="+ delta[j]+"*"+this.layers[this.layers.length-2].neurons[b].value);
}else{
g.push(delta[j]);
console.log("====="+g[b] +"="+ delta[j]+"BOOOM!!!");
}
}
		for(var h in this.layers[this.layers.length-1].neurons[j].weights){
//Вот тут стрёмный момент
console.log(this.layers[this.layers.length-1].neurons[j].weights[h]+"="+e+"*"+g[h]+"+"+a+"*"+this.layers[this.layers.length-1].neurons[j].weights[h]);
this.layers[this.layers.length-1].neurons[j].weights[h]=e*g[h]+a*this.layers[this.layers.length-1].neurons[j].weights[h];

}

	//console.log("( "+dataTR[i].output[j]+" - "+this.layers[this.layers.length-1].neurons[j].value+" ) * "+options.derivative_sigmoid(this.layers[this.layers.length-1].neurons[j].value),(dataTR[i].output[j]- this.layers[this.layers.length-1].neurons[j].value)*options.derivative_sigmoid(this.layers[this.layers.length-1].neurons[j].value));
	//console.log(this.layers[this.layers.length-1].neurons[j]);
	//var u=0;
// for (var o in this.layers[this.layers.length-1].neurons[j].weights) {
// 	if (u != "false") {	
// 	this.layers[this.layers.length-1].neurons[j].weights[o]+=this.layers[this.layers.length-2].neurons[u].value*delta[j];
// 	}
// 	else this.layers[this.layers.length-1].neurons[j].weights[o]+=delta[j];
// 	//console.log(this.layers[this.layers.length-2].neurons.length)
// 	if(u<this.layers[this.layers.length-2].neurons.length-1)
// 	u++;
// else u = "false";
// }
}
for (var g = this.arch[1].length-1; g >=0 ; g--) {
	for(var b =0;b<this.arch[1][g];b++){
console.log("hrrr",this.layers[g].neurons[b])
//console.log(g,b); 





	}
}


// 	//console.log(this.arch[1][g], archm[g]);
// 		var deltaus=0;
// 		for(var kot in delta)
// 			deltaus+=delta[kot];
// 		//console.log(delta,"=", deltaus);
// 	for(var b = 0;b<this.arch[1][g];b++){
// 		//console.log(options.derivative_sigmoid(this.layers[g].neurons[b].value));
// 	}
// }

}else console.error("ERR Arch!");
}
}

//сдесь всё тестируется

//иницаялизация
var NN = new NeuronNet();

//сдесь указывается архетиктура нейронной сети (дальше НС)
NN.set_lay(options.network);

//сейчас нужно чтоб сверяться с testirio.js
var dataTr = [
    {input: [1/5, 1, 1], output: [1/1]},
    // {input: [1/9, 1, 1/2], output: [1/1]},
    // {input: [1/8 ,0, 1/1], output: [1/1]},
    // {input: [1/3, 1, 1/1], output: [1/2]},
    // {input: [1/6 ,1, 1/2], output: [1/2]},
    // {input: [1/4, 0, 1/1], output: [1/2]},
    // {input: [1/9, 1, 1/8], output: [1/3]},
    // {input: [1/6, 1, 1/4], output: [1/3]},
    // {input: [1/1, 0, 1/1], output: [1/3]},
    // {input: [1/6, 1, 0], output: [1/4]},
    // {input: [1/10, 0, 0], output: [1/4]}
    ];
//собственно сам запуск
NN.train(dataTr,0.7,0.3);

//хз
//console.log("1/5,1/10,1/3: "+NN.posh([1/5,1/10,1/3]));

//этот цикл выводит весы и значения нейроннов
// for(var t in NN.layers){
// console.log(NN.layers[t].id,NN.layers[t].neurons);
// }


// for(var i=1;i<this.layers.length;i++){
// 	for(var j in this.layers[i].neurons){
// 		//console.log("Layer: "+this.layers[i].id+"; Neuron: "+j+";");
// 		var t=0
// 		for(var v in this.layers[i].neurons){

// 		//for(
// 		var k=0,p=0;
// 		//p<=this.layers[i].neurons[v].weights.length,k<=this.layers[i-1].neurons.length;k++,p++){
// 			while(k<this.layers[i-1].neurons.length){
// 				//console.log(this.layers[i-1].neurons[k].weights);
// //console.log(i,v,p.k);
// console.log(this.layers[i].neurons[v].weights[p]+"*"+this.layers[i-1].neurons[k].value,this.layers[i-1].neurons[k].value*this.layers[i].neurons[v].weights[p]);	
			
// 			//t+=this.layers[i-1].neurons[k].value*this.layers[i].neurons[v].weights[p];
// 			//console.log(v,p,k,this.layers[i-1].neurons[k].value,this.layers[i].neurons[v].weights[p]);
// 			//console.log("===="+k+"====");
// 			k++;
// 			p++;
// 		}
// 		}
// 		this.layers[i].neurons[j].value=options.activation(t);
// 	}
// }