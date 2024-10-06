// MIT License
// Copyright (c) 2021 Luis Espino

function genetic(end){
    // define number of individuals, length and max value
    var individuals = 4
    var len = end.length
    var max = ''
    for (var i = 0; i < len; i++) {
        max += '9'
    }
    max = parseInt(max)
    end = parseInt(end)
    document.getElementById("log").innerHTML+="Objetive: "+end
    
    // initialize population
    var population = []
    for (var i = 0; i < individuals; i++){
        population[i] = Math.floor(Math.random() * max + 1)
    }
    
    var expected = max
    var itera = 0
    var avg = 0
    while (expected > 1){
        itera++
        document.getElementById("log").innerHTML+="<br><br>Population "+itera+": "+population
        
        // static selection by tournament
        if (Math.abs(end-population[0]) <= Math.abs(end-population[1])) p1 = 0
        else p1 = 1
        if (Math.abs(end-population[2]) <= Math.abs(end-population[3])) p2 = 2
        else p2 = 3
        document.getElementById("log").innerHTML+="<br>Parents selected: "+population[p1]+' '+population[p2]


        // crossover
        let child = []
        child.push(Math.floor((population[p1]+population[p2])/2))
        child.push(Math.floor(Math.abs(2*population[p1]-population[p2])))
        child.push(Math.floor(Math.abs(population[p1]-population[p2])))
        child.push(Math.floor(population[p1]*1.2))
        document.getElementById("log").innerHTML+="<br>Childs: "+child

        // optional mutation 

        // evaluation
        if (Math.abs(end-child[0]) >= Math.abs(end-child[1])) child[0] = child[1]
        if (Math.abs(end-child[2]) >= Math.abs(end-child[3])) child[2] = child[3]

        // replacement and shuffle
        population[0] = population[p1]
        population[1] = population[p2]
        population[2] = child[0]
        population[3] = child[2]
        document.getElementById("log").innerHTML+="<br>Replacement: "+population
        population = population.sort((a, b) => 0.5 - Math.random());
        document.getElementById("log").innerHTML+="<br>Shuffle: "+population
        //const sum = population.reduce((a, b) => Math.abs(end-a) + Math.abs(end-b), 0);
        const initialValue = 0;
        const sumWithInitial = population.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue,
          );
        const sum = sumWithInitial;
        document.getElementById("log").innerHTML+="<br>SUM Expected value: "+sum
        const avg2 = (sum / population.length) || 0;
        if ((avg/avg2) >= 0.95 && itera > 1){
            document.getElementById("log").innerHTML+="<br><br>Los valores convergen: "+ ((expected/sum)*100)+"% ("+avg+"/"+avg2+")"
            break
        }
        expected = sum; 
        avg = avg2;
        document.getElementById("log").innerHTML+="<br>AVG Expected value: "+avg2
        if (itera>=15) {
            document.getElementById("log").innerHTML+="<br><br>The algorithm is looped!"
            break 
        } 
        
    }

}

var num = prompt("Enter an integer to search for:")
if (num == null || num == '') num = '1234'
genetic(num)