// funzione per ricavare un array contenente i numeri bomba
function blacklist(num, max_mines)
{
    let myArray = [];
    let max = num + 1;
    let min = 1;
    let i = 0;
    let x = 0;
    let number;
    while(myArray.length < num * max_mines)
    {
        // ogni riga della griglia può contenere un massimo di mine
        if(x < max_mines)
        {
            x++;
            do
            {
                number = Math.floor(Math.random() * (max - min)) + min;
            }
            while(myArray.includes(number))
            myArray[i] = number;
        }
        // se il numero massimo di mine viene raggiunto si resetta il contatore e si procede con la riga successiva
        else    if(x == max_mines)
                {
                    x = 0;
                    i--;
                    max += num;
                    min += num;
                    
                }
        i++;
    }
    // per vedere i numeri bomba in ordine crescente
    console.log(myArray.sort((a, b) => {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    }));
    
    return myArray;
}

// funzione per l'avvio del gioco
function play()
{
    console.clear();
    let game_over = document.querySelector(".game-over")

    // reset generale
    let row = document.querySelector(".row");
    row.classList.remove("opacity-50");
    game_over.classList.add("d-none");
    row.innerHTML = '';

    let diff = document.querySelector(".my-selection");
    let col;
    let mines;
    let css_paper = document.documentElement.style;

    // scelgo il numero di box e di mine per riga in base alla difficolta
    switch(diff.value)
    {
        case '1':
            col = 10;
            mines = 2;
        break;
        case '2':
            col = 9;
            mines = 3;
        break;
        case '3':
            col = 7;
            mines = 4;
        break;
    }
    css_paper.setProperty('--size', col);
}


/** GAME START */

let diff_selector = document.querySelector(".my-btn");

diff_selector.addEventListener('click', 
    function()
    {
        play();
        let game_over = document.querySelector(".game-over")

        // reset generale
        let row = document.querySelector(".row");
        row.classList.remove("opacity-50");
        game_over.classList.add("d-none");
        row.innerHTML = '';

        let diff = document.querySelector(".my-selection");
        let col;
        let mines;
        let css_paper = document.documentElement.style;

        // scelgo il numero di box e di mine per riga in base alla difficolta
        switch(diff.value)
        {
            case '1':
                col = 10;
                mines = 2;
            break;
            case '2':
                col = 9;
                mines = 3;
            break;
            case '3':
                col = 7;
                mines = 4;
            break;
        }
        css_paper.setProperty('--size', col);

        //  Genero l'Array con le mine
        let list = blacklist(col, mines);
        // Creo la griglia
        let tot_box = col * col;
        for(let i = 1; i <= tot_box; i++)
        {
            let box = document.createElement("div");
            box.classList.add("box", "dynamic");
            box.append(i);
            row.append(box);

            box.addEventListener('click', 
                function()
                {
                    let resutl = document.querySelector(".game-over > h1");

                    // Seleziono il numero di box corretti già cliccati
                    let score = document.querySelectorAll(".box.bg-green");
                    let score_box = document.querySelector(".score");
                    if(!list.includes(parseInt(box.innerText)) && box.classList.contains("dynamic"))
                    {
                        this.classList.add("bg-green");

                        // Aggiorno il numero di box corretti già cliccati
                        score = document.querySelectorAll(".box.bg-green");
                        // Se abbiamo selezionato tutti i box corretti uscirà la schermata di vittoria
                        if(score.length == (col * col) - col * mines)
                        {
                            row.classList.add("opacity-50");
                            game_over.classList.remove("d-none");
                            resutl.innerHTML = '';
                            resutl.innerHTML = 'YOU WIN';
                            score_box.innerHTML = score.length;
                        }
                    }
                    else
                    {
                        let box_created = document.querySelectorAll(".box.dynamic");
                        for(let i = 0; i < box_created.length; i++)
                        {
                            if(list.includes(parseInt(box_created[i].innerText)))
                            {
                                // Rendo visibili tutte le mine
                                box_created[i].classList.add("bg-red");
                            }
                            // Rendo non cliccabili tutti i box
                            box_created[i].classList.remove("dynamic");
                        }
                        // Schermata del Game Over
                        row.classList.add("opacity-50");
                        game_over.classList.remove("d-none");
                        score_box.innerHTML = score.length;
                    }
                }
            );
        }
    }
);