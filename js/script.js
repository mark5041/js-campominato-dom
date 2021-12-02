

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
        else    if(x == max_mines)
                {
                    x = 0;
                    i--;
                    max += num;
                    min += num;
                    
                }
        i++;
        console.log(min + " " + max + " " + number);
    }
    console.log(myArray);
    return myArray;
}

let diff_selector = document.querySelector(".my-btn");

diff_selector.addEventListener('click', 
    function()
    {
        let game_over = document.querySelector(".game-over")
        let row = document.querySelector(".row");
        row.classList.remove("opacity-50");
        game_over.classList.add("d-none");
        row.innerHTML = '';

        let diff = document.querySelector(".my-selection");
        let col;
        let mines;
        let css_paper = document.documentElement.style;

        switch(diff.value)
        {
            case '1':
                col = 10;
                mines = 2;
                css_paper.setProperty('--size', col);
            break;
            case '2':
                col = 9;
                mines = 3;
                css_paper.setProperty('--size', col);
            break;
            case '3':
                col = 7;
                mines = 4;
                css_paper.setProperty('--size', col);
            break;
        }

        let list = blacklist(col, mines);
        let tot_box = col * col;
        let size =  Math.sqrt(col);

        for(let i = 1; i <= tot_box; i++)
        {
            let box = document.createElement("div");
            box.classList.add("box", "dynamic");
            box.append(i);
            row.append(box);

            box.addEventListener('click', 
                function()
                {
                    
                    if(!list.includes(parseInt(box.innerText)) && box.classList.contains("dynamic"))
                    {
                        this.classList.add("bg-green");
                    }
                    else
                    {
                        
                        let box_created = document.querySelectorAll(".box.dynamic");
                        for(let i = 0; i < box_created.length; i++)
                        {
                            if(list.includes(parseInt(box_created[i].innerText)))
                            {
                                box_created[i].classList.add("bg-red");
                            }
                            box_created[i].classList.remove("dynamic");
                        }
                        let score_box = document.querySelector(".score");
                        let score = document.querySelectorAll(".box.bg-green");
                        row.classList.add("opacity-50");
                        game_over.classList.remove("d-none");
                        score_box.innerHTML = score.length;
                    }
                }
            );
        }
        
    }
);