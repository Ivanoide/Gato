const readlineSync = require('readline-sync');

const Tab1 = Array.from({ length: 3 }, () => Array(3).fill(0));
const Tab2 = Array.from({ length: 3 }, () => Array(3).fill(' '));

let TurnoJugador1 = true;
let Terminado = false;
let Ganador = false;
let CantTurnos = 0;

while (!Terminado) {
    // dibuja el tablero
    console.clear();
    console.log(' ');
    console.log('      ||     ||     ');
    console.log(`   ${Tab2[0][0]}  ||  ${Tab2[0][1]}  ||  ${Tab2[0][2]}`);
    console.log('     1||    2||    3');
    console.log(' =====++=====++======');
    console.log('      ||     ||     ');
    console.log(`   ${Tab2[1][0]}  ||  ${Tab2[1][1]}  ||  ${Tab2[1][2]}`);
    console.log('     4||    5||    6');
    console.log(' =====++=====++======');
    console.log('      ||     ||     ');
    console.log(`   ${Tab2[2][0]}  ||  ${Tab2[2][1]}  ||  ${Tab2[2][2]}`);
    console.log('     7||    8||    9');
    console.log(' ');
 
    if (!Ganador && CantTurnos < 9) {
        // carga auxiliares segun a qué jugador le toca
        let Ficha, Valor, Objetivo;
        if (TurnoJugador1) {
            Ficha = 'O';
            Valor = 1;
            Objetivo = 1;
            console.log('Turno del jugador 1 (O)');
        } else {
            Ficha = 'X';
            Valor = 2;
            Objetivo = 8;
            console.log('Turno del jugador 2 (X)');
        }

        // pide la posición para colocar la ficha y la valida
       // console.log('Ingrese la Posición (1-9):');
        let Pos;
        do {
            Pos = (readlineSync.question('Ingrese la Posicion (1-9):'));
            if (Pos < 1 || Pos > 9) {
                console.log('Posición incorrecta, ingrese nuevamente: ');
                Pos = 99;
            } else {
                const i = Math.floor((Pos - 1) / 3);
                const j = (Pos - 1) % 3;
                if (Tab1[i][j] !== 0) {
                    console.log('Posición incorrecta, ingrese nuevamente: ');
                    Pos = 99;
                }
            }
        } while (Pos === 99);

        // guarda la ficha en la matriz tab2 y el valor en tab1
        CantTurnos++;
        const i = Math.floor((Pos - 1) / 3);
        const j = (Pos - 1) % 3;
        Tab1[i][j] = Valor;
        Tab2[i][j] = Ficha;

        // verifica si ganó, buscando que el producto de las fichas en el tablero sea igual a Objetivo
        let aux_d1 = 1;
        let aux_d2 = 1;

        for (let i = 0; i < 3; i++) {
            let aux_i = 1;
            let aux_j = 1;
            aux_d1 *= Tab1[i][i];
            aux_d2 *= Tab1[i][2 - i];

            for (let j = 0; j < 3; j++) {
                aux_i *= Tab1[i][j];
                aux_j *= Tab1[j][i];
            }

            if (aux_i === Objetivo || aux_j === Objetivo) {
                Ganador = true;
            }
        }

        if (aux_d1 === Objetivo || aux_d2 === Objetivo) {
            Ganador = true;
        } else {
            TurnoJugador1 = !TurnoJugador1;
        }
    } else {
        if (Ganador) {
            console.log('Ganador: ');
            if (TurnoJugador1) {
                console.log('Jugador 1!');
            } else {
                console.log('Jugador 2!');
            }
        } else {
            console.log('Empate!');
        }

        Terminado = true;
    }
}